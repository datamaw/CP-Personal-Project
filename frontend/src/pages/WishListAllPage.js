import { useState, useEffect } from 'react'
import {Button} from 'react-bootstrap'
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
                <hr/>
            </div>
        )
    })
    return elems;
}

    return (
        <div id="all-wishlists-page">
            <div id="wishlist-pic-div">
            </div>
            <br/>
            <h1>Your Family's Wishlists</h1>
            <Link to={"/cashandcandy/wishlists/addwishlist"}><Button variant="secondary">New Wishlist</Button></Link>
            <hr/>
            <div>
                <h5>{ renderWishLists() }</h5>
            </div>
        </div>
    )
}

export default WishListAllPage;