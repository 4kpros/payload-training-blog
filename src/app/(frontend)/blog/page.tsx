import ArticleCard from './_components/article-card'
import { fetchArticles } from '@/collections/articles/fetchers'
import { relationObject } from '@/libs/payload/relation-is-object'

export default async function BlogIndexPage() {
    const articles = await fetchArticles()

    if (articles.length === 0) {
        return (
            <div className="w-full flex items-center justify-center h-64">
                <p className="text-gray-500 text-lg">No articles found.</p>
            </div>
        )
    }

    const coverImage = relationObject(articles[0].covertImage)
    const author = relationObject(articles[0].author)
    const authorCoverImage = relationObject(articles[0].covertImage)
    return (
        <div className="w-full grid grid-cols-3 gap-4">
            {articles.map((article) => (
                <ArticleCard
                    key={article.slug}
                    href={article.slug}
                    title={article.title}
                    summary={article.contentSummary}
                    coverImage={coverImage}
                    publishedAt={new Date(article.publishedAt || new Date())}
                    readTimeInMinutes={article.readTimeInMinutes || 0}
                    author={{
                        avatar: authorCoverImage,
                        name: author?.name,
                        role: author?.role || 'Unknown Role',
                    }}
                />
            ))}
        </div>
    )
}
