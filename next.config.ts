type Environment = {
    [variable: string]: string,
}

const ENVIRONMENTS: { [name: string]: Environment } = {
    development: {
        NEXT_PUBLIC_ENV: 'local',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://regenbogen-ice.de/graphql',
        NEXT_PUBLIC_APP_BASE: 'https://mainpc20481.ppluss.de',
    },
    canary: {
        NEXT_PUBLIC_ENV: 'canary',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://dev.regenbogen-ice.de/graphql',
        NEXT_PUBLIC_APP_BASE: 'https://dev.regenbogen-ice.de',
        NEXT_PUBLIC_SENTRY_DSN: 'https://6356562d284f46ab906a52b7701b60a8@glitch.regenbogen-ice.de/3',
        NEXT_PUBLIC_ACKEE_UUID: '5534184d-108a-47a9-aced-3376820bb486',
    },
    production: {
        NEXT_PUBLIC_ENV: 'production',
        NEXT_PUBLIC_GRAPHQL_URL: 'https://regenbogen-ice.de/graphql',
        NEXT_PUBLIC_APP_BASE: 'https://regenbogen-ice.de',
        NEXT_PUBLIC_SENTRY_DSN: 'https://6356562d284f46ab906a52b7701b60a8@glitch.regenbogen-ice.de/3',
        NEXT_PUBLIC_ACKEE_UUID: '540a6aea-c6c8-4df5-8d6e-1bfa7a6f5472',
    },
}

let environmentKey = 'development'

if(process.env.BUILD_ENV) {

  if(process.env.BUILD_ENV === 'main') {
    environmentKey = 'production'
  } else {
    environmentKey = process.env.BUILD_ENV
  }

}

module.exports = {
  reactStrictMode: true,
  env: ENVIRONMENTS[environmentKey],
  redirects: async () => ([
    { source: '/details/:tzn', destination: '/vehicle/ICE/:tzn', permanent: false },
  ]),
  compiler: {
    styledComponents: true,
  },
}
