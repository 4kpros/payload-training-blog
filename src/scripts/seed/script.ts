import { getPayload } from 'payload'
import config from '@payload-config'
import { seedAdmin } from './seeders/admin.seeder'
import { seedAuthor } from './seeders/author.seeder'
import { seedArticle } from './seeders/article.seeder'

async function main() {
    const payload = await getPayload({ config })
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
