'use client';
import Link from 'next/link';

export default function LessonsPage() {
  const lessons = [
    { id: 1, title: 'Lesson 1: Hello World in Vim', description: 'Print your first output using Vim', progress: 100 },
    { id: 2, title: 'Lesson 2: Insert, Append & Open Line', description: 'Learn `i`, `a`, and `o` to manipulate lines', progress: 80 },
  ];

  return (
    <div>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '1.5rem' }}>All Lessons</h2>

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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem' }}>{lesson.title}</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '0.75rem', color: '#ccc' }}>{lesson.description}</p>
              <div
                style={{
                  height: '8px',
                  backgroundColor: '#444',
                  borderRadius: '4px',
                  overflow: 'hidden',
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
