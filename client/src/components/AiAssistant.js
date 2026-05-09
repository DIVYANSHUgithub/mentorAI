// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   FaBrain, 
//   FaPaperPlane, 
//   FaTimes, 
//   FaUser, 
//   FaRobot,
//   FaMicrophone,
//   FaStop,
//   FaRegCopy,
//   FaRegThumbsUp,
//   FaRegThumbsDown,
//   FaRegBookmark,
//   FaRegShare,
//   FaRegLightbulb,
//   FaRegQuestionCircle,
//   FaRegClock,
//   FaRegStar,
//   FaRegEye,
//   FaRegEyeSlash,
//   FaRegTrashAlt,
//   FaRegEdit,
//   FaRegSave,
//   FaRegImage,
//   FaRegFile,
//   FaRegLink,
//   FaRegSmile,
//   FaRegFrown,
//   FaRegMeh,
//   FaSpinner,
//   FaVolumeUp,
//   FaVolumeMute
  
// } from 'react-icons/fa';

// function AIAssistant({ onClose }) {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       type: 'ai',
//       content: "Hello! I'm your AI learning assistant. I can help you with:\n\n• Understanding course concepts\n• Explaining complex topics\n• Providing code examples\n• Answering questions about your studies\n• Suggesting learning resources\n\nWhat would you like to learn about today?",
//       timestamp: new Date(),
//       isTyping: false
//     }
//   ]);
//   const [inputMessage, setInputMessage] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState(null);
//   const [showSuggestions, setShowSuggestions] = useState(true);
//   const [conversationTitle, setConversationTitle] = useState('New Conversation');
//   const [isEditing, setIsEditing] = useState(false);

//   const messagesEndRef = useRef(null);
//   const inputRef = useRef(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   const quickSuggestions = [
//     "Explain neural networks in simple terms",
//     "Help me understand React hooks",
//     "What's the difference between let, const, and var?",
//     "Show me a Python example for data analysis",
//     "How do I implement authentication in a web app?",
//     "Explain the concept of async/await",
//     "What are the best practices for responsive design?",
//     "Help me debug this JavaScript error"
//   ];


//   const handleSendMessage = async (e) => {
//     if (e && e.preventDefault) e.preventDefault();

//     const text = inputMessage.trim();
//     if (!text || loading || isTyping) return;

//     // Create user message object (data only)
//     const userMessage = {
//       id: Date.now(),
//       type: 'user',
//       content: text,
//       timestamp: new Date()
//     };

//     // Optimistically add user message
//     setMessages(prev => [...prev, userMessage]);
//     setInputMessage('');
//     setLoading(true);
//     setError(null);

//     try {
//       const url = "http://localhost:5050/api/chat";
//       const resp = await fetch(url, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ role: 'user', content: text })
//       });

//       if (!resp.ok) {
//         const txt = await resp.text();
//         throw new Error(`Upstream error: ${resp.status} ${txt}`);
//       }

//       const data = await resp.json();
//       const answer = data?.answer || (typeof data === 'string' ? data : JSON.stringify(data));

//       const aiMessage = {
//         id: Date.now() + 1,
//         type: 'ai',
//         content: answer,
//         timestamp: new Date(),
//         isTyping: false
//       };

//       setMessages(prev => [...prev, aiMessage]);
//     } catch (err) {
//       console.error('Chat error:', err);
//       setError('Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const generateAIResponse = (userInput) => {
//     // This function is no longer used; kept for reference
//     // The backend now handles AI responses via Gemini API
//     return "Please use the backend API for AI responses.";
//   };

//   const handleKeyPress = (e) => {
//     // This is now handled by onKeyDown in textarea
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage(e);
//     }
//   };

//   const copyMessage = (content) => {
//     navigator.clipboard.writeText(content);
//     // You could add a toast notification here
//   };

//   const handleVoiceInput = () => {
//     setIsRecording(!isRecording);
//     // Implement voice recognition here
//   };

//   const formatTimestamp = (timestamp) => {
//     return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 bg-gray-900 flex flex-col z-50"
//     >
//       {/* Header */}
//       <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
//         <div className="flex items-center space-x-3">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors p-2"
//           >
//             <FaTimes className="text-xl" />
//           </motion.button>
//           <div className="flex items-center space-x-2">
//             <FaBrain className="text-blue-400 text-xl" />
//             <span className="text-white font-semibold text-lg">AI Learning Assistant</span>
//           </div>
//         </div>
        
//         <div className="flex items-center space-x-2">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setIsMuted(!isMuted)}
//             className="text-gray-400 hover:text-white transition-colors p-2"
//           >
//             {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
//           </motion.button>
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => setShowSuggestions(!showSuggestions)}
//             className="text-gray-400 hover:text-white transition-colors p-2"
//           >
//             <FaRegLightbulb />
//           </motion.button>
//         </div>
//       </div>

