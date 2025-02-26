import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import '../styles/ChatBot.css';

interface ChatBotProps {
  isOpen: boolean;
  onClose: () => void;
  currentQuestion: any;
  currentQuestionIndex: number;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen, onClose, currentQuestion, currentQuestionIndex }) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Hi there! I\'m your SAT Writing Coach. How can I help you with this question?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Extract options and format them
      const options = currentQuestion.options;

      // Create question context for the API
      const questionContext = {
        questionNumber: currentQuestionIndex + 1,
        questionText: currentQuestion.question.replace(/<[^>]*>/g, ''), // Strip HTML
        questionType: "SAT Writing Rhetorical Skills",
        options: options
      };

      // System prompt for the assistant
      const systemPrompt = `You are an expert SAT tutor helping a student with SAT Writing Rhetorical Skills questions.
      Use easy-to-understand language and give specific, practical advice.
      Be concise but helpful - explain SAT-specific strategies when relevant.
      Don't give away the answer directly, but guide the student toward understanding the concept.
      Refer to the specific details of the question when explaining.`;

      // Call API
      const response = await axios.post(`${process.env.REACT_APP_API_URL || '/api/chat'}`, {
        message: input,
        questionContext,
        systemPrompt
      });

      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.response }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>SAT Writing Coach</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-content">{message.content}</div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant">
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask about this question..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage} 
          disabled={!input.trim() || isLoading}
          className={input.trim() ? "send-button active" : "send-button"}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot; 