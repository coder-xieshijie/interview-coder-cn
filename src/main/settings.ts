import { ipcMain } from 'electron'

ipcMain.handle('getAppSettings', () => {
  return settings
})

ipcMain.handle('updateAppSettings', (_event, _settings) => {
  Object.assign(settings, _settings)
})

export const settings = {
  apiBaseURL: process.env.API_BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  model: process.env.MODEL || '',
  codeLanguage: process.env.CODE_LANGUAGE || 'typescript',
  customPrompt: '',
  backgroundTheme: process.env.BACKGROUND_THEME || 'gray-dark',
  customBackgroundColor: process.env.CUSTOM_BACKGROUND_COLOR || '#6b7280',
  codeBlockTheme: process.env.CODE_BLOCK_THEME || 'github-dark',
  codeBlockBackgroundMode: process.env.CODE_BLOCK_BACKGROUND_MODE || 'theme',
  customCodeBlockBackgroundColor: process.env.CUSTOM_CODE_BLOCK_BACKGROUND_COLOR || '#0d1117'
}

export type AppSettings = typeof settings
