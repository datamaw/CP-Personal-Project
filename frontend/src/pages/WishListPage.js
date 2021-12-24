import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import BackendAPI from "../api/BackendAPI"
import WishList from '../components/WishList'

function WishListPage(props) {

    //states - assuming taskLists will be an array
    const [wishList, setWishList] = useState(null)

    //params
    const params = useParams()  //give us access to things in routing url

    //effects
    useEffect(()=> {
        const getWishList = async () => {
            const data = await BackendAPI.fetchWishList(params.listID)

            if (data) {
                console.log(data)
                setWishList(data)
            }
        }
        getWishList()

        },[params.listID])

    //render


    return (
        <div>
            <div>
                <Link to="/cashandcandy/wishlists/">
                    <Button id="go-to-wishlists-button" variant="secondary">Go Back to View All Wishlists</Button>
                </Link>
            </div>
            <div>
                <hr />
                { wishList && <Link to={`/cashandcandy/wishlists/${wishList.id}/item/create`}><button>Add Task</button></Link> }
                {/* { wishList && <Link to={`/wishlists/${wishList.id}/item/${item.id}/update`} state={{item}}><button>Update Item</button></Link> }
                { wishList && <Link to={`/wishlists/${wishList.id}/item/${item.id}/delete`}><button>Delete Item</button></Link> } */}
                <hr />
                { wishList && < WishList wishList={wishList} /> }
            </div>
        </div>
    )
}

export default WishListPage;