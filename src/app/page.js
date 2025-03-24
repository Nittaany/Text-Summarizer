// src/App.jsx
"use client";
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/summarize', { text });
      setSummary(response.data.summary);
    } catch (error) {
      alert('Error generating summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const wordCount = (str) => str.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-700 to-purple-800 text-white font-sans">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-700">Text Summarizer</h1>
        <ul className="flex space-x-8">
          <li className="hover:text-indigo-500 cursor-pointer transition-colors">Home</li>
          <li className="hover:text-indigo-500 cursor-pointer transition-colors">About</li>
          <li className="hover:text-indigo-500 cursor-pointer transition-colors">Contact</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-5xl font-extrabold mb-8 animate-fade-in">✨ Summarize Your Text Instantly ✨</h1>
        
        <div className="flex w-full max-w-6xl bg-white p-8 rounded-2xl shadow-xl animate-slide-up gap-8">
          {/* Left Side - Input */}
          <div className="w-1/2">
            <textarea
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
              rows="12"
              placeholder="Paste your text here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <p className="text-gray-600 mt-2">Word Count: {wordCount(text)}</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 rounded-lg text-lg font-semibold hover:scale-105 transform transition-transform mt-4"
              disabled={loading}
            >
              {loading ? 'Summarizing...' : 'Generate Summary'}
            </button>
          </div>

          {/* Right Side - Output */}
          <div className="w-1/2 border-l border-gray-300 pl-8">
            <h2 className="text-2xl font-bold mb-4">📜 Summary</h2>
            <div className="p-4 bg-gray-100 text-gray-800 rounded-lg min-h-[300px] overflow-y-auto">
              {summary || 'Your summary will appear here...'}
            </div>
            {summary && <p className="text-gray-600 mt-2">Word Count: {wordCount(summary)}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
