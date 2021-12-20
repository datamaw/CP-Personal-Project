import { Children } from 'react';
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ChildList from '../components/ChildList';
import { useState, useEffect } from "react"
import BackendAPI from "../api/BackendAPI"

function ParentPage(props) {
   
    //states
    const [childList, setChildList] = useState([])
    
    // effects
    useEffect(() => {
        const getChildList = async () => {
        const data = await BackendAPI.fetchChildList()
        // console.log(data)
        if (data) {
            setChildList(data)
            console.log(childList)
      }
    }

    getChildList()
    }, [])  // empty array - only run on render

    return (
        <div>
            <h2>Parent Control Board</h2>
            <br />
            <Link to="/cashandcandy/addchild">
                <Button variant="outline-secondary" >
                    Add Child
                </Button>
            </Link>
            {/* <Link to="/cashandcandy/addchild">
                <Button variant="outline-secondary" >
                    View Children List
                </Button>
            </Link> */}
            <ChildList childList={childList} />
        </div>
    )
}

export default ParentPage;