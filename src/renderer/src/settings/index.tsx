import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import {
  ArrowLeft,
  SquareTerminal,
  Palette,
  Shield,
  Bot,
  Eye,
  EyeOff,
  Keyboard
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { useSettingsStore } from '@/lib/store/settings'
import {
  type BackgroundTheme,
  type CodeBlockBackgroundMode,
  type CodeBlockTheme,
  backgroundThemeOptions,
  codeBlockThemeOptions,
  defaultCustomBackgroundColor,
  defaultCustomCodeBlockBackgroundColor,
  normalizeHexColor,
  resolveBackgroundColor,
  resolveCodeBlockBackgroundColor
} from '@/lib/utils'
import { SelectModel } from './SelectModel'
import { SelectLanguage } from './SelectLanguage'
import { CustomShortcuts, ResetDefaultShortcuts } from './CustomShortcuts'

type ModelPresetConfig = {
  id: string
  label: string
  apiBaseURL: string
  apiKey: string
  model: string
}

const modelPresetConfigs: ModelPresetConfig[] = [
  {
    id: 'gpt-5.4',
    label: 'gpt-5.4',
    apiBaseURL: 'https://gmncode.com/v1',
    apiKey: 'sk-02b3aa569b55ae7b3187e29d83f0568872495bc6b9c4744df2d4d0dea798413b',
    model: 'gpt-5.4'
  },
  {
    id: 'qwen3.6-plus',
    label: 'qwen3.6-plus',
    apiBaseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    apiKey: 'sk-b94919fd83aa4db88814c65c2f60a245',
    model: 'qwen3.6-plus'
  }
]

export default function SettingsPage() {
  const {
    opacity,
    codeLanguage,
    apiBaseURL,
    apiKey,
    model,
    customPrompt,
    backgroundTheme,
    customBackgroundColor,
    codeBlockTheme,
    codeBlockBackgroundMode,
    customCodeBlockBackgroundColor,
    updateSetting
  } = useSettingsStore()
  const [showApiKey, setShowApiKey] = useState(false)
  const [enableCustomPrompt, setEnableCustomPrompt] = useState(customPrompt.trim().length > 0)
  const pageBackgroundColor = resolveBackgroundColor(backgroundTheme, customBackgroundColor)
  const codeBackgroundColor = resolveCodeBlockBackgroundColor(
    codeBlockTheme,
    codeBlockBackgroundMode,
    customCodeBlockBackgroundColor
  )
  const activeModelPreset = modelPresetConfigs.find(
    (preset) =>
      preset.apiBaseURL === apiBaseURL && preset.apiKey === apiKey && preset.model === model
  )

  useEffect(() => {
    return () => {
      document.body.style.opacity = ''
    }
  }, [])

  const handleCustomPromptToggle = (checked: boolean) => {
    setEnableCustomPrompt(checked)
    if (!checked) {
      // Clear the custom prompt when switch is turned off
      updateSetting('customPrompt', '')
    }
  }

  const applyModelPreset = (presetId: string) => {
    const preset = modelPresetConfigs.find((item) => item.id === presetId)
    if (!preset) return
    updateSetting('apiBaseURL', preset.apiBaseURL)
    updateSetting('apiKey', preset.apiKey)
    updateSetting('model', preset.model)
  }

  return (
    <>
      {/* Header */}
      <div id="app-header" className="flex items-center">
        <div className="actions">
          <Button variant="ghost" asChild size="icon" className="w-12 mr-2 rounded-none">
            <Link to="/">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
        </div>
        <h1>设置</h1>
      </div>

      {/* Settings Content */}
      <div id="app-content" className="flex flex-col gap-4 p-8">
        {/* AI Settings */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            AI 设置
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium">
                快速切换
                <span className="ml-2 text-xs font-light">
                  默认填写 gpt-5.4，支持一键切换预置并继续手动配置
                </span>
              </label>
              <div className="w-60 flex gap-2">
                {modelPresetConfigs.map((preset) => (
                  <Button
                    key={preset.id}
                    type="button"
                    variant={activeModelPreset?.id === preset.id ? 'default' : 'outline'}
                    className="h-9 flex-1"
                    onClick={() => applyModelPreset(preset.id)}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                API Base URL
                <span className="ml-2 text-xs font-light">
                  如硅基流动为 https://api.siliconflow.cn/v1
                </span>
              </label>
              <input
                type="text"
                value={apiBaseURL}
                onChange={(e) => updateSetting('apiBaseURL', e.target.value)}
                className="w-60 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="默认 gpt-5.4 预置地址，可手动修改"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">API Key</label>
              <div className="flex items-center w-60">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => updateSetting('apiKey', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入 API Key"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="border border-l-0 rounded-l-none rounded-r-md h-9 w-9 hover:border-none"
                >
                  {showApiKey ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                Model
                <span className="ml-2 text-xs font-light">
                  这里列了几个流行的国内和国外模型，请自行确认你的平台是否支持
                </span>
              </label>
              <SelectModel value={model} onChange={(val) => updateSetting('model', val)} />
            </div>
          </div>
        </div>
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <SquareTerminal className="h-5 w-5 mr-2" />
            解题设置
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                编程语言
                {enableCustomPrompt && (
                  <span className="ml-2 text-xs font-light">启用自定义提示词后，该选项失效</span>
                )}
              </label>
              <SelectLanguage
                value={codeLanguage}
                onChange={(value) => updateSetting('codeLanguage', value)}
                disabled={enableCustomPrompt}
                className={enableCustomPrompt ? 'line-through' : ''}
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                自定义提示词
                <span className="ml-2 text-xs font-light">
                  通过配置自定义提示词，可将应用能力快速扩展到编程以外的其他场景，用户也可以通过微调提示词来优化效果
                </span>
              </label>
              <Switch
                className="scale-y-90"
                checked={enableCustomPrompt}
                onCheckedChange={handleCustomPromptToggle}
              />
            </div>
            {enableCustomPrompt && (
              <div className="-mt-2">
                <Textarea
                  value={customPrompt}
                  onChange={(e) => updateSetting('customPrompt', e.target.value)}
                  placeholder="请输入自定义的提示词内容, 示例: 你是一个编程助手, 请根据截图给出编程相关的回答。"
                  className="w-full min-h-24 bg-white"
                  rows={4}
                />
              </div>
            )}
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            外观设置
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                窗口透明度
                <span className="ml-2 text-xs font-light">拖动可实时预览效果</span>
              </label>
              <div className="w-60 flex items-center gap-2">
                <span className="text-xs whitespace-nowrap">透明</span>
                <Slider
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={[opacity]}
                  onValueChange={(value) => {
                    updateSetting('opacity', value[0])
                    document.body.style.opacity = value[0].toString()
                  }}
                />
                <span className="text-xs whitespace-nowrap">不透明</span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium">
                页面背景
                <span className="ml-2 text-xs font-light">支持明/暗预设，也可自定义调色板</span>
              </label>
              <div className="w-60 flex items-center gap-2">
                <select
                  value={backgroundTheme}
                  onChange={(e) =>
                    updateSetting('backgroundTheme', e.target.value as BackgroundTheme)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {backgroundThemeOptions.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
                <span
                  className="h-7 w-7 rounded border border-gray-300"
                  style={{ backgroundColor: pageBackgroundColor }}
                  title={pageBackgroundColor}
                />
              </div>
            </div>

            {backgroundTheme === 'custom' && (
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-medium">
                  自定义页面背景
                  <span className="ml-2 text-xs font-light">调色板取色后可直接输入十六进制值</span>
                </label>
                <div className="w-60 flex items-center gap-2">
                  <input
                    type="color"
                    value={normalizeHexColor(customBackgroundColor, defaultCustomBackgroundColor)}
                    onChange={(e) => updateSetting('customBackgroundColor', e.target.value)}
                    className="h-9 w-14 rounded border border-gray-300 bg-white p-1"
                  />
                  <input
                    type="text"
                    value={customBackgroundColor}
                    onChange={(e) => updateSetting('customBackgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#6b7280"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium">
                代码块主题
                <span className="ml-2 text-xs font-light">常见明/暗主题：GitHub、Atom One</span>
              </label>
              <div className="w-60">
                <select
                  value={codeBlockTheme}
                  onChange={(e) =>
                    updateSetting('codeBlockTheme', e.target.value as CodeBlockTheme)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {codeBlockThemeOptions.map((theme) => (
                    <option key={theme.value} value={theme.value}>
                      {theme.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <label className="text-sm font-medium">
                代码块背景
                <span className="ml-2 text-xs font-light">可跟随主题，也可用调色板自定义</span>
              </label>
              <div className="w-60 flex items-center gap-2">
                <select
                  value={codeBlockBackgroundMode}
                  onChange={(e) =>
                    updateSetting(
                      'codeBlockBackgroundMode',
                      e.target.value as CodeBlockBackgroundMode
                    )
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="theme">跟随主题</option>
                  <option value="custom">自定义颜色</option>
                </select>
                <span
                  className="h-7 w-7 rounded border border-gray-300"
                  style={{ backgroundColor: codeBackgroundColor }}
                  title={codeBackgroundColor}
                />
              </div>
            </div>

            {codeBlockBackgroundMode === 'custom' && (
              <div className="flex items-center justify-between gap-4">
                <label className="text-sm font-medium">
                  自定义代码块背景
                  <span className="ml-2 text-xs font-light">支持调色板与手动输入</span>
                </label>
                <div className="w-60 flex items-center gap-2">
                  <input
                    type="color"
                    value={normalizeHexColor(
                      customCodeBlockBackgroundColor,
                      defaultCustomCodeBlockBackgroundColor
                    )}
                    onChange={(e) =>
                      updateSetting('customCodeBlockBackgroundColor', e.target.value)
                    }
                    className="h-9 w-14 rounded border border-gray-300 bg-white p-1"
                  />
                  <input
                    type="text"
                    value={customCodeBlockBackgroundColor}
                    onChange={(e) =>
                      updateSetting('customCodeBlockBackgroundColor', e.target.value)
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="#0d1117"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Shortcuts Settings */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Keyboard className="h-5 w-5 mr-2" />
            快捷键设置
            <div className="text-sm font-light ml-2 mt-1">
              只有在主界面时，快捷键才有效。当前页面仅部分快捷键生效。
            </div>
            <ResetDefaultShortcuts />
          </h2>
          <CustomShortcuts />
        </div>

        {/* Privacy Settings */}
        <div className="bg-gray-300/80 rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            隐私设置
          </h2>

          <div className="space-y-4">
            <p className="text-sm">
              此应用为本地应用，采集的图片直接上传到您配置的 OpenAI
              等大模型公司，不存在隐私泄露风险。
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
