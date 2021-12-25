
import BackendAPI from "../api/BackendAPI"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

function DeleteItemPage(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()
  
  // handler
  const deleteItem = async () => {
    alert(params.itemID)
    const data = await BackendAPI.deleteItem(params.itemID)
    if (data) {
      navigate(`/cashandcandy/wishlists/${params.listID}/`)
    }
  }

  return (
    <div>
      Are you sure you want to delete this item?
      <br/>
      <br/>
      <button onClick={deleteItem}>Yes</button>
      <br/>
      <br/>
      <br/>
      <Link to={`/cashandcandy/wishlists/${params.listID}/`}><button>Cancel</button></Link>
    </div>
  )
}

export default DeleteItemPage;