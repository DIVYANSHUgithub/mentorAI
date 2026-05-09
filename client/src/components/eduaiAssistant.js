import { useState, useEffect, useRef } from 'react';
import PageBackNav from './PageBackNav';

function EduAIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const url="http://localhost:5555/api/chat";
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content })
      });

      if (!res.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await res.json();
      const aiMessage = { role: 'assistant', content: data.reply || '' };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <div className="chat-container">
        <header className="chat-header">
          <PageBackNav
            className="mb-4"
            buttonClassName="inline-flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-semibold text-sky-200 transition-colors hover:bg-white/10 hover:text-white"
          />
          <h1>eduAI Assistant</h1>
          <p>Ask any educational question and get AI-powered help.</p>
        </header>

        <div className="messages" ref={messagesContainerRef}>
          {messages.length === 0 && (
            <div className="empty-state">
              <h2>Welcome 👋</h2>
              <p>Try asking something like:</p>
              <ul>
                <li>Explain Newton&apos;s laws in simple words.</li>
                <li>Help me understand the difference between HTTP and HTTPS.</li>
                <li>Give me a quick summary of World War II.</li>
              </ul>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message message-${msg.role === 'user' ? 'user' : 'assistant'}`}
            >
              <div className="message-role">
                {msg.role === 'user' ? 'You' : 'eduAI'}
              </div>
              <div className="message-content">
                {msg.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    {i < msg.content.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
            </div>
          ))}

          {loading && (
            <div className="message message-assistant">
              <div className="message-role">eduAI</div>
              <div className="message-content">
                <span className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {error && <div className="error">{error}</div>}

        <form className="input-bar" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Ask a question about math, science, history, programming..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EduAIAssistant;
