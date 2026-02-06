import { wait } from 'payload/shared'
import ArticleCard from './_components/article-card'

export default async function BlogIndexPage() {
    await wait(2000)
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            <ArticleCard
                href={'abracadabra-tutorial'}
                title={'How to create a blog tutorial'}
                summary={'Here is a summary of the blog post.'}
                coverImage={
                    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
                }
                publishedAt={new Date('2023-01-01T00:00:00.000Z')}
                readTimeInMinutes={12}
                author={{
                    avatar: 'https://i.pravatar.cc/150?img=3',
                    name: 'John Doe',
                    role: 'Staff Writer',
                }}
            />
        </div>
    )
}
