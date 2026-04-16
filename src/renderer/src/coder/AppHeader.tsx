import { SettingsIcon, HelpCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store/app'
import { useSettingsStore } from '@/lib/store/settings'

const gptModelPreset = {
  apiBaseURL: 'https://gmncode.com/v1',
  apiKey: 'sk-02b3aa569b55ae7b3187e29d83f0568872495bc6b9c4744df2d4d0dea798413b',
  model: 'gpt-5.4'
}

const plusModelPreset = {
  apiBaseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'sk-b94919fd83aa4db88814c65c2f60a245',
  model: 'qwen3.6-plus'
}

type PresetKey = '1' | '2' | 'custom'

function resolvePreset(apiBaseURL: string, apiKey: string, model: string): PresetKey {
  if (
    apiBaseURL === gptModelPreset.apiBaseURL &&
    apiKey === gptModelPreset.apiKey &&
    model === gptModelPreset.model
  ) {
    return '1'
  }
  if (
    apiBaseURL === plusModelPreset.apiBaseURL &&
    apiKey === plusModelPreset.apiKey &&
    model === plusModelPreset.model
  ) {
    return '2'
  }
  return 'custom'
}

export function AppHeader() {
  const navigate = useNavigate()
  const { ignoreMouse } = useAppStore()
  const { apiBaseURL, apiKey, model, syncSettings } = useSettingsStore()
  const activePreset = resolvePreset(apiBaseURL, apiKey, model)

  function applyPreset(preset: PresetKey) {
    if (preset === '1') {
      syncSettings(gptModelPreset)
    } else if (preset === '2') {
      syncSettings(plusModelPreset)
    } else {
      navigate('/settings')
    }
  }

  const presets: { key: PresetKey; label: string }[] = [
    { key: '1', label: '1' },
    { key: '2', label: '2' },
    { key: 'custom', label: '自定义' }
  ]

  return (
    <div id="app-header" className="flex items-center text-white">
      <div className={`mx-auto pl-6 text-xs tracking-wide flex items-center gap-1 ${ignoreMouse ? 'pointer-events-none' : ''}`}>
        <span className="opacity-70 mr-0.5">配置</span>
        {presets.map((p, i) => (
          <span key={p.key} className="flex items-center gap-1">
            {i > 0 && <span className="opacity-40">/</span>}
            <button
              onClick={() => applyPreset(p.key)}
              className={`cursor-pointer transition-opacity ${activePreset === p.key ? 'font-semibold opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              {p.label}
            </button>
          </span>
        ))}
      </div>
      <div className={`actions ${ignoreMouse ? 'pointer-events-none' : ''}`}>
        <Button
          variant="ghost"
          className="size-8 cursor-pointer hover:opacity-50"
          onClick={() => navigate('/settings')}
        >
          <SettingsIcon />
        </Button>
        <Button
          variant="ghost"
          className="size-8 cursor-pointer hover:opacity-50"
          onClick={() => navigate('/help')}
        >
          <HelpCircle />
        </Button>
        <Button
          variant="ghost"
          className="size-8 cursor-pointer hover:opacity-50 hover:text-red-500"
          onClick={() => window.close()}
        >
          <X />
        </Button>
      </div>
    </div>
  )
}
