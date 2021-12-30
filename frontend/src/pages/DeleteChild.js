
import BackendAPI from "../api/BackendAPI"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom'

function DeleteChildPage(props) {
  // params
  const params = useParams()
  const navigate = useNavigate()
  
  // handler
  const deleteChildAccount = async () => {
    alert("Deleted Child Account")
    const data = await BackendAPI.deleteChild(params.childID)
    if (data) {
      navigate(`/cashandcandy/parents`)
    }
  }

  return (
    <div>
      Are you sure you want to delete this account?
      <br/>
      <br/>
      <button onClick={deleteChildAccount}>Yes</button>
      <br/>
      <br/>
      <br/>
      <Link to="/cashandcandy/parents"><button>Cancel</button></Link>
    </div>
  )
}

export default DeleteChildPage;