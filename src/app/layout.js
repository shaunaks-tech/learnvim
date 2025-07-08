// src/app/layout.js

export const metadata = {
  title: 'VimDojo Terminal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          height: '100dvh',
          width: '100vw',
          fontFamily: '"JetBrains Mono", "Fira Code", monospace',
          background: 'linear-gradient(to bottom right, #0f111a, #1a1e2e)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Terminal Container */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
          }}
        >
          <div
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              maxWidth: '1280px',
              maxHeight: '90vh',
              background: '#282828',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              borderRadius: '0.75rem',
              overflow: 'hidden',
            }}
          >
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            padding: '0.75rem 1rem',
            fontSize: '0.9rem',
            color: '#a89984',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            backgroundColor: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            textAlign: 'center',
          }}
        >
          contact — <a href="mailto:shaunak@vimdojo.app" style={{ color: '#83a598', textDecoration: 'none' }}>shaunak@vimdojo.app</a>
        </footer>
      </body>
    </html>
  );
}
