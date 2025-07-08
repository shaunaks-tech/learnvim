'use client';
import { useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';
import { useRouter } from 'next/navigation';

export default function VimTerminal() {
  const terminalRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    let term;

    const loadTerminal = async () => {
      const { Terminal } = await import('xterm');

      term = new Terminal({
        cursorBlink: true,
        rows: 24,
        cols: 80,
        theme: {
          background: '#1c1c1c',
          foreground: '#f5f5f5',
        },
      });

      term.open(terminalRef.current);

      term.writeln('Welcome to VimDojo');
      term.writeln('Begin your journey toward Vim mastery...');
      term.writeln('-------------------------------------------');

      const res = await fetch('/vimtutor.txt');
      const text = await res.text();
      term.write(text.replace(/\n/g, '\r\n'));

      let commandBuffer = '';

      term.onData((data) => {
        if (data === '\r') {
          if (commandBuffer.trim() === ':wq') {
            term.writeln('\r\nLesson completed. Loading homepage...');
            localStorage.setItem('vimtutorComplete', 'true');
            setTimeout(() => router.push('/'), 2000);
          } else {
            term.writeln('');
          }
          commandBuffer = '';
        } else if (data === '\u007F') {
          if (commandBuffer.length > 0) {
            commandBuffer = commandBuffer.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          commandBuffer += data;
          term.write(data);
        }
      });
    };

    loadTerminal();

    return () => {
      if (term) term.dispose();
    };
  }, [router]);

  return <div ref={terminalRef} style={{ height: '100vh', width: '100%' }} />;
}
