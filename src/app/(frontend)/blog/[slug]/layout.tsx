import Link from 'next/link'
import React from 'react'

export default function BlogPostLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full container mx-auto">
            <Link
                href="/blog"
                className="inline-flex items-center gap-2 mb-8 no-underline relative after:content-[''] after:absolute after:left-1 after:-bottom-1 after:right-0 after:h-0.5 after:bg-gray-600 after:hidden hover:after:block"
            >
                <ArrowLeftIcon />
                All articles
            </Link>
            {children}
        </div>
    )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            className="size-5"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
