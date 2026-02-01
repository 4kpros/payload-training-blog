import Image from 'next/image'
import React from 'react'

type ArticleMetadataProps = {
    intent: string
    data: {
        author: {
            avatar: string
            name: string
            role: string
        }
        publishedAt: Date
        readTimeInMinutes: number
    }
    clasName?: string
}

export default function ArticleMetadata(props: ArticleMetadataProps) {
    const { intent, data, clasName } = props
    const { author, publishedAt, readTimeInMinutes } = data
    return (
        <div className={`mt-4 flex items-center justify-between ${clasName}`}>
            {/* Author */}
            <div className={`flex items-center ${intent === 'card' ? 'gap-2' : 'gap-3'}`}>
                <Image
                    src={author.avatar}
                    alt={`${author.name}'s avatar`}
                    width={40}
                    height={40}
                    className={`rounded-full ${intent === 'card' ? 'size-10' : 'size-11'}`}
                />
                <div
                    className={`flex flex-col leading-none ${intent === 'card' ? 'text-sm gap-1.5' : 'text-base gap-2'}`}
                >
                    <p className="font-bold">{author.name}</p>
                    <p className="text-dimmed">{author.role}</p>
                </div>
            </div>
            {/* Date, read time in munites */}
            <div
                className={`flex flex-col text-right ${intent === 'card' ? 'text-sm gap-1.5' : 'text-base gap-2'}`}
            >
                <time dateTime={new Date(publishedAt).toISOString()} className="leading-none">
                    {publishedAt.toLocaleString('en-GB', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </time>
                <p className="text-dimmed leading-none">{readTimeInMinutes} minutes read</p>
            </div>
        </div>
    )
}