//       {/* Messages Container */}
//       <div className="flex-1 overflow-y-auto bg-gray-900 p-4 space-y-4">
//         <AnimatePresence>
//           {messages.map((message, index) => (
//             <motion.div
//               key={message.id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//             >
//               <div className={`max-w-[85%] sm:max-w-[70%] lg:max-w-[60%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
//                 <div className={`flex items-start space-x-3 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
//                   <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
//                     message.type === 'user' ? 'bg-blue-600' : 'bg-gray-700'
//                   }`}>
//                     {message.type === 'user' ? <FaUser className="text-white text-sm" /> : <FaRobot className="text-blue-400 text-sm" />}
//                   </div>
                  
//                   <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
//                     <div className={`rounded-2xl px-4 py-3 ${
//                       message.type === 'user' 
//                         ? 'bg-blue-600 text-white' 
//                         : 'bg-gray-700 text-gray-100'
//                     }`}>
//                       <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
//                         {message.content}
//                       </div>
//                     </div>
                    
//                     {/* Message Actions */}
//                     <div className={`flex items-center space-x-2 mt-2 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                       <span className="text-xs text-gray-500">
//                         {formatTimestamp(message.timestamp)}
//                       </span>
                      
//                       {message.type === 'ai' && (
//                         <div className="flex items-center space-x-1">
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => copyMessage(message.content)}
//                             className="text-gray-400 hover:text-white transition-colors p-1"
//                           >
//                             <FaRegCopy className="text-xs" />
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             className="text-gray-400 hover:text-green-400 transition-colors p-1"
//                           >
//                             <FaRegThumbsUp className="text-xs" />
//                           </motion.button>
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             className="text-gray-400 hover:text-red-400 transition-colors p-1"
//                           >
//                             <FaRegThumbsDown className="text-xs" />
//                           </motion.button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>

//         {/* Typing Indicator */}
//         {isTyping && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="flex justify-start"
//           >
//             <div className="max-w-[85%] sm:max-w-[70%] lg:max-w-[60%]">
//               <div className="flex items-start space-x-3">
//                 <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
//                   <FaRobot className="text-blue-400 text-sm" />
//                 </div>
//                 <div className="bg-gray-700 rounded-2xl px-4 py-3">
//                   <div className="flex items-center space-x-2">
//                     <FaSpinner className="animate-spin text-blue-400" />
//                     <span className="text-gray-300 text-sm">AI is thinking...</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Quick Suggestions */}
//       <AnimatePresence>
//         {showSuggestions && messages.length === 1 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             className="bg-gray-800 border-t border-gray-700 p-4"
//           >
//             <h3 className="text-gray-300 text-sm font-medium mb-3">Quick Suggestions:</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//               {quickSuggestions.map((suggestion, index) => (
//                 <motion.button
//                   key={index}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => {
//                     setInputMessage(suggestion);
//                     setShowSuggestions(false);
//                     inputRef.current?.focus();
//                   }}
//                   className="text-left p-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-gray-300 hover:text-white transition-colors text-sm"
//                 >
//                   {suggestion}
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Input Area */}
//       <div className="bg-gray-800 border-t border-gray-700 p-4">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-end space-x-3">
//             <div className="flex-1 relative">
//               <textarea
//                 ref={inputRef}
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter' && !e.shiftKey) {
//                     e.preventDefault();
//                     handleSendMessage(e);
//                   }
//                 }}
//                 placeholder="Ask me anything about your courses, programming, or learning..."
//                 className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-xl px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm sm:text-base"
//                 rows="1"
//                 style={{ minHeight: '44px', maxHeight: '120px' }}
//               />
//               <div className="absolute right-3 bottom-3 flex items-center space-x-2">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={handleVoiceInput}
//                   className={`p-1 rounded transition-colors ${
//                     isRecording ? 'text-red-400' : 'text-gray-400 hover:text-white'
//                   }`}
//                 >
//                   {isRecording ? <FaStop /> : <FaMicrophone />}
//                 </motion.button>
//               </div>
//             </div>
            
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleSendMessage}
//               disabled={!inputMessage.trim() || isTyping || loading}
//               className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors flex items-center justify-center"
//             >
//               {loading ? <FaSpinner className="text-sm animate-spin" /> : <FaPaperPlane className="text-sm" />}
//             </motion.button>
//           </div>
          
//           {error && (
//             <div className="mt-2 p-2 bg-red-900 bg-opacity-50 text-red-200 text-xs rounded">
//               {error}
//             </div>
//           )}
//           <div className="mt-2 text-xs text-gray-500 text-center">
//             Press Enter to send, Shift+Enter for new line
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// export default AIAssistant;