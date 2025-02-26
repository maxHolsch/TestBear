const express = require('express');
const router = express.Router();
const axios = require('axios');

// Your Anthropic API key (should be stored in environment variables)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Export a handler function that Vercel can use as an API endpoint
module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, questionContext, systemPrompt } = req.body;
    
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
<CURRENT_CURSOR_POSITION>
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
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        }
      }
    );
    
    return res.status(200).json({ response: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return res.status(500).json({ error: 'Failed to get response from Claude' });
  }
}; 