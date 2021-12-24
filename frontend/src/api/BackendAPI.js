const BASE_URL = "https://cashandcandy-backend.herokuapp.com/cashandcandy/"

// const BASE_URL = "http://127.0.0.1:8000/cashandcandy/"

const tryCatchFetch = async (url, init=null ) => {
    try {
        const response = await fetch(url, init)   //awaiting the promise, not a value. Init is the parameter that goes into fetch - can be any name. the default is a GET request
        if (response.ok) {
            if (response.status !== 204)  //do this for deleting, because otherwise will get unexpected end of json error
                return await response.json()
            else
                return response
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
    const url = BASE_URL + 'child/' + `${childID}`
    return await tryCatchFetch(url)
}

const addChild = async (childObj) => {
    const url = BASE_URL + 'child/'
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
}

const fetchAllWishLists = async () => {
    const url = BASE_URL + 'wish-list/'
    return await tryCatchFetch(url)
}

const fetchWishList = async (id) => {
    const url = BASE_URL + `wish-list/${id}/`
    return await tryCatchFetch(url)
}

const fetchWishItem = async (itemID) => {
    const url = BASE_URL + 'item/' + `${itemID}`
    return await tryCatchFetch(url)
}

const addWishItem = async (itemObj) => {
    const url = BASE_URL + `item/`
    const paramsObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(itemObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const updateItem = async (taskObj, id) => {
    const url = BASE_URL + `item/${id}/`
    const paramsObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(taskObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const deleteItem = async (id) => {
    const url = BASE_URL + `item/${id}/`
    const paramsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }
    return await tryCatchFetch(url, paramsObj)
}
  

const exportItems = {
    fetchChildList,
    fetchChild,
    addChild,
    fetchWishList,
    fetchWishItem,
    fetchAllWishLists,
    addWishItem,
    deleteItem,
    updateItem
}

export default exportItems