const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint for chat
app.post('/api/chat', async (req, res) => {
  try {
    const { message, questionContext, systemPrompt } = req.body;
    
    console.log("API endpoint called with:", {
      messageLength: message?.length,
      questionContext: {
        type: questionContext?.questionType,
        questionNumber: questionContext?.questionNumber
      }
    });

    // Construct message to send to Claude
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: `[Question ${questionContext.questionNumber}]
${questionContext.questionText}

Options:
A. ${questionContext.options[0]}
B. ${questionContext.options[1]}
C. ${questionContext.options[2]}
D. ${questionContext.options[3]}

This is a ${questionContext.questionType} question.

User's question: ${message}`
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    console.log("Successfully called Anthropic API");
    
    res.status(200).json({ response: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error.message);
    res.status(500).json({ 
      error: 'Failed to get response from Claude',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 