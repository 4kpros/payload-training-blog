import Link from 'next/link'

export default async function HomePage() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
            <br />
            <Link href={'/blog'}>Blog</Link>
        </div>
    )
}
