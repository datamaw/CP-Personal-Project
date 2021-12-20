const BASE_URL = "https://dog.ceo/api/breeds/image/random"

const tryCatchFetch = async (url, init=null ) => {
    try {
        const response = await fetch(url, init)   //awaiting the promise, not a value. Init is the parameter that goes into fetch - can be any name. the default is a GET request
        if (response.ok) {
            return await response.json()
        }
        else {
            throw new Error(`Bad response: ${response.status} ${response.statusText}`)
        }
    }
    catch (e) {
        console.error(e)
        return null
    }
}

const fetchDogPic = async () => {
    const url = BASE_URL
    return await tryCatchFetch(url)
}

const exportItems = {
    fetchDogPic
}

export default exportItems