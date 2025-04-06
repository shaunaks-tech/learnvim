'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [showContent, setShowContent] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d0d0f',
        backgroundImage: 'linear-gradient(to bottom right, #0d0d0f, #1a1a1f)',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'monospace',
        color: '#cfcfcf',
      }}
    >
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .fade-in {
            animation: fadeInUp 0.6s ease-out forwards;
          }

          .glass-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 16px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            width: 90%;
            max-width: 700px;
          }

          .terminal-header {
            padding-bottom: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            color: #888;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          }

          .terminal-content {
            white-space: pre;
            font-size: 0.95rem;
            line-height: 1.7;
            color: #ccc;
          }

          .dir {
            color: #7aa2f7;
            cursor: pointer;
            user-select: none;
          }

          .file {
            color: #a6e3a1;
            cursor: pointer;
          }

          .file:hover {
            color: #b8f0b1;
            text-decoration: underline;
          }
        `}
      </style>

      <div className="fade-in" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 600 }}>🧠 Learn Vim</h1>
        <p style={{ marginTop: '1rem', color: '#aaa' }}>
          Vim is a minimalist, fast, keyboard-first text editor.
          This site helps you learn it interactively — no clutter, just commands.
        </p>
      </div>

      {/* Terminal UI */}
      {showContent && (
        <div className="glass-box fade-in" style={{ marginTop: '3rem' }}>
          <div className="terminal-header">~/projects/vim-learn</div>
          <div className="terminal-content">
{`$ cd src
$ tree
src/
  └── `}<span className="dir" onClick={() => setExpanded(!expanded)}>
              lessons/ {expanded ? '▼' : '▶'}
            </span>
{expanded && (
  <>
    {'\n        ├── '}
    <Link href="/lesson/1" className="file">Start Lesson 1</Link>
    {'\n        └── '}
    <Link href="/lesson/2" className="file">Start Lesson 2</Link>
  </>
)}
          </div>
        </div>
      )}
    </main>
  );
}
