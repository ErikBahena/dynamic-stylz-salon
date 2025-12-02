import { createLocalReq, getPayload } from 'payload'

import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const log = (...messages: unknown[]) => {
  console.log('[seed]', ...messages)
}

export default async function runSeed() {
  try {
    log('Connecting to Payload…')
    const payload = await getPayload({ config })

    log('Creating local request context…')
    const req = await createLocalReq(
      {
        user: {
          id: 'seed-script',
          email: 'seed@dynamicstylz.local',
          collection: 'users',
          roles: ['admin'],
        } as any,
      },
      payload,
    )

    log('Clearing collections and repopulating demo data…')
    await seed({ payload, req })
    log('Seed complete — services, team members, reviews, pages, and globals refreshed.')
  } catch (error) {
    log('Seed failed.')
    console.error(error)
    process.exitCode = 1
    throw error
  }
}
;(async () => {
  await runSeed()
  process.exit()
})()
