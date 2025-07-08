'use client';
import { useEffect, useRef } from 'react';
import 'xterm/css/xterm.css';

export default function TerminalShell() {
  const terminalRef = useRef(null);

  useEffect(() => {
    const loadTerminal = async () => {
      const { Terminal } = await import('xterm');

      const term = new Terminal({
        cursorBlink: true,
        scrollback: 1000,
        fontSize: 15,
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        theme: {
          background: '#282828',
          foreground: '#ebdbb2',
          cursor: '#fe8019',
          black: '#282828',
          red: '#cc241d',
          green: '#98971a',
          yellow: '#d79921',
          blue: '#458588',
          magenta: '#b16286',
          cyan: '#689d6a',
          white: '#a89984',
        },
      });

      term.open(terminalRef.current);
      term.focus();

      // Boot message
      term.writeln('\x1b[1;33mWelcome to \x1b[1;32mVimDojo\x1b[0m Terminal 🧘');
      term.writeln('Type \x1b[1;34mvimtutor\x1b[0m, \x1b[1;34mlessons\x1b[0m, \x1b[1;34mhelp\x1b[0m, or \x1b[1;34mclear\x1b[0m\n');
      term.write('$ ');

      let buffer = '';

      const handleCommand = (cmd) => {
        switch (cmd) {
          case 'vimtutor':
            term.writeln('Launching VimTutor...\n');
            term.writeln('[Insert interactive VimTutor here]');
            break;
          case 'lessons':
            term.writeln('📚 Lessons:\n 1. Hello Vim\n 2. Movement\n 3. Insert & Delete\n');
            break;
          case 'clear':
            term.clear();
            break;
          case 'help':
            term.writeln('🛠 Available commands:\n  vimtutor   Start the tutor\n  lessons    List lessons\n  clear      Clear terminal\n  help       Show this help');
            break;
          default:
            term.writeln(`Command not found: ${cmd}`);
        }
      };

      term.onData((data) => {
        if (data === '\r') {
          term.write('\r\n');
          handleCommand(buffer.trim());
          buffer = '';
          term.write('$ ');
        } else if (data === '\u007F') {
          if (buffer.length > 0) {
            buffer = buffer.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          buffer += data;
          term.write(data);
        }
      });
    };

    loadTerminal();
  }, []);

  return (
    <div style={{
      height: '100dvh',
      width: '100dvw',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(to bottom right, #0f111a, #1a1e2e)',
    }}>
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          backgroundColor: '#282828',
          overflow: 'hidden',
          padding: 8,
          margin: 0,
        }}
      />
      <div style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'rgba(40, 40, 40, 0.8)',
        color: '#bdae93',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.85rem',
        textAlign: 'center',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
      }}>
        Contact: <span style={{ color: '#83a598' }}>shaunak@vimdojo.app</span>
      </div>
    </div>
  );
}
