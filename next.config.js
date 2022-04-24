const configs = {
  development: {
    NEXT_PUBLIC_API_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://mainpc20481.ppluss.de',
  },
  canary: {
    NEXT_PUBLIC_API_BASE: 'https://dev.regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://dev.regenbogen-ice.de',
  },
  production: {
    NEXT_PUBLIC_API_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_APP_BASE: 'https://regenbogen-ice.de',
    NEXT_PUBLIC_ACKEE_UUID: '540a6aea-c6c8-4df5-8d6e-1bfa7a6f5472',
  },
}


const config = configs[process.env.BUILD_ENV === 'main' ? 'production' : process.env.BUILD_ENV || 'development']

module.exports = {
  reactStrictMode: true,
  env: config,
}
