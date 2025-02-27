const { OpenAI } = require('openai');

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

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, questionContext, systemPrompt } = req.body;
        
        if (!message || !questionContext) {
            return res.status(400).json({ error: 'Missing required parameters' });
        }

        // Initialize OpenAI
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            organization: process.env.OPENAI_ORG_ID,
            projectId: process.env.OPENAI_PROJECT_ID
        });

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
        res.status(200).json({ response });

    } catch (error) {
        console.error('Error calling GPT API:', error);
        res.status(500).json({ error: 'Error getting help from GPT' });
    }
} 