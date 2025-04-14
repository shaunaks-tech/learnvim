'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const colors = darkMode
    ? {
        background: 'linear-gradient(135deg, #0f0f0f, #1c1c2e)',
        text: '#f5f5f5',
        card: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        blur: 'blur(12px)',
        link: '#a6e3a1',
        progress: '#7aa2f7',
      }
    : {
        background: 'linear-gradient(135deg, #b0b4ba, #c2c7ce)',
        text: '#1a1a1a',
        card: 'rgba(200, 200, 200, 0.3)',
        border: 'rgba(0, 0, 0, 0.05)',
        blur: 'blur(8px)',
        link: '#007aff',
        progress: '#007aff',
      };

  const lessons = [
    { id: 1, title: 'Lesson 1: Hello World in Vim', progress: 100 },
    { id: 2, title: 'Lesson 2: Insert, Append & Open Line', progress: 80 },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Welcome to LearnVim</h2>
      <p style={{ marginBottom: '2rem', color: darkMode ? '#ccc' : '#555' }}>
        Begin your journey toward Vim mastery — one keystroke at a time.
      </p>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              backdropFilter: colors.blur,
              WebkitBackdropFilter: colors.blur,
              borderRadius: '16px',
              padding: '1.25rem',
              color: colors.text,
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
              <div
                style={{
                  height: '8px',
                  backgroundColor: colors.border,
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: `${lesson.progress}%`,
                    backgroundColor: colors.progress,
                    height: '100%',
                    transition: 'width 0.3s ease-in-out',
                  }}
                ></div>
              </div>
            </div>
            <Link
              href={`/lesson/${lesson.id}`}
              style={{
                color: colors.link,
                fontWeight: '500',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              {lesson.progress === 100 ? '✅ Completed' : lesson.progress > 0 ? 'Resume →' : 'Start →'}
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
