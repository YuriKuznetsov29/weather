export const useHttp = async (url: string) => {
    try {
        const data = await fetch(url)
        return await data.json()
    } catch (error) {
        throw error
    }
}
