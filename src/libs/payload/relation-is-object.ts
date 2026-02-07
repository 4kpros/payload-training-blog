function relationObject<T>(relation: number | T): T | null {
    if (typeof relation === 'number') {
        return null
    }
    return relation
}

export { relationObject }
