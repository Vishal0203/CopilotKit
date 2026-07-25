import { readFileSync } from "fs";
import { resolve } from "path";
import { isScrolledToBottom } from "./scroll-utils";

describe("CopilotChat message scrolling", () => {
  it("detects when the messages viewport is pinned to the bottom", () => {
    expect(
      isScrolledToBottom({
        scrollTop: 400,
        clientHeight: 200,
        scrollHeight: 600,
      }),
    ).toBe(true);
  });

  it("detects when a resize leaves the viewport away from the bottom", () => {
    expect(
      isScrolledToBottom({
        scrollTop: 400,
        clientHeight: 150,
        scrollHeight: 600,
      }),
    ).toBe(false);
  });

  it("allows a one-pixel tolerance for browser scroll rounding", () => {
    expect(
      isScrolledToBottom({
        scrollTop: 399,
        clientHeight: 200,
        scrollHeight: 600,
      }),
    ).toBe(true);
  });

  it("updates the user-scroll state from ResizeObserver callbacks", () => {
    const messagesSrc = readFileSync(
      resolve(__dirname, "Messages.tsx"),
      "utf-8",
    );

    expect(messagesSrc).toMatch(/new ResizeObserver/);
    expect(messagesSrc).toMatch(
      /isUserScrollUpRef\.current = !isScrolledToBottom\(container\)/,
    );
  });
});
