import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import FormField from '../components/FormField';

function Register() {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
      >
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">
          Create your account
        </h1>

        {error && (
          <div className="mb-4 text-sm text-red-500 text-center">
            {error}
          </div>
        )}

        <FormField
          label="Name"
          type="text"
          value={name}
          onChange={setName}
          required
        />

        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          required
        />

        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          required
        />

        <button
          type="submit"
          className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors duration-200"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </motion.main>
  );
}

export default Register;