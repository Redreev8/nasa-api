export default <T>(cb: (...props: T[]) => void, ms: number) => {
    let timer: ReturnType<typeof setTimeout>

    return (...props: T[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => cb(...props), ms)
    }
}