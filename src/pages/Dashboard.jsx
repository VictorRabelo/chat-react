import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ChatCard from '../components/ChatCard';
import api from '../services/api';

function Dashboard() {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await api.get('/chats');
    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const createChat = async () => {
    const { data } = await api.post('/chats');
    setChats((prev) => [...prev, data]);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 p-4"
    >
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-gray-900 dark:text-white">Chats</h1>
        <button
          onClick={createChat}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          New Chat
        </button>
      </div>
      <ul>
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </ul>
    </motion.main>
  );
}

export default Dashboard;
