;(function () {
  const pluginList = {
    userInfo: {
      auth: {
        success: '{"code":"q52hsdc852jhqwhe2f"}',
        error: -1,
      },
      keep: {
        success: '',
        error: -1,
      },
    },
  }

  window.cordova = {
    exec(success, error, plugin, fnName, params) {
      function p() {
        return new Promise((resolve, reject) => {
          if (Math.random() > 0) {
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
})()
