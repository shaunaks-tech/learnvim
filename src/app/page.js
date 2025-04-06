'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        color: '#fff',
        fontFamily: 'monospace',
        padding: '2rem',
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🧠 Learn Vim</h1>
      <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
        Interactive tutorials to master Vim, one command at a time.
      </p>
      <Link
        href="/lesson/1"
        style={{
          backgroundColor: '#10b981',
          color: '#000',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: 'bold',
          transition: 'background-color 0.2s ease-in-out',
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#059669')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#10b981')}
      >
        🚀 Start Lesson 1
      </Link>
    </main>
  );
}
