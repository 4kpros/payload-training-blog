import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import config from '@/payload.config'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'
import { ARTICLE_CONFIG, ARTICLE_STATUS_OPTIONS } from '@/collections/articles/constants'

export async function seedArticle(payload: Payload) {
    try {
        const title = faker.lorem.sentence()
        const contentFaker = faker.lorem.paragraphs(5, '\n\n')
        const content = convertMarkdownToLexical({
            markdown: contentFaker,
            editorConfig: await editorConfigFactory.default({ config: await config }),
        })
        const media = await createMediaFromImageUrl(
            payload,
            faker.image.urlPicsumPhotos({ width: 800, height: 600 }),
            faker.lorem.words(3),
        )
        if (!media) {
            console.warn('No media image found for article cover')
            return
        }
        const status = faker.helpers.arrayElement(Object.values(ARTICLE_STATUS_OPTIONS))
        console.log('creating article...')
        await payload.create({
            collection: 'articles',
            data: {
                title: title,
                content: content,
                contentSummary: contentFaker.slice(0, ARTICLE_CONFIG.MAX_SUMMARY_LENGTH),
                readTimeInMinutes: 1,
                covertImage: media.id,
                author: 1,
                slug: faker.helpers.slugify(title),
                status: status,
                ...(status === ARTICLE_STATUS_OPTIONS.PUBLISHED && {
                    publishedAt: faker.date.recent() as unknown as string,
                }),
            },
            draft: true,
        })
        console.log('Article created')
    } catch (error) {
        console.error('Error creating article:', JSON.stringify(error, null, 2))
    }
}
