import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ArticleMetadata from './article-metadata'

type ArticleCardProps = {
    href: string
    title: string
    summary: string
    coverImage: string
    publishedAt: Date
    readTimeInMinutes: number
    author: {
        avatar: string
        name: string
        role: string
    }
}

export default function ArticleCard(props: ArticleCardProps) {
    const { href, title, coverImage, summary, author, publishedAt, readTimeInMinutes } = props
    return (
        <Link href={`/blog/${href}`} aria-label={`Read article ${title}`} className="block">
            <article className="rounded-md border border-gray-700 overflow-hidden">
                <Image
                    src={coverImage}
                    alt={`Cover image for ${title}`}
                    width={600}
                    height={300}
                    className="max-h-75 object-cover object-center"
                />
                <div className="p-3">
                    <header>
                        <h2 className="font-bold text-lg">{title}</h2>
                        <p className="mt-2">{summary}</p>
                    </header>
                    <ArticleMetadata
                        intent="card"
                        data={{
                            author,
                            publishedAt,
                            readTimeInMinutes,
                        }}
                    />
                </div>
            </article>
        </Link>
    )
}

export function ArticleCardSkeleton() {
    return <div className="h-80 rounded-md animate-pulse bg-gray-700"></div>
}
