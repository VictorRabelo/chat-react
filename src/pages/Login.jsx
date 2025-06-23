import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/FormField';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-1 items-center justify-center"
    >
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4 text-center text-gray-900 dark:text-white">Login</h1>
        <FormField label="Email" type="email" value={email} onChange={setEmail} />
        <FormField label="Password" type="password" value={password} onChange={setPassword} />
        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </motion.main>
  );
}

export default Login;
