// components/HomePage.js
'use client';
import Link from 'next/link';

export default function HomePage() {
  const colors = {
    background: '#1e1e1e',
    text: '#f5f5f5',
    card: '#2d2d2d',
    border: '#444',
    titleBar: '#3c3c3c',
    red: '#ff5f56',
    yellow: '#ffbd2e',
    green: '#27c93f',
    link: '#00ff66',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: colors.background,
        color: colors.text,
        fontFamily: 'Menlo, Monaco, monospace',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          backgroundColor: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '8px',
          width: '90%',
          maxWidth: '800px',
          overflow: 'hidden',
          boxShadow: '0 0 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Terminal title bar */}
        <div
          style={{
            backgroundColor: colors.titleBar,
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
          }}
        >
          <div style={{ backgroundColor: colors.red, borderRadius: '50%', width: '12px', height: '12px' }}></div>
          <div style={{ backgroundColor: colors.yellow, borderRadius: '50%', width: '12px', height: '12px' }}></div>
          <div style={{ backgroundColor: colors.green, borderRadius: '50%', width: '12px', height: '12px' }}></div>
        </div>

        {/* Terminal content */}
        <div style={{ padding: '1.5rem' }}>
          <p style={{ marginBottom: '1rem' }}>Welcome to <strong>VimDojo</strong></p>
          <p style={{ marginBottom: '2rem', color: '#ccc' }}>
            Launch into Vim mastery from your terminal. Start with VimTutor.
          </p>
          <p>
            <span style={{ color: colors.link }}>$</span>{' '}
            <Link href="/vimtutor" style={{ color: colors.link, textDecoration: 'none' }}>
              vimtutor
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
