import { Payload } from 'payload'

export async function createMediaFromImageUrl(
    payload: Payload,
    imageUrl: string,
    alt?: string | null,
) {
    try {
        const imgRes = await fetch(imageUrl)
        const imgArrayBuffer = await imgRes.arrayBuffer()
        const imgBuffer = Buffer.from(imgArrayBuffer)

        const imgMime = imgRes.headers.get('content-type') || 'image/jpeg'
        const imgFS = imgBuffer.length
        const imgFN = imgRes.url.split('/').pop()?.split('?')[0]

        if (!imgFN) throw new Error('Failed to extract file name')

        return await payload.create({
            collection: 'media',
            draft: true,
            data: { alt: alt || '' },
            file: {
                data: imgBuffer,
                name: imgFN,
                mimetype: imgMime,
                size: imgFS,
            },
        })
    } catch (error) {
        console.error('Failed to proceed media file', JSON.stringify(error, null, 2))
    }
}
