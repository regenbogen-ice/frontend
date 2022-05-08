const configs = {
  development: {
    NEXT_PUBLIC_API_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://mainpc20481.ppluss.de',
  },
  canary: {
    NEXT_PUBLIC_API_BASE: 'https://dev.regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://dev.regenbogen-ice.de',
    NEXT_PUBLIC_ACKEE_UUID: '5534184d-108a-47a9-aced-3376820bb486',
  },
  production: {
    NEXT_PUBLIC_API_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_ACKEE_UUID: '540a6aea-c6c8-4df5-8d6e-1bfa7a6f5472',
  },
}

let configKey = 'development'

if(process.env.BUILD_ENV) {

  if(process.env.BUILD_ENV === 'main') {
    configKey = 'production'
  } else {
    configKey = process.env.BUILD_ENV
  }

}

const config = configs[configKey]

module.exports = {
  reactStrictMode: true,
  env: config,
  rewrites: async () => {
    return [
      {source: '/robots.txt', destination: '/api/robotstxt'},
      {source: '/sitemap.xml', destination: '/api/sitemap'},
    ]
  },
}
