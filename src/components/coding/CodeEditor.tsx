import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { SupportedLanguage } from '../../types/coding';

interface CodeEditorProps {
  language: SupportedLanguage;
  code: string;
  onChange: (value: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  code,
  onChange,
}) => {
  const [monacoFailed, setMonacoFailed] = useState<boolean>(false);

  // Map to Monaco language identifiers
  const monacoLang = language === 'cpp' ? 'cpp' : language === 'python' ? 'python' : 'javascript';

  if (monacoFailed) {
    return (
      <div className="relative w-full h-full flex flex-col font-code">
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          spellCheck={false}
          className="w-full h-full p-4 bg-dark-950 text-slate-100 font-mono text-sm leading-relaxed resize-none outline-none focus:ring-1 focus:ring-brand-cyan/50"
          placeholder="Write your solution here..."
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-dark-950">
      <Editor
        height="100%"
        language={monacoLang}
        value={code}
        theme="vs-dark"
        onChange={(val) => onChange(val || '')}
        options={{
          fontSize: 13,
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 4,
          lineNumbers: 'on',
          padding: { top: 12, bottom: 12 },
          suggestOnTriggerCharacters: true,
          renderLineHighlight: 'all',
          cursorBlinking: 'smooth',
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};
