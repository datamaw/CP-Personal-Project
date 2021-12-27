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
        <div id="parent-page">
            <h1>Parent Control Hub</h1>
            <br />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CbkOO2yz8P3BfP79EwXlrer3dtwSS3g9w&usqp=CAU" />
            <br/>
            <br/>
            <Link to={`/cashandcandy/wishlists/`}><Button variant="secondary">View and Manage Wishlists</Button></Link>
            <br/>
            <br/>
            <br/>
            <Link to="/cashandcandy/parents/addchild">
                <Button variant="secondary" >
                    Add Child
                </Button>
                <br/>{/* ˚ */}
            </Link>
            <br/>
            {/* <Link to="/cashandcandy/addchild">
                <Button variant="outline-secondary" >
                    View Children List
                </Button>
            </Link> */}
            <ChildList childList={childList} />
            <br/>
            <br/>
 
        </div>
    )
}

export default ParentPage;