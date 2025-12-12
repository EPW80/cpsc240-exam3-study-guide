import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";
import { AppProvider, useAppContext } from "../AppContext";

// Mock useLocalStorage
vi.mock("../../hooks/useLocalStorage", () => ({
  useLocalStorage: (key, initialValue) => {
    const { useState } = React;
    const [state, setState] = useState(initialValue);
    return [state, setState];
  },
}));

describe("AppContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const wrapper = ({ children }) => <AppProvider>{children}</AppProvider>;

  it("provides default values", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.activeTab).toBe("overview");
    expect(result.current.expandedSections).toEqual({});
    expect(result.current.completedProblems).toEqual([]);
    expect(result.current.darkMode).toBe(false);
  });

  it("throws error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => {
      renderHook(() => useAppContext());
    }).toThrow("useAppContext must be used within AppProvider");

    consoleErrorSpy.mockRestore();
  });

  it("updates active tab", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.setActiveTab("problem1");
    });

    expect(result.current.activeTab).toBe("problem1");
  });

  it("toggles section expansion", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleSection("section1");
    });

    expect(result.current.expandedSections.section1).toBe(true);

    act(() => {
      result.current.toggleSection("section1");
    });

    expect(result.current.expandedSections.section1).toBe(false);
  });

  it("toggles multiple sections independently", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleSection("section1");
      result.current.toggleSection("section2");
    });

    expect(result.current.expandedSections.section1).toBe(true);
    expect(result.current.expandedSections.section2).toBe(true);

    act(() => {
      result.current.toggleSection("section1");
    });

    expect(result.current.expandedSections.section1).toBe(false);
    expect(result.current.expandedSections.section2).toBe(true);
  });

  it("toggles problem completion", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleProblemComplete("problem1");
    });

    expect(result.current.completedProblems).toContain("problem1");
    expect(result.current.isProblemCompleted("problem1")).toBe(true);

    act(() => {
      result.current.toggleProblemComplete("problem1");
    });

    expect(result.current.completedProblems).not.toContain("problem1");
    expect(result.current.isProblemCompleted("problem1")).toBe(false);
  });

  it("handles multiple completed problems", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleProblemComplete("problem1");
      result.current.toggleProblemComplete("problem2");
      result.current.toggleProblemComplete("problem3");
    });

    expect(result.current.completedProblems).toHaveLength(3);
    expect(result.current.completedProblems).toEqual(["problem1", "problem2", "problem3"]);
  });

  it("checks if problem is completed correctly", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.isProblemCompleted("problem1")).toBe(false);

    act(() => {
      result.current.toggleProblemComplete("problem1");
    });

    expect(result.current.isProblemCompleted("problem1")).toBe(true);
    expect(result.current.isProblemCompleted("problem2")).toBe(false);
  });

  it("toggles dark mode", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(result.current.darkMode).toBe(false);

    act(() => {
      result.current.setDarkMode(true);
    });

    expect(result.current.darkMode).toBe(true);

    act(() => {
      result.current.setDarkMode(false);
    });

    expect(result.current.darkMode).toBe(false);
  });

  it("provides all expected context methods", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    expect(typeof result.current.setActiveTab).toBe("function");
    expect(typeof result.current.toggleSection).toBe("function");
    expect(typeof result.current.setExpandedSections).toBe("function");
    expect(typeof result.current.toggleProblemComplete).toBe("function");
    expect(typeof result.current.setCompletedProblems).toBe("function");
    expect(typeof result.current.isProblemCompleted).toBe("function");
    expect(typeof result.current.setDarkMode).toBe("function");
  });

  it("maintains expanded sections state across operations", () => {
    const { result } = renderHook(() => useAppContext(), { wrapper });

    act(() => {
      result.current.toggleSection("s1");
      result.current.toggleSection("s2");
      result.current.setActiveTab("newTab"); // Change unrelated state
    });

    expect(result.current.expandedSections.s1).toBe(true);
    expect(result.current.expandedSections.s2).toBe(true);
    expect(result.current.activeTab).toBe("newTab");
  });
});
