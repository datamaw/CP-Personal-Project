import Child from "../components/Child"
import { useState, useEffect } from "react"
import { useParams, Link }  from "react-router-dom"
import BackendAPI from "../api/BackendAPI"

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
        { child && <Link to={`/cashandcandy/parents/${ child.id }/update`} state={{child}}><button>Update Child Info</button></Link> }
        <br/>
        <br/>
        { child && <Link to={`/cashandcandy/parents/${ child.id }/delete`}><button>Delete Child Account</button></Link> }
      <hr />
      { child && <Child child={child} />}
      <br/>
      { child && <Link to={`/cashandcandy/parents`}><button>Nevermind - Back to Parent Control Board</button></Link> }
    </div>
    
  )
}

export default ChildViewPage;