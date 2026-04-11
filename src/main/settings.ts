import { ipcMain } from 'electron'

export const gpt54ModelPreset = {
  apiBaseURL: 'https://gmncode.com/v1',
  apiKey: 'sk-02b3aa569b55ae7b3187e29d83f0568872495bc6b9c4744df2d4d0dea798413b',
  model: 'gpt-5.4'
}

export const qwen36PlusModelPreset = {
  apiBaseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'sk-b94919fd83aa4db88814c65c2f60a245',
  model: 'qwen3.6-plus'
}

ipcMain.handle('getAppSettings', () => {
  return settings
})

ipcMain.handle('updateAppSettings', (_event, _settings) => {
  Object.assign(settings, _settings)
})

export const settings = {
  apiBaseURL: process.env.API_BASE_URL || gpt54ModelPreset.apiBaseURL,
  apiKey: process.env.API_KEY || gpt54ModelPreset.apiKey,
  model: process.env.MODEL || gpt54ModelPreset.model,
  codeLanguage: process.env.CODE_LANGUAGE || 'typescript',
  customPrompt: '',
  backgroundTheme: process.env.BACKGROUND_THEME || 'gray-dark',
  customBackgroundColor: process.env.CUSTOM_BACKGROUND_COLOR || '#6b7280',
  codeBlockTheme: process.env.CODE_BLOCK_THEME || 'github-dark',
  codeBlockBackgroundMode: process.env.CODE_BLOCK_BACKGROUND_MODE || 'theme',
  customCodeBlockBackgroundColor: process.env.CUSTOM_CODE_BLOCK_BACKGROUND_COLOR || '#0d1117'
}

export type AppSettings = typeof settings
