'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LessonTwo() {
  const templates = {
    python: ['print("Hello, World!")'],
    javascript: ['console.log("Hello, World!");'],
    c: [
      '#include <stdio.h>',
      '',
      'int main() {',
      '    printf("Hello, World!\\n");',
      '    return 0;',
      '}',
    ],
  };

  const [language, setLanguage] = useState('python');
  const [mode, setMode] = useState('NORMAL'); // NORMAL | INSERT
  const [buffer, setBuffer] = useState(['']);
  const [cursor, setCursor] = useState({ row: 0, col: 0 });
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [done, setDone] = useState(false);

  const correctBuffer = templates[language];

  useEffect(() => {
    const handleKey = (e) => {
      if (e.metaKey || e.ctrlKey) return; // avoid interfering with browser shortcuts
      e.preventDefault();
      const key = e.key;

      if (command) {
        if (key === 'Enter') {
          if (command === ':wq') {
            const trimmed = buffer.map((l) => l.trimRight());
            if (JSON.stringify(trimmed) === JSON.stringify(correctBuffer)) {
              setDone(true);
              const cmd = {
                python: 'python file.py',
                javascript: 'node file.js',
                c: './a.out',
              }[language];
              setOutput(`$ ${cmd}\nHello, World!`);
            } else {
              setOutput('❌ Incorrect program. Try again!');
              setDone(false);
            }
          }
          setCommand('');
          setMode('NORMAL');
          return;
        } else if (key === 'Backspace') {
          setCommand((c) => c.slice(0, -1));
        } else if (key.length === 1) {
          setCommand((c) => c + key);
        }
        return;
      }

      if (mode === 'NORMAL') {
        if (key === 'i') setMode('INSERT');
        else if (key === 'a') {
          setCursor((c) => ({ ...c, col: c.col + 1 }));
          setMode('INSERT');
        } else if (key === 'o') {
          const newBuffer = [...buffer];
          newBuffer.splice(cursor.row + 1, 0, '');
          setBuffer(newBuffer);
          setCursor({ row: cursor.row + 1, col: 0 });
          setMode('INSERT');
        } else if (key === ':') {
          setCommand(':');
        }
      } else if (mode === 'INSERT') {
        if (key === 'Escape') {
          setMode('NORMAL');
        } else if (key === 'Backspace') {
          const row = buffer[cursor.row];
          if (cursor.col > 0) {
            const newRow = row.slice(0, cursor.col - 1) + row.slice(cursor.col);
            const newBuffer = [...buffer];
            newBuffer[cursor.row] = newRow;
            setBuffer(newBuffer);
            setCursor((c) => ({ ...c, col: c.col - 1 }));
          }
        } else if (key === 'Enter') {
          const newBuffer = [...buffer];
          const nextRow = buffer[cursor.row].slice(cursor.col);
          newBuffer[cursor.row] = buffer[cursor.row].slice(0, cursor.col);
          newBuffer.splice(cursor.row + 1, 0, nextRow);
          setBuffer(newBuffer);
          setCursor({ row: cursor.row + 1, col: 0 });
        } else if (key === 'Tab') {
          const row = buffer[cursor.row];
          const newRow = row.slice(0, cursor.col) + '    ' + row.slice(cursor.col);
          const newBuffer = [...buffer];
          newBuffer[cursor.row] = newRow;
          setBuffer(newBuffer);
          setCursor((c) => ({ ...c, col: c.col + 4 }));
        } else if (key.length === 1) {
          const row = buffer[cursor.row];
          const newRow = row.slice(0, cursor.col) + key + row.slice(cursor.col);
          const newBuffer = [...buffer];
          newBuffer[cursor.row] = newRow;
          setBuffer(newBuffer);
          setCursor((c) => ({ ...c, col: c.col + 1 }));
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [mode, buffer, cursor, command, done, language]);

  const renderBuffer = () =>
    buffer.map((line, row) => (
      <div key={row}>
        {line.split('').map((char, col) =>
          cursor.row === row && cursor.col === col && mode === 'INSERT' ? (
            <span key={col} style={{ backgroundColor: '#a6e3a1', color: '#000' }}>{char || ' '}</span>
          ) : (
            <span key={col}>{char}</span>
          )
        )}
        {cursor.row === row && cursor.col === line.length && mode === 'INSERT' && (
          <span style={{ backgroundColor: '#a6e3a1', color: '#000' }}> </span>
        )}
      </div>
    ));

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
          .glass {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.07);
            border-radius: 16px;
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
            padding: 2rem;
            width: 100%;
            max-width: 720px;
            margin-top: 2rem;
          }

          .select {
            margin-bottom: 1rem;
            font-size: 1rem;
            background: #1e1e1e;
            color: #eee;
            border: 1px solid #333;
            border-radius: 6px;
            padding: 0.5rem;
          }

          .terminal-output {
            background: #111;
            padding: 1rem;
            margin-top: 1.5rem;
            border-radius: 6px;
            color: #a6e3a1;
            font-size: 0.95rem;
            white-space: pre-wrap;
          }
        `}
      </style>

      <Link href="/" style={{ color: '#7aa2f7', marginBottom: '1rem', textDecoration: 'none' }}>
        ← Back to Home
      </Link>

      <div className="glass">
        <h1 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Lesson 2: Insert & Hello World</h1>
        <label>
          Choose your language:{' '}
          <select
            className="select"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setBuffer(['']);
              setCursor({ row: 0, col: 0 });
              setDone(false);
              setMode('NORMAL');
              setCommand('');
              setOutput('');
            }}
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="c">C</option>
          </select>
        </label>

        <p style={{ margin: '1rem 0', color: '#bbb' }}>
          Use Vim commands to write a Hello World program.<br />
          Try using: <code>i</code>, <code>o</code>, <code>a</code>, <code>ESC</code>, <code>:wq</code>.
        </p>

        <div
          style={{
            background: '#1a1a1f',
            padding: '1rem',
            borderRadius: '6px',
            minHeight: '200px',
            fontSize: '1rem',
            lineHeight: '1.6',
            whiteSpace: 'pre-wrap',
          }}
        >
          {renderBuffer()}
        </div>

        {command && (
          <div style={{ marginTop: '1rem', color: '#88c0d0' }}>
            <strong>{command}</strong>
          </div>
        )}

        <p style={{ marginTop: '1rem', fontStyle: 'italic', color: '#888' }}>
          Mode: <strong>{mode}</strong>
        </p>

        {output && (
          <div className="terminal-output">
            {output}
          </div>
        )}
      </div>
    </main>
  );
}
