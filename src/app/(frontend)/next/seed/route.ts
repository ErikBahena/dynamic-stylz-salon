import { createLocalReq, getPayload } from 'payload'
import { seed } from '@/endpoints/seed'
import config from '@payload-config'
import { headers } from 'next/headers'

export const maxDuration = 60 // This function can run for a maximum of 60 seconds

export async function POST(request: Request): Promise<Response> {
  const payload = await getPayload({ config })
  const requestHeaders = await headers()

  // Allow either authenticated user OR secret token
  const { user } = await payload.auth({ headers: requestHeaders })
  const url = new URL(request.url)
  const secret = url.searchParams.get('secret')

  const isValidSecret = secret === process.env.SEED_SECRET || secret === 'dev-seed-secret'
  const isAuthenticated = !!user

  if (!isAuthenticated && !isValidSecret) {
    return Response.json(
      { error: 'Unauthorized. Either authenticate or provide ?secret=dev-seed-secret' },
      { status: 403 },
    )
  }

  try {
    console.log('[seed-api] Starting seed process...')
    payload.logger.info('Starting seed via API endpoint...')

    // Create a Payload request object
    const seedUser = user || {
      id: 'seed-api',
      email: 'seed@dynamicstylz.local',
      collection: 'users',
      roles: ['admin'],
    } as any

    const payloadReq = await createLocalReq({ user: seedUser }, payload)

    console.log('[seed-api] Calling seed function...')
    await seed({ payload, req: payloadReq })

    console.log('[seed-api] Seed complete!')
    payload.logger.info('Seed completed successfully via API')

    return Response.json({
      success: true,
      message: 'Database seeded successfully. Check admin panel for services, team members, and reviews.',
    })
  } catch (e) {
    console.error('[seed-api] Error:', e)
    payload.logger.error({ err: e, message: 'Error seeding data' })
    return Response.json(
      {
        success: false,
        error: e instanceof Error ? e.message : 'Unknown error',
        details: e instanceof Error ? e.stack : String(e),
      },
      { status: 500 },
    )
  }
}
