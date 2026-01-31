import { Payload } from 'payload'
import { isDuplicateError } from '../lib/is-payload-error'
import { env } from '@/libs/env'

export async function seedAdmin(payload: Payload) {
    try {
        console.log('creating admin user...')
        await payload.create({
            collection: 'users',
            data: {
                email: env.CMS_SEED_ADMIN_EMAIL,
                password: env.CMS_SEED_ADMIN_PASSWORD,
            },
        })
        console.log('Admin user created')
    } catch (error) {
        if (isDuplicateError(error, 'email')) {
            console.log('Admin user already exists, skipping creation.')
            return
        }
        console.error('Error creating admin user:', JSON.stringify(error, null, 2))
    }
}
