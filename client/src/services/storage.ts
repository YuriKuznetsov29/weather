export function storage(key: string, data?: any) {
    if (!data) {
        return JSON.parse(localStorage.getItem(key) ?? "null")
    }
    localStorage.setItem(key, JSON.stringify(data))
}
