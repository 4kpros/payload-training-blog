import { Payload } from 'payload'
import { AUTHOR_ROLE_OPTIONS } from '@/collections/authors/constants'
import { faker } from '@faker-js/faker'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

export async function seedAuthor(payload: Payload) {
    try {
        const imgUrl = faker.image.personPortrait({ size: 256 })
        const imgAlt = faker.lorem.words(3)
        const media = await createMediaFromImageUrl(payload, imgUrl, imgAlt)
        if (!media) {
            console.warn('No media image found')
            return
        }

        console.log('creating author...')
        await payload.create({
            collection: 'authors',
            data: {
                name: faker.person.fullName(),
                role: AUTHOR_ROLE_OPTIONS.STAFF,
                cover: media.id,
            },
        })
        console.log('Author created')
    } catch (error) {
        console.error('Error creating author:', JSON.stringify(error, null, 2))
    }
}
