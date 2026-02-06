import { wait } from 'payload/shared'
import ArticleMetadata from '../_components/article-metadata'
import Image from 'next/image'

export default async function BlogPostPage() {
    await wait(2000)
    return (
        <div className="pose lg:prose-lg dark:prose-invert">
            <h1>How to create a Blog tutorial No One Asked For</h1>
            <ArticleMetadata
                intent="post"
                data={{
                    author: {
                        avatar: 'https://i.pravatar.cc/150?img=3',
                        name: 'John Doe',
                        role: 'Staff Writer',
                    },
                    publishedAt: new Date(),
                    readTimeInMinutes: 5,
                }}
                clasName="not-prose"
            />
            <Image
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Blog Post Image"
                width={600}
                height={300}
                className="w-full rounded-md object-center object-cover"
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
        </div>
    )
}
