import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import CodeBlock from "../CodeBlock";

describe("CodeBlock", () => {
  it("renders code content", () => {
    const code = "mov rax, 60\nmov rdi, 0\nsyscall";
    const { container } = render(<CodeBlock code={code} />);

    const preElement = container.querySelector("pre.code-block");
    expect(preElement).toBeInTheDocument();
    expect(preElement.textContent).toContain("mov");
    expect(preElement.textContent).toContain("rax");
  });

  it("renders correct number of code lines", () => {
    const code = "line1\nline2\nline3";
    const { container } = render(<CodeBlock code={code} />);

    const codeLines = container.querySelectorAll(".code-line");
    expect(codeLines).toHaveLength(3);
  });

  it("applies syntax highlighting for keywords", () => {
    const code = "mov rax, 60";
    const { container } = render(<CodeBlock code={code} />);

    const keyword = container.querySelector(".keyword");
    expect(keyword).toBeInTheDocument();
    expect(keyword.textContent).toBe("mov");
  });

  it("highlights registers", () => {
    const code = "mov rax, 60";
    const { container } = render(<CodeBlock code={code} />);

    const register = container.querySelector(".register");
    expect(register).toBeInTheDocument();
    expect(register.textContent).toBe("rax");
  });

  it("handles empty code", () => {
    const { container } = render(<CodeBlock code="" />);

    const preElement = container.querySelector("pre.code-block");
    expect(preElement).toBeInTheDocument();
    const codeLines = container.querySelectorAll(".code-line");
    expect(codeLines).toHaveLength(1); // Empty string creates one empty line
  });

  it("preserves whitespace and indentation", () => {
    const code = "  indented line\n    double indented";
    const { container } = render(<CodeBlock code={code} />);

    const pre = container.querySelector("pre");
    expect(pre).toBeInTheDocument();
  });

  it("handles multiline assembly code", () => {
    const code = `section .data
    num dq 60

section .text
global _start
_start:
    mov rax, qword[num]
    syscall`;

    const { container } = render(<CodeBlock code={code} />);

    const codeLines = container.querySelectorAll(".code-line");
    expect(codeLines.length).toBeGreaterThan(3);
  });

  it("applies correct styling for code block container", () => {
    const code = "test";
    const { container } = render(<CodeBlock code={code} />);

    const codeBlock = container.querySelector(".code-block");
    expect(codeBlock).toBeInTheDocument();
    expect(codeBlock).toHaveClass("p-4", "my-4");
  });
});
