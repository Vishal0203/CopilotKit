export type ScrollContainerMetrics = Pick<
  HTMLElement,
  "clientHeight" | "scrollHeight" | "scrollTop"
>;

export function isScrolledToBottom(container: ScrollContainerMetrics) {
  return (
    container.scrollHeight - container.scrollTop - container.clientHeight <= 1
  );
}
