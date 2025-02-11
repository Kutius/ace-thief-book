import { useWebviewView } from 'reactive-vscode'
import { logger } from '../utils'

const WEBVIEW_ID = 'aceThiefBookReaderController'

interface WebviewPayload {
  direction: 'up' | 'down'
  speed: number
}

export function useController(options: {
  onUp: () => void
  onDown: () => void
}) {
  const html = `
  <script>
    const vscode = acquireVsCodeApi()

    window.addEventListener('wheel', (e) => {
      const direction = e.deltaY > 0 ? 'down' : 'up'
      const speed = Math.abs(e.deltaY) / 100
      vscode.postMessage({ direction, speed })
    })
  </script>
  <p style="text-align:center;font-weight:bold;font-size:18px;">使用 Copilot 来编辑</p>
  `

  useWebviewView(WEBVIEW_ID, html, {
    webviewOptions: {
      enableScripts: true,
    },
    onDidReceiveMessage(data: WebviewPayload) {
      logger.info('Received Webview Payload:', data)
      if (data.direction === 'up') {
        options.onUp()
      }
      else {
        options.onDown()
      }
    },
  })
}
