import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import MessageBubble from '../components/MessageBubble';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';

function Chat() {
  const { id } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  const fetchMessages = async () => {
    const { data } = await api.get(`/chats/${id}/messages`);
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!content) return;
    setSending(true);
    const { data } = await api.post(`/chats/${id}/messages`, { content });
    setMessages((prev) => [...prev, data]);
    setContent('');
    setSending(false);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-4 flex flex-col"
    >
      <div className="flex-1 overflow-y-auto mb-4 flex flex-col space-y-2">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === user.id} />
        ))}
        <div ref={bottomRef} />
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 p-2 border rounded-l focus:outline-none"
          placeholder="Type a message"
        />
        <button
          type="submit"
          disabled={sending}
          className="px-4 bg-blue-500 text-white rounded-r hover:bg-blue-600"
        >
          {sending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </motion.main>
  );
}

export default Chat;
