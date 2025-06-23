import React from 'react';

function FormField({ label, type = 'text', value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-gray-700 dark:text-gray-200">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>
  );
}

export default FormField;
