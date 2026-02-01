import { wait } from 'payload/shared'
import ArticleCard from './_components/article-card'

export default async function BlogIndexPage() {
    await wait(2000)
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            <ArticleCard
                href={''}
                title={'How to create a blog tutorial'}
                summary={''}
                coverImage={''}
                publishedAt={new Date()}
                readTimeInMinutes={12}
                author={{
                    avatar: '',
                    name: 'John Doe',
                    role: 'Staff Writer',
                }}
            />
        </div>
    )
}
