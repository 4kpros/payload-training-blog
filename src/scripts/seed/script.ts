import { seedAdmin } from './seeders/admin.seeder'
import { seedAuthor } from './seeders/author.seeder'
import { seedArticle } from './seeders/article.seeder'
import { getPayloadClient } from '@/libs/payload/client'

async function main() {
    const payload = await getPayloadClient()
    try {
        await seedAdmin(payload)
        await seedAuthor(payload)
        await seedArticle(payload)
        process.exit(0)
    } catch (error) {
        process.exit(1)
    }
}

void main()
