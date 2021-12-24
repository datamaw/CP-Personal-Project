import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackendAPI from "../api/BackendAPI"

function WishListAllPage(props) {
    //states - assuming taskLists will be an array
    const [wishLists, setWishLists] = useState([])

    //effects
    useEffect(()=> {
        const getWishLists = async () => {
            const data = await BackendAPI.fetchAllWishLists()

            if (data) {
                console.log(data)
                setWishLists(data)
            }
        }
        getWishLists()
    },[])

    //render
const renderWishLists = () => {
    let elems = wishLists.map((wishLists) => {
        return (
            <div>
                <Link to={`/cashandcandy/wishlists/${wishLists.id}`}>{ wishLists.list_name }</Link>
            </div>
        )
    })
    return elems;
}

    return (
        <div>
            <h2>Your Children's Wishlists</h2>

            <div>
                <h5>{ renderWishLists() }</h5>
            </div>
        </div>
    )
}

export default WishListAllPage;