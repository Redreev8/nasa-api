export default (cb: Function, ms: number) => {
    let timer: ReturnType<typeof setTimeout>

    return (...props: any[]) => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => cb(...props), ms)
    }
}