const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
}

// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG_ID,
    projectId: process.env.OPENAI_PROJECT_ID
});

// Helper function to create a prompt for GPT
function createPrompt(userQuestion, questionContext) {
    return `
        I'm helping a student with an SAT Writing question. Here's the context:
        
        Question: ${questionContext.questionText.replace(/<[^>]*>/g, '')}
        
        Options:
        A) ${questionContext.options[0]}
        B) ${questionContext.options[1]}
        C) ${questionContext.options[2]}
        D) ${questionContext.options[3]}
        
        This is a ${questionContext.questionType} question.
        
        The student's question is: ${userQuestion}
        
        Please provide a helpful explanation that guides the student's thinking without directly giving away the answer.
        Focus on explaining the relevant concepts and strategies.
    `;
}

// API endpoint for GPT assistance
app.post('/api/ask-gpt', async (req, res) => {
    try {
        const { message, questionContext, systemPrompt } = req.body;
        
        if (!message || !questionContext) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const prompt = createPrompt(message, questionContext);

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // or whichever model you prefer
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are a helpful SAT tutor. Provide clear explanations that guide students' thinking without giving away answers directly. Focus on teaching concepts and strategies."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content;
        res.json({ response });

    } catch (error) {
        console.error('Error calling GPT API:', error);
        res.status(500).json({ error: 'Error getting help from GPT' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// For backwards compatibility with the existing chat.js route
app.post('/api/chat', async (req, res) => {
    try {
        const { message, questionContext, systemPrompt } = req.body;
        
        if (!message || !questionContext) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        const prompt = createPrompt(message, questionContext);

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview", // or whichever model you prefer
            messages: [
                {
                    role: "system",
                    content: systemPrompt || "You are a helpful SAT tutor. Provide clear explanations that guide students' thinking without giving away answers directly. Focus on teaching concepts and strategies."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            max_tokens: 500,
            temperature: 0.7
        });

        const response = completion.choices[0].message.content;
        res.json({ response });

    } catch (error) {
        console.error('Error calling GPT API:', error);
        res.status(500).json({ error: 'Error getting help from GPT' });
    }
});

// Catch all other routes and return the React app if in production
if (process.env.NODE_ENV === 'production') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 