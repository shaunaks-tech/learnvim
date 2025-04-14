'use client';
import Link from 'next/link';

export default function HomePage() {
  const lessons = [
    { id: 1, title: 'Lesson 1: Hello World in Vim', progress: 100 },
    { id: 2, title: 'Lesson 2: Insert, Append & Open Line', progress: 80 },
    { id: 3, title: 'Lesson 3: Editing & Movement', progress: 0 },
    { id: 4, title: 'Lesson 4: Visual Mode & Deletion', progress: 0 },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>Welcome to LearnVim</h2>
      <p style={{ marginBottom: '2rem', color: '#ccc' }}>
        Begin your journey toward Vim mastery — one keystroke at a time.
      </p>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: '1.25rem',
              color: '#fff',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{lesson.title}</h3>
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#444',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '0.75rem',
                }}
              >
                <div
                  style={{
                    width: `${lesson.progress}%`,
                    backgroundColor: '#7aa2f7',
                    height: '100%',
                    transition: 'width 0.3s ease-in-out',
                  }}
                ></div>
              </div>
            </div>
            <Link
              href={`/lesson/${lesson.id}`}
              style={{
                color: '#a6e3a1',
                fontWeight: '500',
                textDecoration: 'none',
                marginTop: 'auto',
                display: 'inline-block',
                marginTop: '0.5rem',
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
