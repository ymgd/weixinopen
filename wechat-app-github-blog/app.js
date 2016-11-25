var config = __wxConfig.config;

//app.js
App({
  onLaunch: function () {

  },
  globalData:{
    config: {
      apiUrl: config.server + '/repos/' + config.github.user + '/' + config.github.repo,
      repoUrl: 'http://github.com/' + config.github.user + '/' + config.github.repo,
      github: config.github
    },
    site: {
      title: 'Eyas'
    }
  }
})
