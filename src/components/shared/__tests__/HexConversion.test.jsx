import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HexConversion from "../HexConversion";

describe("HexConversion", () => {
  const basicProps = {
    decimal: 60,
    hex: "0x003C",
    steps: [
      { dividend: 60, remainder: "12 (C)", note: "Least significant digit" },
      { dividend: 3, remainder: "3", note: "Most significant digit" },
    ],
  };

  it("renders decimal to hex conversion title", () => {
    render(<HexConversion {...basicProps} />);

    expect(screen.getByText(/Converting 60₁₀ to Hex:/)).toBeInTheDocument();
  });

  it("displays the final hex result", () => {
    render(<HexConversion {...basicProps} />);

    expect(screen.getByText(/60₁₀ = 0x003C/)).toBeInTheDocument();
  });

  it("renders all division steps", () => {
    render(<HexConversion {...basicProps} />);

    // Check for remainders in the steps
    expect(screen.getByText(/12 \(C\)/)).toBeInTheDocument();
    expect(screen.getByText(/Least significant digit/)).toBeInTheDocument();
    expect(screen.getByText(/Most significant digit/)).toBeInTheDocument();
  });

  it("displays verification when provided", () => {
    const props = {
      ...basicProps,
      verification: "3×16¹ + 12×16⁰ = 48 + 12 = 60 ✓",
    };
    render(<HexConversion {...props} />);

    expect(screen.getByText(/3×16¹ \+ 12×16⁰ = 48 \+ 12 = 60 ✓/)).toBeInTheDocument();
  });

  it("handles steps without notes", () => {
    const props = {
      decimal: 25,
      hex: "0x19",
      steps: [
        { dividend: 25, remainder: "9" },
        { dividend: 1, remainder: "1" },
      ],
    };
    render(<HexConversion {...props} />);

    expect(screen.getByText(/Converting 25₁₀ to Hex:/)).toBeInTheDocument();
    expect(screen.getByText(/25₁₀ = 0x19/)).toBeInTheDocument();
  });

  it("formats remainders correctly in reading line", () => {
    render(<HexConversion {...basicProps} />);

    // The component extracts first part of remainder (splits by space)
    // "12 (C)" becomes "12", "3" becomes "3", resulting in "12 3"
    expect(screen.getByText(/Reading remainders:/)).toBeInTheDocument();
    expect(screen.getByText(/12 3/)).toBeInTheDocument();
  });

  it("applies correct styling classes", () => {
    const { container } = render(<HexConversion {...basicProps} />);

    const wrapper = container.querySelector(".bg-purple-50");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("p-4", "rounded-lg", "border-2", "border-purple-300");
  });

  it("handles three-step conversions", () => {
    const props = {
      decimal: 2355,
      hex: "0x0933",
      steps: [
        { dividend: 2355, remainder: "3", note: "Least significant digit" },
        { dividend: 147, remainder: "3" },
        { dividend: 9, remainder: "9", note: "Most significant digit" },
      ],
      verification: "9×16² + 3×16¹ + 3×16⁰ = 2304 + 48 + 3 = 2355 ✓",
    };
    render(<HexConversion {...props} />);

    expect(screen.getByText(/Converting 2355₁₀ to Hex:/)).toBeInTheDocument();
    expect(screen.getByText(/2355₁₀ = 0x0933/)).toBeInTheDocument();
    expect(screen.getByText(/3 3 9/)).toBeInTheDocument(); // Reading remainders
  });
});
