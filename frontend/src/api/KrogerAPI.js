import { useState } from 'react'

const BASE_URL_TOKEN = 'https://api.kroger.com/v1/connect/oauth2/token'

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

const requestToken = async (tokenObj) => {
    const url = BASE_URL
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
    }

}