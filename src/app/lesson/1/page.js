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
        padding: '2rem',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontFamily: 'monospace',
      }}
    >
      <Link href="/" style={{ color: '#10b981', textDecoration: 'underline' }}>
        ← Back to Home
      </Link>

      <h1 style={{ fontSize: '2.5rem', marginTop: '1rem' }}>Lesson 1: Navigation</h1>
      <p style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
        Use <strong>h</strong>, <strong>j</strong>, <strong>k</strong>, <strong>l</strong> to move the cursor around.
      </p>

      <div
        style={{
          marginTop: '2rem',
          fontFamily: 'monospace',
          backgroundColor: '#1e293b',
          padding: '1rem',
          width: 'fit-content',
          borderRadius: '0.5rem',
          boxShadow: '0 0 0 2px #10b981',
        }}
      >
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex}>
            {Array.from({ length: 20 }).map((_, colIndex) => {
              const isCursor = rowIndex === cursor.row && colIndex === cursor.col;
              return (
                <span key={colIndex} style={{ color: isCursor ? '#10b981' : '#fff' }}>
                  {isCursor ? '▉' : '.'}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </main>
  );
}
