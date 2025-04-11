'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LessonTwo() {
  const targetBuffer = ['This is a line', 'Another line'];
  const steps = [
    'Press `i` to enter INSERT mode before the `i` in "Thi".',
    'Type `s`, then press `ESC` to fix "Thi" to "This".',
    'Move cursor to after the word `a` and press `a` to append.',
    'Type `nother`, then press `ESC`.',
    'Press `o` to open a new line below and type `line`, then press `ESC`.',
    'Type `:wq` to save and quit.'
  ];

  const [mode, setMode] = useState('NORMAL');
  const [buffer, setBuffer] = useState(['Thi is a line']);
  const [cursor, setCursor] = useState({ row: 0, col: 0 });
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [stepIndex, setStepIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      const key = e.key;

      if (command) {
        if (key === 'Enter') {
          const trimmed = buffer.map((l) => l.trimRight());
          while (trimmed.length && trimmed[trimmed.length - 1] === '') trimmed.pop();
          if (JSON.stringify(trimmed) === JSON.stringify(targetBuffer)) {
            setOutput('$ vim file.txt\nSaved!\n');
            setDone(true);
            setStepIndex(steps.length);
          } else {
            setOutput('❌ Buffer does not match. Try again!');
          }
          setCommand('');
          setMode('NORMAL');
        } else if (key === 'Backspace') {
          setCommand((c) => c.slice(0, -1));
        } else if (key.length === 1) {
          setCommand((c) => c + key);
        }
        return;
      }

      if (mode === 'NORMAL') {
        if (key === 'i') {
          setMode('INSERT');
          if (stepIndex === 0) setStepIndex(1);
        } else if (key === 'a') {
          setCursor((c) => ({ ...c, col: c.col + 1 }));
          setMode('INSERT');
          if (stepIndex === 2) setStepIndex(3);
        } else if (key === 'o') {
          const newBuffer = [...buffer];
          newBuffer.splice(cursor.row + 1, 0, '');
          setBuffer(newBuffer);
          setCursor({ row: cursor.row + 1, col: 0 });
          setMode('INSERT');
          if (stepIndex === 4) setStepIndex(5);
        } else if (key === 'h') {
          setCursor((c) => ({ ...c, col: Math.max(0, c.col - 1) }));
        } else if (key === 'l') {
          const line = buffer[cursor.row] || '';
          setCursor((c) => ({ ...c, col: Math.min(line.length, c.col + 1) }));
        } else if (key === 'j') {
          setCursor((c) => ({
            row: Math.min(buffer.length - 1, c.row + 1),
            col: Math.min(buffer[Math.min(buffer.length - 1, c.row + 1)].length, c.col),
          }));
        } else if (key === 'k') {
          setCursor((c) => ({
            row: Math.max(0, c.row - 1),
            col: Math.min(buffer[Math.max(0, c.row - 1)].length, c.col),
          }));
        } else if (key === ':') {
          setCommand(':');
        }
      } else if (mode === 'INSERT') {
        if (key === 'Escape') {
          setMode('NORMAL');
          if (stepIndex === 1 || stepIndex === 3 || stepIndex === 5) setStepIndex(stepIndex + 1);
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
  }, [mode, buffer, cursor, command, stepIndex]);

  const renderBuffer = () =>
    buffer.map((line, row) => (
      <div key={row}>
        {line.split('').map((char, col) => {
          const isCursor = row === cursor.row && col === cursor.col;
          return (
            <span
              key={col}
              style={
                isCursor
                  ? {
                      backgroundColor: mode === 'INSERT' ? '#a6e3a1' : '#7aa2f7',
                      color: '#000',
                    }
                  : {}
              }
            >
              {char || ' '}
            </span>
          );
        })}
        {cursor.row === row && cursor.col === line.length && (
          <span
            style={{
              backgroundColor: mode === 'INSERT' ? '#a6e3a1' : '#7aa2f7',
              color: '#000',
            }}
          >
            {' '}
          </span>
        )}
      </div>
    ));

  return (
    <main style={{ padding: '2rem', fontFamily: 'monospace', color: '#e0e0e0', background: '#111', minHeight: '100vh' }}>
      <Link href="/" style={{ color: '#7aa2f7', textDecoration: 'none' }}>← Back to Home</Link>
      <h1 style={{ marginTop: '1rem' }}>Lesson 2: Insert, Append & Open Line</h1>
      <p>{steps[stepIndex] || '🎉 All done!'}</p>
      <div style={{ background: '#1a1a1f', padding: '1rem', borderRadius: '6px', marginTop: '1rem' }}>{renderBuffer()}</div>
      <p style={{ color: '#999', marginTop: '1rem' }}>Mode: <strong>{mode}</strong></p>
      {output && <div style={{ marginTop: '1rem', background: '#222', padding: '1rem', borderRadius: '6px' }}>{output}</div>}
    </main>
  );
}