const express = require('express');
const router = express.Router();
const axios = require('axios');

// Your Anthropic API key (should be stored in environment variables)
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

router.post('/chat', async (req, res) => {
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
    
    res.json({ response: response.data.content[0].text });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({ error: 'Failed To get response from Claude' });
  }
});

module.exports = router; 