// 将声明文件转化为模块
export {}

declare global {
  interface Window {
    cordova: {
      exec(success: (res: any) => any, error: (res: any) => any, plugin: string, fnName: string, params: any[]): void
    }
  }
}
