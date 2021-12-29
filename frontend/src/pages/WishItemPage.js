import WishItem from "../components/WishItem"
import { useState, useEffect } from "react"
import { Button } from 'react-bootstrap'
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
       <div id="child-update-buttons">
        { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}/item/${item.id}/update`} state={{item}}><Button variant="success">Update Item</Button></Link> }
        <br/>
        <div className="need-some-space"></div>
        <br/>
        { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}/item/${item.id}/delete`}><Button variant="danger">Delete Item</Button></Link> }
        </div>
      <hr />
      { item && <WishItem item={item} />}
      <br/>
      { item && <Link to={`/cashandcandy/wishlists/${item.wishlist.id}`}><Button variant="secondary">Nevermind - Back to Wishlist</Button></Link> }
    </div>
    
  )
}

export default WishItemPage;