import React, { useMemo } from "react";

/**
 * Assembly language keywords for syntax highlighting
 */
const KEYWORDS = [
  "section",
  "mov",
  "mul",
  "div",
  "inc",
  "dec",
  "cmp",
  "jne",
  "jge",
  "jmp",
  "jg",
  "jle",
  "push",
  "pop",
  "loop",
  "add",
  "sub",
  "xor",
  "db",
  "dq",
  "dw",
  "word",
  "qword",
  "byte",
];

const REGISTERS = [
  "ax",
  "bx",
  "cx",
  "dx",
  "eax",
  "ebx",
  "ecx",
  "edx",
  "rax",
  "rbx",
  "rcx",
  "rdx",
  "rsi",
  "rdi",
  "rsp",
  "rbp",
  "r8",
  "r9",
  "r10",
  "r11",
  "r12",
  "r13",
  "r14",
  "r15",
  "al",
  "bl",
  "cl",
  "dl",
];

const SYNTAX_REGEX =
  /(\bsection\b|\bmov\b|\bmul\b|\bdiv\b|\binc\b|\bdec\b|\bcmp\b|\bjne\b|\bjge\b|\bpush\b|\bpop\b|\bloop\b|\badd\b|\bjmp\b|\bjg\b|\bjle\b|\bxor\b|\bdb\b|\bdq\b|\bdw\b|\bword\b|\bqword\b|\bbyte\b|\bsub\b|ax|bx|cx|dx|eax|ebx|ecx|edx|rax|rbx|rcx|rdx|rsi|rdi|rsp|rbp|r8|r9|r10|r11|r12|r13|r14|r15|al|bl|cl|dl|0x[0-9A-Fa-f]+|;.*$)/;

const highlightToken = (part, index) => {
  if (KEYWORDS.includes(part)) {
    return (
      <span key={index} className="keyword">
        {part}
      </span>
    );
  } else if (REGISTERS.includes(part)) {
    return (
      <span key={index} className="register">
        {part}
      </span>
    );
  } else if (part.startsWith("0x") || part.match(/^\d+$/)) {
    return (
      <span key={index} className="number">
        {part}
      </span>
    );
  } else if (part.startsWith(";")) {
    return (
      <span key={index} className="comment">
        {part}
      </span>
    );
  }
  return <span key={index}>{part}</span>;
};

/**
 * CodeBlock component with syntax highlighting for assembly language
 * @param {Object} props
 * @param {string} props.code - Assembly code to display and highlight
 * @returns {JSX.Element}
 */
const CodeBlock = ({ code }) => {
  const highlightedLines = useMemo(() => {
    return code.split("\n").map((line, lineIndex) => ({
      lineNumber: lineIndex,
      content: line.split(SYNTAX_REGEX).map((part, tokenIndex) => highlightToken(part, tokenIndex)),
    }));
  }, [code]);

  return (
    <pre className="code-block p-4 my-4">
      {highlightedLines.map(({ lineNumber, content }) => (
        <div key={lineNumber} className="code-line">
          {content}
        </div>
      ))}
    </pre>
  );
};

export default CodeBlock;
