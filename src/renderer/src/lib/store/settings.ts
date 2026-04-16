import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BackgroundTheme, CodeBlockBackgroundMode, CodeBlockTheme } from '@/lib/utils'
import {
  defaultBackgroundTheme,
  defaultCodeBlockBackgroundMode,
  defaultCodeBlockTheme,
  defaultCustomBackgroundColor,
  defaultCustomCodeBlockBackgroundColor
} from '@/lib/utils'

interface Settings {
  apiBaseURL: string
  apiKey: string
  model: string
  customModels: string[]
  customPrompt: string

  opacity: number
  codeLanguage: string
  backgroundTheme: BackgroundTheme
  customBackgroundColor: string
  codeBlockTheme: CodeBlockTheme
  codeBlockBackgroundMode: CodeBlockBackgroundMode
  customCodeBlockBackgroundColor: string
}

interface SettingsStore extends Settings {
  updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  syncSettings: (settings: Partial<Settings>) => void
}

const defaultModelConfig = {
  apiBaseURL: 'https://gmncode.com/v1',
  apiKey: 'sk-02b3aa569b55ae7b3187e29d83f0568872495bc6b9c4744df2d4d0dea798413b',
  model: 'gpt-5.4'
}

const defaultSettings: Settings = {
  apiBaseURL: defaultModelConfig.apiBaseURL,
  apiKey: defaultModelConfig.apiKey,
  model: defaultModelConfig.model,
  customModels: [],
  customPrompt: '',
  codeLanguage: '',

  opacity: 0.8,
  backgroundTheme: defaultBackgroundTheme,
  customBackgroundColor: defaultCustomBackgroundColor,
  codeBlockTheme: defaultCodeBlockTheme,
  codeBlockBackgroundMode: defaultCodeBlockBackgroundMode,
  customCodeBlockBackgroundColor: defaultCustomCodeBlockBackgroundColor
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSetting: (key, value) => {
        set({ [key]: value })
      },
      syncSettings: (settings) => {
        set(settings)
      }
    }),
    {
      name: 'interview-coder-settings',
      version: 5
    }
  )
)
