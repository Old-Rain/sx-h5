// 获取状态栏高度
export function getStatusBarHeight(): string {
  const height = /headerviewheight=(\d+)/.exec(navigator.userAgent.toLowerCase())

  if (height && height[1]) return height[1]

  return '0'
}
