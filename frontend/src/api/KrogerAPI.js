
const locationID = '02100928';
const BASE_URL_TOKEN = 'https://api.kroger.com/v1/connect/oauth2/token'
const BASE_URL_PRODUCT = `https://api.kroger.com/v1/products?filter.term=candy&filter.locationID=${locationID}&filter.limit=50`;

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

const fetchToken = async () => {

    const url = BASE_URL_TOKEN
    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Basic Y2FzaGZvcmNhbmR5a2lkcy0yZTg0ZDFkM2NiODZlMzUzYmE1NDE1Y2M2NDQ3ZTdlYjgwMTkxMTUzNzQzMjY0NTg4MjQ6WUd4ZXp0LV9hd3k2UUlETmxpS0F4SWttZ1g1N3Y0TEZtLUV5NFlWNw==")
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    const data = 'grant_type=client_credentials&scope=product.compact'

    const init = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        }
        return await tryCatchFetch(url, init)

}

const fetchData = async (token) => {

    const url = BASE_URL_PRODUCT
    const accessToken = `Bearer ${token}`

    const init = {
        method: "GET",
        cache: "no-cache",
        headers: {
            Authorization: accessToken,
            "Content-Type": "application/json; charset=urf-8"
         }    
        }
        return await tryCatchFetch(url, init)
}

const exportItems = {
    fetchToken,
    fetchData
}

export default exportItems