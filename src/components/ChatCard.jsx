import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function ChatCard({ chat }) {
  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-700 rounded p-4 shadow mb-2"
    >
      <Link to={`/chat/${chat.id}`} className="block text-gray-900 dark:text-white">
        {chat.name}
      </Link>
    </motion.li>
  );
}

export default ChatCard;
