import React, { useState, useEffect } from "react";

const StoreAccess = () =>  {  //new

    const [token, setToken] = useState([])  //new

    const getToken = async () => {

        const myHeaders = new Headers()
        myHeaders.append("Authorization", "Basic Y2FzaGZvcmNhbmR5a2lkcy0yZTg0ZDFkM2NiODZlMzUzYmE1NDE1Y2M2NDQ3ZTdlYjgwMTkxMTUzNzQzMjY0NTg4MjQ6WUd4ZXp0LV9hd3k2UUlETmxpS0F4SWttZ1g1N3Y0TEZtLUV5NFlWNw==")
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded")

        const data = 'grant_type=client_credentials&scope=product.compact'

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            redirect: 'follow'
        }

        fetch('https://api.kroger.com/v1/connect/oauth2/token', requestOptions)
            .then(response => response.json())
            .then(result => setToken(result))
            .catch(error => console.log('error', error));

        
    }

    console.log(token.access_token)


    return (
        <button classname="token-button" onClick={() => getProducts()}>Get Goodies</button>
        
    )
}


async function getProducts() {
    let token = getToken()
    let accessToken = `Bearer ${token.access_token}`
    let locationID = '02100928';
    let productsUrl = `https://api.kroger.com/v1/products?filter.term=milk&filter.locationID=${locationID}&filter.limit=5`;
    let productsResponse = await fetch(productsUrl, {
        method: "GET",
        cache: "no-cache",
        headers: {
            Authorization: accessToken,
            "Content-Type": "application/json; charset=urf-8"
        }    
    })
    console.log(productsResponse)

    return (
        <button classname="product-button" onClick={() => getProducts()}>Get Goodies</button>
        
    )
}

export default getProducts