export const backgroundThemeOptions = [
  { value: 'gray-dark', label: '经典深灰（暗）', color: '#6b7280' },
  { value: 'graphite-dark', label: '石墨深色（暗）', color: '#374151' },
  { value: 'ocean-dark', label: '海军蓝（暗）', color: '#1e3a5f' },
  { value: 'mist-light', label: '雾灰浅色（明）', color: '#e5e7eb' },
  { value: 'paper-light', label: '纸白浅色（明）', color: '#f3f4f6' },
  { value: 'custom', label: '自定义调色板', color: '#6b7280' }
] as const

export const codeBlockThemeOptions = [
  { value: 'github-dark', label: 'GitHub Dark（暗）', background: '#0d1117' },
  { value: 'github-light', label: 'GitHub Light（明）', background: '#f6f8fa' },
  { value: 'atom-one-dark', label: 'Atom One Dark（暗）', background: '#282c34' },
  { value: 'atom-one-light', label: 'Atom One Light（明）', background: '#fafafa' }
] as const

export type BackgroundTheme = (typeof backgroundThemeOptions)[number]['value']
export type CodeBlockTheme = (typeof codeBlockThemeOptions)[number]['value']
export type CodeBlockBackgroundMode = 'theme' | 'custom'

export const defaultBackgroundTheme: BackgroundTheme = 'gray-dark'
export const defaultCustomBackgroundColor = '#6b7280'
export const defaultCodeBlockTheme: CodeBlockTheme = 'github-dark'
export const defaultCodeBlockBackgroundMode: CodeBlockBackgroundMode = 'theme'
export const defaultCustomCodeBlockBackgroundColor = '#0d1117'

const backgroundThemeColorMap = Object.fromEntries(
  backgroundThemeOptions.map((theme) => [theme.value, theme.color])
) as Record<BackgroundTheme, string>

const codeThemeBackgroundMap = Object.fromEntries(
  codeBlockThemeOptions.map((theme) => [theme.value, theme.background])
) as Record<CodeBlockTheme, string>

export function normalizeHexColor(value: string, fallback: string): string {
  const trimmed = value.trim()
  const hex6 = /^#[0-9a-fA-F]{6}$/
  const hex3 = /^#[0-9a-fA-F]{3}$/

  if (hex6.test(trimmed)) return trimmed.toLowerCase()
  if (hex3.test(trimmed)) {
    const [r, g, b] = trimmed.slice(1)
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase()
  }
  return fallback
}

export function resolveBackgroundColor(theme: BackgroundTheme, customColor: string): string {
  if (theme === 'custom') {
    return normalizeHexColor(customColor, defaultCustomBackgroundColor)
  }
  return backgroundThemeColorMap[theme] ?? defaultCustomBackgroundColor
}

export function resolveCodeBlockBackgroundColor(
  theme: CodeBlockTheme,
  mode: CodeBlockBackgroundMode,
  customColor: string
): string {
  if (mode === 'custom') {
    return normalizeHexColor(customColor, defaultCustomCodeBlockBackgroundColor)
  }
  return codeThemeBackgroundMap[theme] ?? defaultCustomCodeBlockBackgroundColor
}

export function isLightColor(hexColor: string): boolean {
  const normalized = normalizeHexColor(hexColor, '#000000')
  const r = Number.parseInt(normalized.slice(1, 3), 16)
  const g = Number.parseInt(normalized.slice(3, 5), 16)
  const b = Number.parseInt(normalized.slice(5, 7), 16)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance >= 0.6
}
