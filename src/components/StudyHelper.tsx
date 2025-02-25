import React, { useState, useRef, useEffect } from 'react';
import '../styles/StudyHelper.css';

interface StudyHelperProps {
  currentQuestion: any;
  questionIndex: number;
}

const StudyHelper: React.FC<StudyHelperProps> = ({ currentQuestion, questionIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'assistant'}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hi there! I'm your SAT strategy assistant. I can help explain question-solving techniques, heuristics, and strategies for this section. What would you like help with?",
          sender: 'assistant'
        }
      ]);
    }
  }, [isOpen, messages.length]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to chat
    const userMessage = input.trim();
    setMessages([...messages, { text: userMessage, sender: 'user' }]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Prepare context about the current question to send to the API
      const questionContext = {
        questionText: currentQuestion.question,
        questionNumber: questionIndex + 1,
        questionType: currentQuestion.explanation[0].replace("<strong>", "").replace("</strong>", ""),
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer
      };
      
      // Make API request to Claude
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          questionContext,
          // System prompt guidance focusing on heuristics-based approach
          systemPrompt: `You are an expert SAT tutor specializing in strategic approaches to test-taking. 
          Your goal is to help students understand the underlying patterns and heuristics that make questions predictable and easy to solve.
          Focus on teaching time-saving shortcuts, pattern recognition, and strategic elimination techniques rather than deep content knowledge.
          Explain how top scorers approach questions efficiently rather than solving each one from scratch.
          Keep responses concise, practical, and focused on test-taking strategy.
          For the current SAT Writing question, provide specific heuristics that apply.`
        }),
      });
      
      const data = await response.json();
      
      // Add assistant's response to chat
      setMessages(prev => [...prev, { text: data.response, sender: 'assistant' }]);
    } catch (error) {
      console.error('Error calling Claude API:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        sender: 'assistant' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="study-helper">
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Strategy Assistant</h3>
            <button className="close-button" onClick={toggleChat}>×</button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender}`}>
                {message.text}
              </div>
            ))}
            {isLoading && (
              <div className="message assistant loading">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Ask about strategy or this question..."
              disabled={isLoading}
            />
            <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
              {isLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
      )}
      <button 
        className={`chat-toggle ${isOpen ? 'open' : ''}`} 
        onClick={toggleChat}
        aria-label="Strategy Assistant"
      >
        {isOpen ? '✕' : '?'}
      </button>
    </div>
  );
};

export default StudyHelper; 