import { useState, useEffect } from 'react'
import { Button, Carousel } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"
import DogAPI from "../api/DogAPI"
import KrogerAPI from "../api/KrogerAPI"
import CalcApp from '../components/Calculator/Calculator'
import SpendApp from '../components/Spend'
import SaveApp from '../components/Save'
import { FaCreativeCommonsSamplingPlus } from 'react-icons/fa'
import MoneyAmountApp from '../components/MoneyAmount'
// import MyScreen from '../components/MyCalc/MyScreen'
// import ButtonBox from "./ButtonBox";
// import Button from "./Button";


//calculator
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

function KidMainPage(props) {
    //states
    const [dogPic, setDogPic] = useState(null)
    const [child, setChild] = useState(null)
    const [token, setToken] = useState(null)
    const [product, setProduct] = useState(null)
    const [wishLists, setWishLists] = useState([])
    // const [calc, setCalc] = useState({
    //     sign: "",
    //     num: 0,
    //     res: 0,
    //     });

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
                console.log("child data:",data)

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
                console.log("product array:",data)
                // console.log("product:",product)
            }
        }
        { token && getProducts() }
    }, [token])

  useEffect(() => {
    const getWishList = async () => {
      const data = await BackendAPI.fetchAllWishLists(child)
      // console.log(data)
      if (data) {
        setWishLists(data)
        console.log("all wish lists:",data)
        // console.log("wishlist data:",wishLists)
      }
    }

    getWishList()
  }, [child])  // empty array - only run on render

    //render
    const renderDogPic = () => {
        if (!dogPic)
            return null

        return (
            <div>
            {/* <h5 className="kidpage">Let's Explore Together!</h5> */}
            <br/>
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
                <h1>Hi, { child.first_name }!</h1>
            </div>
        )
    }


    const renderProducts = () => {
       
        const firstProduct = Math.floor(Math.random()*50+1)
        const secondProduct = Math.floor(Math.random()*50+1)
        const thirdProduct = Math.floor(Math.random()*50+1)
        const fourthProduct = Math.floor(Math.random()*50+1)
        const fifthProduct = Math.floor(Math.random()*50+1)

        try{
            if (!product) {
                console.log("no products")

                return (
                    <div>
                        <h2>Please Wait for Store Products to Load...</h2>
                    </div>
                )
                
           }
         }  catch (error) {
            console.log(error)
            renderProducts()
         } 

        if (!product.data[firstProduct].description || !product.data[secondProduct].description || !product.data[thirdProduct].description || !product.data[fourthProduct].description || !product.data[fifthProduct].description)
            // renderProducts()
            return null

       return(
            <div id="entire-store">
            <hr/>
            <h3>Candy Shop</h3>
            <br/>

            <h6 id="shop-subtitle">Add Up Your Total Candy Purchase Using the Calculator Below</h6>
            <hr/>
            <div id="snack-layout">
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[firstProduct].description } </h6>
                    <img class="store-pics" src={ product.data[firstProduct].images[0].sizes[4].url} alt="first-pic" />
                    <br/>
                    <h3 className="product-button">${Math.floor(Math.random()*5+1)}</h3>              
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[secondProduct].description } </h6>
                    <img class="store-pics" src={ product.data[secondProduct].images[0].sizes[4].url} alt="second-pic" />
                    <h3 className="product-button">${Math.floor(Math.random()*5+1)}</h3> 
                </div>
                <div className="pic-description"> 
                    <h6 className="product-description"> { product.data[thirdProduct].description } </h6>
                    <img class="store-pics" src={ product.data[thirdProduct].images[0].sizes[4].url} alt="third-pic" />
                    <h3 className="product-button">${Math.floor(Math.random()*5+1)}</h3> 
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[fourthProduct].description } </h6>
                    <img class="store-pics" src={ product.data[fourthProduct].images[0].sizes[4].url} alt="fourth-pic" />
                    <h3 className="product-button">${Math.floor(Math.random()*5+1)}</h3> 
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[fifthProduct].description } </h6>
                    <img class="store-pics" src={ product.data[fifthProduct].images[0].sizes[4].url} alt="fifth-pic" />
                    <h3 className="product-button">${Math.floor(Math.random()*5+1)}</h3> 
                </div>          
            </div>
                
            </div>
        )
    }
    
    // const child_name = child.first_name

    //render
    const renderWishLists = (props) => {
        try {
            let filtered = wishLists.filter(function (wishList) {
                return wishList.child === child.first_name;
            })

            console.log("filtered wishlists:",filtered)

            let elems = filtered.map((wishLists, index) => {

                    return (
                        <div div key={index}>
                            {/* <Link to={`/cashandcandy/wishlists/${wishLists.id}`}>{ wishLists.list_name }</Link> */}
                            <h3 id="child-wants-title">for { wishLists.child }</h3>
                            <hr/>
                            <h3 className="wish-item-color">{ wishLists.items[0].item_name }</h3>
                            <h4>${ wishLists.items[0].item_price }</h4>
                            <img src={wishLists.items[0].item_image} height="100"/>
                            {/* <h4>{ item.item_name }</h4> */}
                            <hr/>
                            <h3 className="wish-item-color">{ wishLists.items[1].item_name} </h3>
                            <h4>${ wishLists.items[1].item_price }</h4>
                            <img src={wishLists.items[1].item_image} height="100"/>

                        </div>
                    )
                })
                return elems;
        } catch (error) {
            console.log(error)
        }

    }
    
    return (
        <div class="kidmain">
            {/* <img id="kidbanner" src="https://thumbs.dreamstime.com/b/closeup-child-girl-playing-jumping-hopscotch-outdoors-funny-activity-game-kids-playground-summer-backyard-street-sport-196336355.jpg" /> */}
            <img id="kidbanner" src="data:image/jpeg;base64,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"/>
            <br/>
            <br/>
            <div id="kidheader">{ renderChild() }</div>
            <hr />
            <br />
            <div id="kidpagetopbody">
                <div id="dog-div">
                { renderDogPic() }
                </div>
                <div id="chalkboard">
                    <p>Watch the video with <input type="text" placeholder="Name the Dog!"/></p>
                    <p> then explore the candy shop! Will you spend or save?</p>
                </div>
                <div>
                <iframe width="735" height="269" src="https://www.youtube.com/embed/NfurkrZEn3Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                </div>
            </div>
            <div>
                { renderProducts() }
                <hr/>
            </div>
            <div>
                
            </div>
            <div id="calculating-area">
                <div id="calculator-div">
                    <h2>$$ Candy Shop Total $$</h2>
                    <br/>
                    <br/>
                    <CalcApp />
                    <br/>
                    <br/>
                    <br/>
                    {/* <h2 id="earned-title">You Earned This Much $</h2>
                    <MoneyAmountApp/> */}
                    <h6>Use the calculator to add up your candy total.</h6>
                    <h6>Then explore how close you can get to buying bigger items if you save!</h6>
                    {/* <h6>* Add the candy total below that with a (-) sign.</h6>
                    <h6>* See how much spending money is left.</h6> */}
                    <br/>
                    {/* <h6>* Enter your savings total in Save It.</h6>
                    <h6>* Enter how much spending money is left to see your new total.</h6> */}
                    
                </div>
                <div id="comparison-div">
                    <h4>SAVE OR SPEND?</h4>
                    <SpendApp />
                    <SaveApp />
                    <br/>
                    <h4 id="candy-words">Are You Closer to Your Wish List Goals When You Save?</h4>
                </div>
                <div id="wishlist-div">
                    <h2>Wishlist Items</h2>
                    {renderWishLists()}
                </div>
            </div>
        </div>
    )
}

export default KidMainPage;