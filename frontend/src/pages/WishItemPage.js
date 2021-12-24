import WishItem from "../components/WishItem"
import { useState, useEffect } from "react"
import { useParams, Link }  from "react-router-dom"
import BackendAPI from "../api/BackendAPI"

function WishItemPage(props) {
  // state
  const [item, setItem] = useState(null)

  // router props
  const params = useParams()

  // effects
  useEffect(() => {
    const getItem = async () => {
      const data = await BackendAPI.fetchWishItem(params.itemID)
      if (data) {
        console.log("ITEM:", data)
        setItem(data)
      }
    }

    getItem()

  }, [params.itemID])

  return (
    <div>
      <h1>Wishlist Item</h1>
      <hr />
        { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}/item/${item.id}/update`} state={{item}}><button>Update Item</button></Link> }
        <br/>
        <br/>
        { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}/item/${item.id}/delete`}><button>Delete Item</button></Link> }
      <hr />
      { item && <WishItem item={item} />}
      <br/>
      { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}`}><button>Nevermind - Back to Wishlist</button></Link> }
    </div>
    
  )
}

export default WishItemPage;