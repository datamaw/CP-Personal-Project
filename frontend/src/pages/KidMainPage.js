import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"
import DogAPI from "../api/DogAPI"
import KrogerAPI from "../api/KrogerAPI"
// import getToken from '../auth/GetToken'

function KidMainPage(props) {
    //states
    const [dogPic, setDogPic] = useState(null)
    const [child, setChild] = useState(null)
    const [token, setToken] = useState(null)
    const [product, setProduct] = useState(null)

    //router props
    const params = useParams()

    //effects
    useEffect(() => {
        const getDogPic = async (id) => {
            const data = await DogAPI.fetchDogPic(id)
            if (data) {
                setDogPic(data.message)
                console.log(data)
                console.log(dogPic)

            }
        }
        getDogPic()
    }, [])

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

    useEffect(() => {
        const getToken = async (id) => {
            const data = await KrogerAPI.fetchToken(id)
            if (data) {
                setToken(data)
                console.log(token)
            }
        }
        getToken()
    }, [])

    useEffect((token) => {
        const getProducts = async () => {
            const data = await KrogerAPI.fetchData(token.access_token)
            if (data) {
                setProduct(data)
                console.log(data)

            }
        }
        getProducts()
    }, [])

    //render
    const renderDogPic = () => {
        if (!dogPic)
            return null

        return (
            <div>
            <h5 className="kidpage">Let's Explore Together!</h5>
            <>
            <img className="dog-pic" src={ dogPic } />
            {/* <Button variant="secondary"  onClick={getDogPic()}>
                    Find a New Friend
            </Button> */}
            </>
            </div>
        )
    }

    const renderChild = () => {
        if (!child)
            return null

        return (
            <h3>Hi, { child.first_name }!</h3>
        )
    }

    
    return (
        <div class="kidmain">
            <img id="kidbanner" src="https://thumbs.dreamstime.com/b/closeup-child-girl-playing-jumping-hopscotch-outdoors-funny-activity-game-kids-playground-summer-backyard-street-sport-196336355.jpg" />
            <br/>
            <br/>
            <h2 id="kidheader">{ renderChild() }</h2>
            <hr />
            <br />
            <div id="kidpagetopbody">
                <>
                { renderDogPic() }
                <br/>
                <br/>
                </>
                <>
                </>
                <>
                </>
            </div>
            <div>
                {/* < StoreAccess /> */}
            </div>
        </div>
    )
}

export default KidMainPage;