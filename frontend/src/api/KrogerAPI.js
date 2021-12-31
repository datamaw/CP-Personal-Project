

const locationID = '02100928';
const BASE_URL_TOKEN = 'https://api.kroger.com/v1/connect/oauth2/token'
const BASE_URL_PRODUCT = `https://api.kroger.com/v1/products?filter.term=candy&filter.locationID=02100928&filter.limit=50`;

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
    myHeaders.append("Authorization", `Basic ${process.env.REACT_APP_PRODUCT_API}`)
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded")
    const data = 'grant_type=client_credentials&scope=product.compact'

    const init = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        }
        console.log("sending to server",init)
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