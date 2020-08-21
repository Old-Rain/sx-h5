// 必须要有import或者export等字样 将声明文件转化为模块
export declare global {
  interface Window {
    cordova: {
      exec(success: (res: any) => any, error: (res: any) => any, plugin: string, fnName: string, params: any[]): void
    }
  }

  const cordova: {
    exec(success: (res: any) => any, error: (res: any) => any, plugin: string, fnName: string, params: any[]): void
  }
}
