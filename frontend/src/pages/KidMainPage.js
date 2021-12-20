import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"

function KidMainPage(props) {
    //states
    const [child, setChild] = useState(null)

    //router props
    const params = useParams()

    //effects
    useEffect(() => {
        const getChild = async (id) => {
            const data = await BackendAPI.fetchChild(id)
            if (data) {
                setChild(data)
                console.log(data)

            }
        }
        getChild(params.childID)
    }, [params.childID])

    //render
    const renderChild = () => {
        if (!child)
            return null

        return (
            <h3>Hi, { child.first_name }!</h3>
        )
    }

    return (
        <div>
            <h2>Financial Playground</h2>
            <br />
            { renderChild() }
        </div>
    )
}

export default KidMainPage;