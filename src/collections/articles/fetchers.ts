import { getPayloadClient } from '@/libs/payload/client'
import { ARTICLE_STATUS_OPTIONS } from './constants'

async function fetchArticles() {
    const payload = await getPayloadClient()
    try {
        const { docs: articles } = await payload.find({
            depth: 1,
            collection: 'articles',
            where: {
                status: { equals: ARTICLE_STATUS_OPTIONS.PUBLISHED },
            },
            select: {
                slug: true,
                title: true,
                contentSummary: true,
                author: true,
                covertImage: true,
                status: true,
                readTimeInMinutes: true,
                publishedAt: true,
            },
        })
        return articles ?? []
    } catch (error) {
        console.error('Error fetching article:', error)
        return []
    }
}

async function fetchArticle(slug: string) {
    const payload = await getPayloadClient()
    try {
        const { docs: articles } = await payload.find({
            collection: 'articles',
            where: {
                status: { equals: ARTICLE_STATUS_OPTIONS.PUBLISHED },
                slug: { equals: slug },
            },
            select: {
                slug: true,
                title: true,
                contentSummary: true,
                author: true,
                covertImage: true,
                status: true,
                readTimeInMinutes: true,
                publishedAt: true,
            },
        })
        return articles ?? []
    } catch (error) {
        console.error('Error fetching article:', error)
        return []
    }
}

export { fetchArticles }
