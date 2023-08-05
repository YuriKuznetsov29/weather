import axios from 'axios'

export const useHttp = async (url: string) => {
    try {
        const response = await axios(url)
        return response.data
    } catch (error) {
        throw error
    }
}
