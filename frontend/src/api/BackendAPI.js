const BASE_URL = "https://cors-anywhere.herokuapp.com/https://cashandcandy-backend.herokuapp.com/cashforcandy/"

// const BASE_URL = "http://127.0.0.1:8000/cashforcandy/"

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

const fetchChildList = async () => {
    const url = BASE_URL + 'child'
    return await tryCatchFetch(url)
}

const fetchChild = async (childID) => {
    const url = BASE_URL + `{child}/` + `{childID}`
    return await tryCatchFetch(url)
}

const addChild = async (childObj) => {
    const url = BASE_URL
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
}

const exportItems = {
    fetchChildList,
    fetchChild,
    addChild
}

export default exportItems