import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ChatWidget.module.css';

const DEFAULT_OPTIONS = [
  { id: 'test', label: '📝 How does the test work?' },
  { id: 'free', label: '💰 Is the test free?' },
  { id: 'parent', label: '👨‍👩‍👧 Parent nomination info' },
  { id: 'contact', label: '✉️ Contact Support' }
];

const MENU_OPTION = [
  { id: 'menu', label: '🔄 Back to Main Options' }
];

const CHAT_ANSWERS = {
  test: "The diagnostic test adjusts to your performance and checks your understanding of key CBSE Grade 10 Math topics. It maps your conceptual mistakes to real board exam marks lost, showing you exactly what is costing you marks.",
  free: "Yes! You can answer the 20 conceptual diagnostic questions for free. No credit card or account is required for the child to start the test.",
  parent: "Parents can nominate their child directly. We will send the student a test invitation and email you the performance scorecard!",
  contact: "Sure! Redirecting you to our support and contact page..."
};

const ChatWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hi there! 👋 I am the CMPTNCY AI. How can I help you prepare for your CBSE board exams today?' }
  ]);
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [isTyping, setIsTyping] = useState(false);
  
  const listEndRef = useRef(null);

  useEffect(() => {
    if (listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleOptionClick = (option) => {
    // 1. Add user's selected choice to chat history
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: option.label }]);
    setOptions([]); // Hide option selectors during response generation
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      
      if (option.id === 'menu') {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: 'bot',
          text: 'How else can I assist you? Select another topic below:'
        }]);
        setOptions(DEFAULT_OPTIONS);
        return;
      }

      // Find BOT answer
      const answer = CHAT_ANSWERS[option.id];
      setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: answer }]);

      // If user selected contact/support, redirect them after a short delay
      if (option.id === 'contact') {
        setTimeout(() => {
          setIsOpen(false);
          navigate('/contact');
        }, 1200);
      } else {
        // Show the back-to-menu option
        setOptions(MENU_OPTION);
      }
    }, 800);
  };

  const handleReset = () => {
    setIsTyping(false);
    setMessages(prev => [...prev, { id: Date.now(), sender: 'bot', text: 'Main options reset. Select a topic below:' }]);
    setOptions(DEFAULT_OPTIONS);
  };

  return (
    <>
      {/* Floating FAB Trigger Button */}
      <div className={styles.fabContainer}>
        {!isOpen && (
          <div className={styles.chatPrompt}>Ask me anything! ⚡</div>
        )}
        <button 
          className={`${styles.fab} ${isOpen ? styles.fabActive : ''}`} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Support Chatbot"
        >
          {isOpen ? (
            <svg className={styles.fabIcon} viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <>
              <img 
                src="/student-avatar.png" 
                alt="CMPTNCY AI Student Avatar" 
                className={styles.avatarImg}
              />
              <span className={styles.onlineBadge}></span>
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <img 
                src="/student-avatar.png" 
                alt="CMPTNCY AI" 
                className={styles.headerAvatar}
              />
              <div className={styles.headerInfo}>
                <div className={styles.botName}>CMPTNCY AI</div>
                <div className={styles.botStatus}>Online</div>
              </div>
              <button 
                className={styles.resetBtn} 
                onClick={handleReset}
                title="Back to Main Menu"
              >
                ↩ Menu
              </button>
              <button 
                className={styles.closeWindow} 
                onClick={() => setIsOpen(false)}
                aria-label="Close chat window"
              >
                ✕
              </button>
            </div>

            {/* Conversation Log */}
            <div className={styles.messageList}>
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`${styles.msg} ${msg.sender === 'bot' ? styles.msgBot : styles.msgUser}`}
                >
                  {msg.text}
                </div>
              ))}
              
              {isTyping && (
                <div className={styles.typing}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              )}
              <div ref={listEndRef} />
            </div>

            {/* Interactive Options Area */}
            {options.length > 0 && (
              <div className={styles.optionsArea}>
                {options.map(opt => (
                  <button 
                    key={opt.id} 
                    className={styles.optionBtn}
                    onClick={() => handleOptionClick(opt)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
