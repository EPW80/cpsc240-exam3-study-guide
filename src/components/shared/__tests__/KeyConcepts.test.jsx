import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import KeyConcepts from "../KeyConcepts";

describe("KeyConcepts", () => {
  it("renders with default title", () => {
    const concepts = ["Concept 1", "Concept 2", "Concept 3"];
    render(<KeyConcepts concepts={concepts} />);

    expect(screen.getByText("Key Concepts:")).toBeInTheDocument();
  });

  it("renders with custom title", () => {
    const concepts = ["Concept 1"];
    render(<KeyConcepts title="Important Points:" concepts={concepts} />);

    expect(screen.getByText("Important Points:")).toBeInTheDocument();
  });

  it("renders all concept items", () => {
    const concepts = ["First concept", "Second concept", "Third concept"];
    render(<KeyConcepts concepts={concepts} />);

    concepts.forEach((concept) => {
      expect(screen.getByText(concept)).toBeInTheDocument();
    });
  });

  it("renders empty list when no concepts provided", () => {
    const { container } = render(<KeyConcepts concepts={[]} />);
    const listItems = container.querySelectorAll("li");

    expect(listItems).toHaveLength(0);
  });

  it("applies correct styling classes", () => {
    const concepts = ["Test"];
    const { container } = render(<KeyConcepts concepts={concepts} />);

    const wrapper = container.querySelector(".bg-blue-50");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveClass("border-l-4", "border-blue-500", "p-4", "mb-4");
  });

  it("renders concepts in a list", () => {
    const concepts = ["One", "Two"];
    const { container } = render(<KeyConcepts concepts={concepts} />);

    const list = container.querySelector("ul");
    expect(list).toBeInTheDocument();
    expect(list).toHaveClass("list-disc");
  });
});
