'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const colors = darkMode
    ? {
        background: 'linear-gradient(135deg, #0f0f0f, #1c1c2e)',
        text: '#f5f5f5',
        border: 'rgba(255,255,255,0.1)',
        glass: 'rgba(255, 255, 255, 0.05)',
        blur: 'blur(12px)',
      }
    : {
        background: 'linear-gradient(135deg, #b0b4ba, #c2c7ce)',
        text: '#1a1a1a',
        border: 'rgba(0,0,0,0.05)',
        glass: 'rgba(200, 200, 200, 0.3)',
        blur: 'blur(8px)',
      };

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <div
          style={{
            display: 'flex',
            minHeight: '100vh',
            background: colors.background,
            color: colors.text,
            fontFamily: 'monospace',
          }}
        >
          {/* Sidebar */}
          <aside
            style={{
              width: sidebarOpen ? '220px' : '60px',
              background: colors.glass,
              backdropFilter: colors.blur,
              WebkitBackdropFilter: colors.blur,
              borderRight: `1px solid ${colors.border}`,
              transition: 'width 0.3s ease',
              overflow: 'hidden',
              padding: '1rem 0.5rem',
            }}
          >
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{
                marginBottom: '1rem',
                background: 'none',
                border: 'none',
                color: colors.text,
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              {sidebarOpen ? '←' : '→'}
            </button>
            {sidebarOpen && (
              <nav>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ margin: '1rem 0' }}>
                    <Link href="/" style={{ color: colors.text, textDecoration: 'none' }}>
                      🏠 Home
                    </Link>
                  </li>
                  <li style={{ margin: '1rem 0' }}>
                    <Link href="/lessons" style={{ color: colors.text, textDecoration: 'none' }}>
                      📘 Lessons
                    </Link>
                  </li>
                  <li style={{ margin: '1rem 0' }}>
                    <Link href="#" style={{ color: colors.text, textDecoration: 'none' }}>
                      📈 Progress
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </aside>

          {/* Main Content */}
          <main style={{ flexGrow: 1, padding: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h1 style={{ fontSize: '1.5rem' }}>LearnVim</h1>
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem',
                  borderRadius: '8px',
                  background: colors.glass,
                  backdropFilter: colors.blur,
                  WebkitBackdropFilter: colors.blur,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  cursor: 'pointer',
                }}
              >
                {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}