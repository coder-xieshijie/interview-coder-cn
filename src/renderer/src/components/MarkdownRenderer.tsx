import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import '@/assets/code-themes.css'
import { useSettingsStore } from '@/lib/store/settings'
import { cn, isLightColor, resolveBackgroundColor } from '@/lib/utils'

// Ref https://github.com/tailwindlabs/tailwindcss-typography to fine-tune the markdown style
export default function MarkdownRenderer({ children }: { children: string }) {
  const { backgroundTheme, customBackgroundColor, codeBlockTheme } = useSettingsStore()
  const isLightBackground = isLightColor(
    resolveBackgroundColor(backgroundTheme, customBackgroundColor)
  )

  return (
    <div
      className={cn(
        'markdown-content prose prose-sm max-w-none prose-pre:p-0 prose-code:text-xs',
        isLightBackground ? 'prose-slate' : 'prose-invert',
        `code-theme-${codeBlockTheme}`
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
