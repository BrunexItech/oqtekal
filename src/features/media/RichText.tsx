import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { cn } from '@/lib/cn'

export const RichText = ({ data, className }: { data: SerializedEditorState; className?: string }) => (
  <LexicalRichText data={data} className={cn('prose-oq', className)} />
)
