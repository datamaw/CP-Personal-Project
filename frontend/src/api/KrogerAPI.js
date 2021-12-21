
const locationID = '02100928';
const BASE_URL_TOKEN = 'https://api.kroger.com/v1/connect/oauth2/token'
const BASE_URL_PRODUCT = `https://api.kroger.com/v1/products?filter.term=milk&filter.locationID=${locationID}&filter.limit=5`;

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
    // const token = "eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYXNoZm9yY2FuZHlraWRzLTJlODRkMWQzY2I4NmUzNTNiYTU0MTVjYzY0NDdlN2ViODAxOTExNTM3NDMyNjQ1ODgyNCIsImV4cCI6MTY0MDA0MzE0MiwiaWF0IjoxNjQwMDQxMzM3LCJpc3MiOiJhcGkua3JvZ2VyLmNvbSIsInN1YiI6ImUwODQ1NmJjLTcyMzYtNWVmMi1hZmIxLThjNWY5YzBkNjk3NCIsInNjb3BlIjoicHJvZHVjdC5jb21wYWN0IiwiYXV0aEF0IjoxNjQwMDQxMzQyMzkzMzc5MjQ4LCJhenAiOiJjYXNoZm9yY2FuZHlraWRzLTJlODRkMWQzY2I4NmUzNTNiYTU0MTVjYzY0NDdlN2ViODAxOTExNTM3NDMyNjQ1ODgyNCJ9.BU8_ePRDzdsCSrFGVIe3a8vlKAZq_1CnFXLaTcvdtPPgvF1W9VaK4QbZ3FvQl8UGa6znUEyhGwR90iPv2XZSffQ2K_xVc0QfuDkvl5cF9e1PKBFCQSXJJxLxP81xUiNZa5vLB1MGFG1y7YdGOdFJpopqN6b2KnKudzot94ZqbrW0vB8QncOsqpBk89cntGSYYttxHulPXbr25EFa6SVUHZqn6glJgcnAUPvc2hvYeR1_vtHcz9-HnipfU27zCsUf0sffhZYQvN34xvkwTpQdjLUAeTqaXuGQaWy7R9a9U3plnBPmbz5IGJxcgLp2CtS-uuYQeSZoDYgTpn5D_HbF8A"
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