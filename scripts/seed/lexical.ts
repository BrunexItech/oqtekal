/** Builds Lexical rich-text JSON from a tiny block list, for seeding articles and legal pages. */

export type Block = ['p' | 'h2' | 'h3', string] | ['ul', string[]]

const text = (value: string) => ({
  type: 'text',
  version: 1,
  text: value,
  format: 0,
  style: '',
  mode: 'normal',
  detail: 0,
})

const base = { version: 1, direction: 'ltr' as const, format: '' as const, indent: 0 }

const node = ([kind, value]: Block) => {
  switch (kind) {
    case 'p':
      return { ...base, type: 'paragraph', textFormat: 0, textStyle: '', children: [text(value)] }
    case 'h2':
    case 'h3':
      return { ...base, type: 'heading', tag: kind, children: [text(value)] }
    case 'ul':
      return {
        ...base,
        type: 'list',
        listType: 'bullet',
        start: 1,
        tag: 'ul',
        children: value.map((item, i) => ({
          ...base,
          type: 'listitem',
          value: i + 1,
          children: [text(item)],
        })),
      }
  }
}

export const lexical = (blocks: Block[]) => ({
  root: { ...base, type: 'root', children: blocks.map(node) },
})
