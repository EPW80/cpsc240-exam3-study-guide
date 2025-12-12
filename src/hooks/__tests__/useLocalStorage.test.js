import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    // Clear all localStorage mocks before each test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("returns initial value when localStorage is empty", () => {
    localStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    expect(result.current[0]).toBe("initialValue");
  });

  it("returns stored value from localStorage", () => {
    const storedValue = JSON.stringify("storedValue");
    localStorage.getItem.mockReturnValue(storedValue);

    const { result } = renderHook(() => useLocalStorage("testKey", "initialValue"));

    expect(result.current[0]).toBe("storedValue");
    expect(localStorage.getItem).toHaveBeenCalledWith("testKey");
  });

  it("updates localStorage when value is set", () => {
    localStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage("testKey", "initial"));

    act(() => {
      result.current[1]("newValue");
    });

    expect(result.current[0]).toBe("newValue");
    expect(localStorage.setItem).toHaveBeenCalledWith("testKey", JSON.stringify("newValue"));
  });

  it("handles function updater", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify(5));

    const { result } = renderHook(() => useLocalStorage("counter", 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(6);
    expect(localStorage.setItem).toHaveBeenCalledWith("counter", JSON.stringify(6));
  });

  it("handles complex objects", () => {
    const obj = { foo: "bar", count: 42 };
    localStorage.getItem.mockReturnValue(null);

    const { result } = renderHook(() => useLocalStorage("objKey", obj));

    expect(result.current[0]).toEqual(obj);

    act(() => {
      result.current[1]({ foo: "baz", count: 100 });
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "objKey",
      JSON.stringify({ foo: "baz", count: 100 })
    );
  });

  it("handles arrays", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([1, 2, 3]));

    const { result } = renderHook(() => useLocalStorage("arrayKey", []));

    expect(result.current[0]).toEqual([1, 2, 3]);

    act(() => {
      result.current[1]((prev) => [...prev, 4]);
    });

    expect(result.current[0]).toEqual([1, 2, 3, 4]);
  });

  it("handles localStorage parse errors gracefully", () => {
    localStorage.getItem.mockReturnValue("invalid json {");
    const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const { result } = renderHook(() => useLocalStorage("testKey", "fallback"));

    expect(result.current[0]).toBe("fallback");
    expect(consoleLogSpy).toHaveBeenCalled();

    consoleLogSpy.mockRestore();
  });

  it("persists dark mode preference", () => {
    localStorage.getItem.mockReturnValue(JSON.stringify(true));

    const { result } = renderHook(() => useLocalStorage("darkMode", false));

    expect(result.current[0]).toBe(true);

    act(() => {
      result.current[1](false);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("darkMode", JSON.stringify(false));
  });
});
