type ENV = 'prod' | 'sta' | 'uat' | 'sit'

export const isRezioEnv = (env: string): env is ENV =>
  ['sit', 'uat', 'sta', 'prod'].includes(env)

export function getEnv(eventName: string, ref: string): ENV | null {
  if (eventName === 'push') {
    return ref.endsWith('master')
      ? 'sta'
      : ref.includes('stable/')
      ? 'uat'
      : ref.includes('feature/')
      ? 'sit'
      : null
  } else if (eventName === 'release') {
    return 'prod'
  }
  return null
}

export function getAWSDetail(env: ReturnType<typeof getEnv> = 'sit'): {
  region: string
  cluster: string
} {
  const region =
    env === 'prod' || env === 'sta' ? 'ap-northeast-1' : 'ap-southeast-1'
  const cluster =
    env === 'prod' || env === 'sta'
      ? 'tako-prod'
      : env === 'uat'
      ? 'tako-uat'
      : 'rezio-dev'
  return {
    region,
    cluster
  }
}
