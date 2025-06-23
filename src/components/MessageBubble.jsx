import React from 'react';
import { motion } from 'framer-motion';

function MessageBubble({ message, isOwn }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-2 rounded mb-2 max-w-xs break-words ${isOwn ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white'}`}
    >
      <div className="text-sm">{message.senderName}</div>
      <div>{message.content}</div>
    </motion.div>
  );
}

export default MessageBubble;
