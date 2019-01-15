const dotenv = require('dotenv')
let {parsed, error} = dotenv.config()
if (error) {
  throw error
}

module.exports = {
  port: parsed.DOCS_PORT || 3010,
  base: '/docs/',
  dest: 'build/docs',
  title: 'Wiki',
  description: 'Documentation',
  themeConfig: {
    search: true,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Express App', link: '/express/' },
      { text: '即时聊天', link: '/chat/' },
      { text: 'Github', link: 'https://github.com/IntellectStudio' },
    ],
    displayAllHeaders: true,
    sidebar: {
      '/express/': [
        '',
        ['pm2', 'PM2 Cheat Sheet'],
        ['git', 'Git Notes']
      ],
      '/chat/': [
        '',
        ['userstory', '用户故事']
      ],
      '/': [
        ''
      ]
    }
  }
}