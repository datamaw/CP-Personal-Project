import Child from "../components/Child"
import { useState, useEffect } from "react"
import { useParams, Link }  from "react-router-dom"
import BackendAPI from "../api/BackendAPI"
import {Button} from "react-bootstrap"

function ChildViewPage(props) {
  // state
  const [child, setChild] = useState(null)

  // router props
  const params = useParams()

  // effects
  useEffect(() => {
    const getChild = async () => {
      const data = await BackendAPI.fetchChild(params.childID)
      if (data) {
        console.log("CHILD:", data)
        setChild(data)
      }
    }

    getChild()

  }, [params.childID])

  return (
    <div>
      <h1>Child Info</h1>
      <hr />
      <div id="child-update-buttons">
        { child && <Link to={`/cashandcandy/parents/${ child.id }/update`} state={{child}}><Button variant="success">Update Child Info</Button></Link> }
        <br/>
        <div className="need-some-space">

        </div>
        <br/>
        { child && <Link to={`/cashandcandy/parents/${ child.id }/delete`}><Button variant="danger">Delete Child Account</Button></Link> }
        </div>
      <hr />
      { child && <Child child={child} />}
      <br/>
      { child && <Link to={`/cashandcandy/parents`}><Button variant="secondary">Nevermind - Back to Parent Control Board</Button></Link> }
    </div>
    
  )
}

export default ChildViewPage;