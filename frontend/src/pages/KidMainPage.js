import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"
import DogAPI from "../api/DogAPI"
import KrogerAPI from "../api/KrogerAPI"
import CalcApp from '../components/Calculator/Calculator'
import WishList from '../components/WishList'


function KidMainPage(props) {
    //states
    const [dogPic, setDogPic] = useState(null)
    const [child, setChild] = useState(null)
    const [token, setToken] = useState(null)
    const [product, setProduct] = useState(null)
    const [wishList, setWishList] = useState([])

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

  useEffect(() => {
    const getWishList = async () => {
      const data = await BackendAPI.fetchWishList()
      // console.log(data)
      if (data) {
        setWishList(data)
        console.log(wishList)
      }
    }

    getWishList()
  }, [])  // empty array - only run on render

    //render
    const renderDogPic = () => {
        if (!dogPic)
            return null

        return (
            <div>
            <h5 className="kidpage">Let's Explore Together!</h5>
            <>
            <img className="dog-pic" src={ dogPic } alt="dog-pic"/>
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
        const firstProduct = Math.floor(Math.random()*50+1)
        const secondProduct = Math.floor(Math.random()*50+1)
        const thirdProduct = Math.floor(Math.random()*50+1)
        const fourthProduct = Math.floor(Math.random()*50+1)
        const fifthProduct = Math.floor(Math.random()*50+1)

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
                    <Button className="product-button" variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[firstProduct].images[0].sizes[2].url} alt="first-pic" />
                    <h6 className="product-description"> { product.data[firstProduct].description } </h6>
                </div>
                <div className="pic-description">
                    <Button className="product-button" variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[secondProduct].images[0].sizes[2].url} alt="second-pic" />
                    <h6 className="product-description"> { product.data[secondProduct].description } </h6>
                </div>
                <div className="pic-description"> 
                    <Button className="product-button" variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[thirdProduct].images[0].sizes[2].url} alt="third-pic" />
                    <h6 className="product-description"> { product.data[thirdProduct].description } </h6>
                </div>
                <div className="pic-description">
                    <Button className="product-button" variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[fourthProduct].images[0].sizes[2].url} alt="fourth-pic" />
                    <h6 className="product-description"> { product.data[fourthProduct].description } </h6>
                </div>
                <div className="pic-description">
                    <Button className="product-button" variant="secondary" value={Math.floor(Math.random()*10+1)}>
                        ${Math.floor(Math.random()*10+1)}
                    </Button>
                    <img class="store-pics" src={ product.data[fifthProduct].images[0].sizes[2].url} alt="fifth-pic" />
                    <h6 className="product-description"> { product.data[fifthProduct].description } </h6>
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
            <div id="calculating-area">
                <div id="calculator-div">
                    <CalcApp />
                </div>
                <div id="comparison-div">
                    <h4>HOW MUCH CAN YOU BUY?</h4>
                </div>
                <div id="wishlist-div">
                   {/* { wishList && <WishList wishList={wishList} item={item}/> } */}
                </div>
            </div>
        </div>
    )
}

export default KidMainPage;