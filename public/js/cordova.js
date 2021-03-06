;(function () {
  const pluginList = {
    // 用户信息
    userInfo: {
      auth: {
        success: '{"code":"q52hsdc852jhqwhe2f"}',
        error: -1,
      },
      keep: {
        success: '1',
        error: -1,
      },
    },

    // 界面相关
    layout: {
      scroll: {
        success: '1',
        error: -1,
      },
      backContainer: {
        success: '1',
        error: -1,
      },
    },
  }

  const cordova = {
    exec(success, error, plugin, fnName, params) {
      function p() {
        return new Promise((resolve, reject) => {
          let isLuck = Math.random()
          console.log(isLuck)

          if (isLuck > 0) {
            resolve()
          } else {
            reject()
          }
        })
      }

      p()
        .then(() => {
          success && success(pluginList[plugin] && pluginList[plugin][fnName].success)
        })
        .catch(() => {
          error && error(pluginList[plugin] && pluginList[plugin][fnName].error)
        })
    },
  }

  setTimeout(() => {
    window.cordova = cordova
  }, 500)
})()
