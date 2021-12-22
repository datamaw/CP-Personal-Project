import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"
import DogAPI from "../api/DogAPI"
import KrogerAPI from "../api/KrogerAPI"
import App from '../components/Calculator/Calculator'


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
                // console.log(dogPic)

            }
        }
        getDogPic()
    }, [])

    useEffect(() => {
        const getChild = async (id) => {
            const data = await BackendAPI.fetchChild(id)
            if (data) {
                setChild(data)
                // console.log(data)

            }
        }
        getChild(params.childID)
    }, [params.childID])

    useEffect(() => {
        const getToken = async (id) => {
            const data = await KrogerAPI.fetchToken(id)
            if (data) {
                setToken(data)
                console.log(data)
                console.log(token)
            }
            else {
                console.log('Token needs to be refreshed')
            }
        }
        getToken()
    }, [])

    useEffect(() => {
        const getProducts = async (id) => {
            const data = await KrogerAPI.fetchData(token.access_token)
            if (data) {
                setProduct(data)
                console.log(data)
                console.log(product)
            }
        }
        { token && getProducts() }
    }, [token])

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
            <div id="calculating-header">
                <h3>Hi, { child.first_name }!</h3>
            </div>
        )
    }


    const renderProducts = () => {
        const rndInt = Math.floor(Math.random()*10+1)
        if (!product) {
            console.log("no products")

            return (
                <h2>Please Wait for Store Products to Load...</h2>
            )
            // return null
        }
        else return(
            <div id="entire-store">
            <hr/>
            <h3>Snack Store</h3>
            <hr/>
            <div id="snack-layout">
                <div className="pic-description">
                    <Button variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[0].images[0].sizes[1].url} alt="first-pic" />
                    <h10> { product.data[0].description } </h10>
                </div>
                <div className="pic-description">
                    <Button variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[1].images[0].sizes[1].url} alt="second-pic" />
                    <h10> { product.data[1].description } </h10>
                </div>
                <div className="pic-description"> 
                    <Button variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[2].images[0].sizes[1].url} alt="third-pic" />
                    <h10> { product.data[2].description } </h10>
                </div>
                <div className="pic-description">
                    <Button variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[3].images[0].sizes[1].url} alt="fourth-pic" />
                    <h10> { product.data[3].description } </h10>
                </div>
                <div className="pic-description">
                    <Button variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[4].images[0].sizes[1].url} alt="fifth-pic" />
                    <h10> { product.data[4].description } </h10>
                </div>
            </div>
            </div>
        )
    }
    
    return (
        <div class="kidmain">
            <img id="kidbanner" src="https://thumbs.dreamstime.com/b/closeup-child-girl-playing-jumping-hopscotch-outdoors-funny-activity-game-kids-playground-summer-backyard-street-sport-196336355.jpg" />
            <br/>
            <br/>
            <div id="kidheader">{ renderChild() }</div>
            <hr />
            <br />
            <div id="kidpagetopbody">
                <>
                { renderDogPic() }
                <br/>
                <br/>
                </>
                <div>

                </div>
                <>
                </>
            </div>
            <div>
                { renderProducts() }
                <hr/>
            </div>
            <div>
                <App />
            </div>
        </div>
    )
}

export default KidMainPage;