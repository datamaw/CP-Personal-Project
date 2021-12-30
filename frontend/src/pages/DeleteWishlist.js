
import BackendAPI from "../api/BackendAPI"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

function DeleteWishlist(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()
  
  // handler
  const deleteWishlist = async () => {
    alert("Deleted List")
    console.log(params.listID)
    const data = await BackendAPI.deleteWishlist(params.listID)
    if (data) {
      navigate(`/cashandcandy/wishlists`)
    }
  }

  return (
    <div>
      Are you sure you want to delete this list?
      <br/>
      <br/>
      <button onClick={deleteWishlist}>Yes</button>
      <br/>
      <br/>
      <br/>
      <Link to="/cashandcandy/wishlists"><button>Cancel</button></Link>
    </div>
  )
}

export default DeleteWishlist;