/** Words in a Lexical document → minutes at ~220 words per minute. */
export const readingTime = (content: unknown): number => {
  let words = 0
  const walk = (node: unknown) => {
    if (!node || typeof node !== 'object') return
    const n = node as { text?: unknown; children?: unknown[]; root?: unknown }
    if (typeof n.text === 'string') words += n.text.trim().split(/\s+/).filter(Boolean).length
    if (n.root) walk(n.root)
    if (Array.isArray(n.children)) n.children.forEach(walk)
  }
  walk(content)
  return Math.max(1, Math.round(words / 220))
}
