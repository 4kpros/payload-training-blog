import sharp from 'sharp'

export function isEligibleForBlurDataUrl(mime?: string | null) {
    if (!mime?.startsWith('image/')) return false
    if (mime?.includes('svg')) return false
    return true
}

export async function generateBlurDataUrl(
    buffer?: Buffer | Buffer<ArrayBuffer> | Buffer<ArrayBufferLike> | Uint8Array,
): Promise<string | null> {
    if (!buffer) {
        console.warn('Failed to generate blur data URL: missing buffer')
        return null
    }

    try {
        const input = Buffer.isBuffer(buffer) ? buffer : Buffer.from(buffer)

        const { data, info } = await sharp(input)
            .resize(20, 20, { fit: 'inside' })
            .blur(5)
            .toFormat('webp', { quality: 20 })
            .toBuffer({ resolveWithObject: true })

        return `data:image/${info.format};base64,${data.toString('base64')}`
    } catch (err) {
        console.error('Error generating blur placeholder:', err)
        return null
    }
}
