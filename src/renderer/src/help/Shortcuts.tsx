import { Keyboard } from 'lucide-react'
import { useShortcutsStore } from '@/lib/store/shortcuts'
import ShortcutRenderer from '@/components/ShortcutRenderer'
import { HelpSection } from './components'

export function Shortcuts() {
  return (
    <HelpSection
      Icon={Keyboard}
      title="快捷键"
      description="快捷键是操作应用的主要方式，您可以在设置中自定义快捷键。"
    >
      <ShortcutItemGroup category="Window Management" />
      <ShortcutItemGroup category="Screenshot & AI" />
      <ShortcutItemGroup category="Model Config" />
      <ShortcutItemGroup category="Navigation" />
      <ShortcutItemGroup category="Window Movement" />
    </HelpSection>
  )
}

function ShortcutItemGroup({ category }: { category: string }) {
  const { shortcuts } = useShortcutsStore()
  return (
    <div className="space-y-2">
      <h3 className="text-sm text-gray-500">{getCategoryName(category)}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.values(shortcuts)
          .filter((shortcut) => shortcut.category === category)
          .map((shortcut, index) => (
            <ShortcutItem key={index} action={shortcut.action} shortcutKey={shortcut.key} />
          ))}
      </div>
    </div>
  )
}

function ShortcutItem({ action, shortcutKey }: { action: string; shortcutKey: string }) {
  return (
    <div className="flex items-center justify-between rounded border border-gray-400 px-2 py-1">
      <span className="text-sm">{getShortcutDescription(action)}</span>
      <ShortcutRenderer shortcut={shortcutKey} className="select-none" />
    </div>
  )
}

const getCategoryName = (category: string) => {
  const categoryMap: Record<string, string> = {
    'Window Management': '窗口管理',
    'Screenshot & AI': '截图与AI',
    'Model Config': '模型配置',
    Navigation: '页面导航',
    'Window Movement': '窗口移动'
  }
  return categoryMap[category] || category
}

const getShortcutDescription = (action: string) => {
  const descriptionMap: Record<string, string> = {
    hideOrShowMainWindow: '隐藏/显示窗口',
    ignoreOrEnableMouse: '鼠标穿透(窗口对鼠标隐身)',
    takeScreenshot: '截图并生成解题建议（会新开对话）',
    appendScreenshot: '追加截图并生成解题建议',
    openFollowUpDialog: '打开追问输入框（默认读取剪贴板）',
    submitFollowUp: '提交追问（弹窗打开时提交内容）',
    stopSolutionStream: '停止生成',
    clearConversation: '清空对话历史',
    switchToGptModelConfig: '切换到 gpt-5.4 预置',
    switchToQwenModelConfig: '切换到 qwen3.6-plus 预置',
    pageUp: '向上翻页',
    pageDown: '向下翻页',
    moveMainWindowUp: '向上移动窗口',
    moveMainWindowDown: '向下移动窗口',
    moveMainWindowLeft: '向左移动窗口',
    moveMainWindowRight: '向右移动窗口'
  }
  return descriptionMap[action] || action
}
