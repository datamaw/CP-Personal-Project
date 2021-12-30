

const BASE_URL = "https://cashandcandy-backend.herokuapp.com/cashandcandy/"

//cashandcandy
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

const fetchChildList = async (childObj) => {
    let token = await localStorage.getItem("auth-token") 
    const url = BASE_URL + 'child'
    const init = {
        "method": "GET",
        "headers": {
        "Content-type": "application/json",
        "Authorization": `JWT ${token}`
        },
        body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
    
}

const fetchChild = async (childID, childObj) => {
    let token = await localStorage.getItem("auth-token") 
    const url = BASE_URL + 'child/' + `${childID}`
    const init = {
        "method": "GET",
        "headers": {
        "Content-type": "application/json",
        "Authorization": `JWT ${token}`
        },
        // body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
}

const addChild = async (childObj) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + 'child/'
    const init = {
        "method": "POST",
        "headers": {
            "Content-type": "application/json",
            "Authorization": `JWT ${token}`
        },
        body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
}

const updateChild = async (childObj, id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `child/${id}/`
    const init = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        },
        body: JSON.stringify(childObj)
    }
    return await tryCatchFetch(url, init)
}

const deleteChild = async (id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `child/${id}/`
    const paramsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      }
    }
    return await tryCatchFetch(url, paramsObj)
}


const fetchAllWishLists = async () => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + 'wish-list/'
    const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`
        }
      }
    return await tryCatchFetch(url, init)
}

const fetchWishList = async (id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `wish-list/${id}/`
    const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`
        }
      }
    return await tryCatchFetch(url, init)
}

const fetchWishItem = async (itemID) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + 'item/' + `${itemID}`
    const init = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`
        }
      }
    return await tryCatchFetch(url, init)
}

const addWishItem = async (itemObj) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `item/`
    const paramsObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        },
        body: JSON.stringify(itemObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const updateItem = async (taskObj, id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `item/${id}/`
    const paramsObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
      body: JSON.stringify(taskObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const deleteItem = async (id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `item/${id}/`
    const paramsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      }
    }
    return await tryCatchFetch(url, paramsObj)
}

const addWishlist = async (listObj) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `wish-list/`
    const paramsObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `JWT ${token}`
        },
        body: JSON.stringify(listObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const updateWishlist = async (listObj, id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `wish-list/${id}/`
    const paramsObj = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      },
      body: JSON.stringify(listObj)
    }
    return await tryCatchFetch(url, paramsObj)
}

const deleteWishlist = async (id) => {
    let token = await localStorage.getItem("auth-token")
    const url = BASE_URL + `wish-list/${id}/`
    const paramsObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `JWT ${token}`
      }
    }
    return await tryCatchFetch(url, paramsObj)
}


const exportItems = {
    // login,
    fetchChildList,
    fetchChild,
    addChild,
    fetchWishList,
    fetchWishItem,
    fetchAllWishLists,
    addWishItem,
    deleteItem,
    updateItem,
    updateChild,
    deleteChild,
    addWishlist,
    updateWishlist,
    deleteWishlist
}

export default exportItems