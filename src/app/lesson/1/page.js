'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LessonOne() {
  const [cursor, setCursor] = useState({ row: 0, col: 0 });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'h') setCursor((c) => ({ ...c, col: Math.max(0, c.col - 1) }));
      if (e.key === 'l') setCursor((c) => ({ ...c, col: c.col + 1 }));
      if (e.key === 'j') setCursor((c) => ({ ...c, row: c.row + 1 }));
      if (e.key === 'k') setCursor((c) => ({ ...c, row: Math.max(0, c.row - 1) }));
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0d0d0f',
        backgroundImage: 'linear-gradient(to bottom right, #0d0d0f, #1a1a1f)',
        padding: '2rem',
        fontFamily: 'monospace',
        color: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <style>
        {`
          .glass-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 16px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            width: 100%;
            max-width: 720px;
            margin-top: 3rem;
          }

          .grid {
            background: #1a1a1f;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1.5rem;
            display: inline-block;
            font-size: 1rem;
            line-height: 1.4;
            white-space: pre;
          }

          .cursor {
            color: #a6e3a1;
          }

          .back-link {
            color: #7aa2f7;
            text-decoration: none;
            margin-bottom: 2rem;
            font-size: 0.95rem;
          }

          .back-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <Link href="/" className="back-link">← Back to Home</Link>

      <div className="glass-box">
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Lesson 1: Navigation</h1>
        <p style={{ color: '#ccc' }}>
          Use <strong>h</strong>, <strong>j</strong>, <strong>k</strong>, <strong>l</strong> to move the cursor around.
        </p>

        <div className="grid">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={rowIndex}>
              {Array.from({ length: 20 }).map((_, colIndex) => {
                const isCursor = rowIndex === cursor.row && colIndex === cursor.col;
                return (
                  <span key={colIndex} className={isCursor ? 'cursor' : ''}>
                    {isCursor ? '▉' : '.'}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
