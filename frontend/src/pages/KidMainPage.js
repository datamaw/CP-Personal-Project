import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
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
            <h5 className="kidpage">Let's Explore Together!</h5>
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
                            <br/>
                            <h4>${ wishLists.items[0].item_price }</h4>
                            {/* <h4>{ item.item_name }</h4> */}
                            <hr/>
                            <h3 className="wish-item-color">{ wishLists.items[1].item_name }</h3>
                            <br/>
                            <h4>${ wishLists.items[1].item_price }</h4>

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
            <img id="kidbanner" src="https://www.protapes.com/blog/wp-content/uploads/2020/06/02-a-hopscotch-board-on-a-driveway-made-with-pro-gaff-tape.jpg" />
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
                    <p>Watch the video with <input type="text" placeholder="Name Your Dog!"/></p>
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
                    <CalcApp />
                    <br/>
                    {/* <h2 id="earned-title">You Earned This Much $</h2>
                    <MoneyAmountApp/> */}
                    <h6>* Use the calculator to add up your candy total.</h6>
                    <h6>* Add how much spending money you have to Spend It.</h6>
                    <h6>* Add the candy total below that with a (-) sign.</h6>
                    <h6>* See how much spending money is left.</h6>
                    <br/>
                    <h6>* Enter your savings total in Save It.</h6>
                    <h6>* Enter how much spending money is left to see your new total.</h6>
                    
                </div>
                <div id="comparison-div">
                    <h4>SAVE OR SPEND?</h4>
                    <SpendApp />
                    <SaveApp />
                    <br/>
                    <h3 id="candy-words">Are You Closer to Your Wish List Goals When You Save?</h3>
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