import { useEffect, useState } from 'react'
import { HashRouter, Routes, Route } from 'react-router'
import { Toaster } from 'sonner'
import CoderPage from '@/coder'
import SettingsPage from '@/settings'
import HelpPage from '@/help'
import { useSettingsStore } from '@/lib/store/settings'
import { useShortcutsStore } from '@/lib/store/shortcuts'
import {
  getCloneableFields,
  resolveBackgroundColor,
  resolveCodeBlockBackgroundColor
} from '@/lib/utils'

export default function App() {
  const [initialized, setInitialized] = useState(false)
  const settingsStore = useSettingsStore()
  const { backgroundTheme, customBackgroundColor, codeBlockTheme, codeBlockBackgroundMode } =
    useSettingsStore()
  const customCodeBlockBackgroundColor = useSettingsStore(
    (state) => state.customCodeBlockBackgroundColor
  )
  const { shortcuts } = useShortcutsStore()

  useEffect(() => {
    window.api.getAppSettings().then((settings) => {
      const blankFields = Object.keys(settings).filter(
        (key) => settings[key] && !settingsStore[key]
      )
      settingsStore.syncSettings(
        blankFields.reduce(
          (acc, key) => {
            acc[key] = settings[key]
            return acc
          },
          {} as Partial<typeof settingsStore>
        )
      )
      setInitialized(true)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.api.onSyncAppSettings((settings) => {
      settingsStore.syncSettings(settings)
    })
    return () => {
      window.api.removeSyncAppSettingsListener()
    }
  }, [settingsStore])

  useEffect(() => {
    if (initialized) {
      window.api.updateAppSettings(getCloneableFields(settingsStore))
    }
  }, [initialized, settingsStore])

  useEffect(() => {
    const pageBackground = resolveBackgroundColor(backgroundTheme, customBackgroundColor)
    const codeBlockBackground = resolveCodeBlockBackgroundColor(
      codeBlockTheme,
      codeBlockBackgroundMode,
      customCodeBlockBackgroundColor
    )
    document.documentElement.style.setProperty('--page-background', pageBackground)
    document.documentElement.style.setProperty('--code-block-background', codeBlockBackground)
  }, [
    backgroundTheme,
    customBackgroundColor,
    codeBlockTheme,
    codeBlockBackgroundMode,
    customCodeBlockBackgroundColor
  ])

  useEffect(() => {
    console.log('App initShortcuts:', shortcuts) // DEBUG: 检查新键
    window.api.initShortcuts(shortcuts)
    window.api.getShortcuts().then((shortcutsStatus) => {
      console.log('Shortcuts registered:', shortcutsStatus) // DEBUG: 主进程状态
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <HashRouter>
        <Routes>
          <Route index element={<CoderPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Routes>
      </HashRouter>

      <Toaster />
    </>
  )
}
