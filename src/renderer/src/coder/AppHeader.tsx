import { SettingsIcon, HelpCircle, X } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import { useAppStore } from '@/lib/store/app'
import { useSettingsStore } from '@/lib/store/settings'

const gpt54ModelPreset = {
  apiBaseURL: 'https://gmncode.com/v1',
  apiKey: 'sk-02b3aa569b55ae7b3187e29d83f0568872495bc6b9c4744df2d4d0dea798413b',
  model: 'gpt-5.4'
}

const qwen36PlusModelPreset = {
  apiBaseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
  apiKey: 'sk-b94919fd83aa4db88814c65c2f60a245',
  model: 'qwen3.6-plus'
}

function resolveModelConfigLabel(apiBaseURL: string, apiKey: string, model: string) {
  if (
    apiBaseURL === gpt54ModelPreset.apiBaseURL &&
    apiKey === gpt54ModelPreset.apiKey &&
    model === gpt54ModelPreset.model
  ) {
    return 'gpt-5.4'
  }
  if (
    apiBaseURL === qwen36PlusModelPreset.apiBaseURL &&
    apiKey === qwen36PlusModelPreset.apiKey &&
    model === qwen36PlusModelPreset.model
  ) {
    return 'qwen3.6-plus'
  }
  return '手动配置'
}

export function AppHeader() {
  const navigate = useNavigate()
  const { ignoreMouse } = useAppStore()
  const { apiBaseURL, apiKey, model } = useSettingsStore()
  const modelConfigLabel = resolveModelConfigLabel(apiBaseURL, apiKey, model)

  return (
    <div id="app-header" className="flex items-center text-white">
      <div className="mx-auto pl-6 text-xs tracking-wide flex items-center gap-1.5">
        <span className="opacity-70">模型配置:</span>
        <span className={modelConfigLabel === 'gpt-5.4' ? 'font-semibold' : 'opacity-70'}>
          gpt-5.4
        </span>
        <span className="opacity-50">/</span>
        <span className={modelConfigLabel === 'qwen3.6-plus' ? 'font-semibold' : 'opacity-70'}>
          qwen3.6-plus
        </span>
        {modelConfigLabel === '手动配置' && (
          <>
            <span className="opacity-50">/</span>
            <span className="font-semibold">手动</span>
          </>
        )}
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
