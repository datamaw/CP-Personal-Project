import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'  //to use id from url
import BackendAPI from "../api/BackendAPI"
import DogAPI from "../api/DogAPI"
import KrogerAPI from "../api/KrogerAPI"
import CalcApp from '../components/Calculator/Calculator'
import MyScreen from '../components/MyCalc/MyScreen'
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
    const [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
        });

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
      const data = await BackendAPI.fetchAllWishLists(child)
      // console.log(data)
      if (data) {
        setWishLists(data)
        console.log(wishLists)
      }
    }

    getWishList()
  }, [child])  // empty array - only run on render

    //calculator
    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
    
        if (removeSpaces(calc.num).length < 16) {
            setCalc({
            ...calc,
            num:
                calc.num === 0 && value === "0"
                ? "0"
                : calc.num % 1 === 0
                ? Number(calc.num + value)
                : calc.num + value,
            res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;
      
        setCalc({
          ...calc,
          sign: value,
          res: !calc.res && calc.num ? calc.num : calc.res,
          num: 0,
        });
      };

    const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
        const math = (a, b, sign) =>
        sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "X"
            ? a * b
            : a / b;

        setCalc({
        ...calc,
        res:
            calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                    Number(removeSpaces(calc.res)),
                    Number(removeSpaces(calc.num)),
                    calc.sign
                )
                ),
        sign: "",
        num: 0,
        });
        }
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };

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

        if (!product) {
            console.log("no products")

            return (
                <div>
                    <h2>Please Wait for Store Products to Load...</h2>
                </div>
            )
            
        }
        else return(
            <div id="entire-store">
            <hr/>
            <h3>Candy Shop</h3>
            <br/>

            <h6 id="shop-subtitle">Click on the Buttons to Shop, and See Your Total Below</h6>
            <hr/>
            <div id="snack-layout">
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[firstProduct].description } </h6>
                    <img class="store-pics" src={ product.data[firstProduct].images[0].sizes[2].url} alt="first-pic" />
                    <br/>
                    <Button className="product-button" variant="secondary" value="1" onClick={numClickHandler}>
                        $1
                    </Button>              
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[secondProduct].description } </h6>
                    <img class="store-pics" src={ product.data[secondProduct].images[0].sizes[2].url} alt="second-pic" />
                    <Button className="product-button" variant="secondary" value="2" onClick={numClickHandler}>
                        $2
                    </Button>
                </div>
                <div className="pic-description"> 
                    <h6 className="product-description"> { product.data[thirdProduct].description } </h6>
                    <img class="store-pics" src={ product.data[thirdProduct].images[0].sizes[2].url} alt="third-pic" />
                    <Button className="product-button" variant="secondary" value="2" onClick={numClickHandler}>
                        $3
                    </Button>
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[fourthProduct].description } </h6>
                    <img class="store-pics" src={ product.data[fourthProduct].images[0].sizes[2].url} alt="fourth-pic" />
                    <Button className="product-button" variant="secondary" value="2" onClick={numClickHandler}>
                        $4
                    </Button>
                </div>
                <div className="pic-description">
                    <h6 className="product-description"> { product.data[fifthProduct].description } </h6>
                    <img class="store-pics" src={ product.data[fifthProduct].images[0].sizes[2].url} alt="fifth-pic" />
                    <Button className="product-button" variant="secondary" value="2" onClick={numClickHandler}>
                        $5
                    </Button>
                </div>          
            </div>
                {/* <br/> */}
                {/* <div id="operations-buttons">
                    <br/>
                    <br/>
                    <Button className="operations-button" variant="secondary" value="+" onClick={signClickHandler}>+</Button>
                    <Button className="operations-button" variant="secondary" value="=" onClick={equalsClickHandler}>=</Button> 
                </div> */}
            </div>
        )
    }
    
    // const child_name = child.first_name

    //render
    const renderWishLists = (props) => {
        // if (child.first_name === wishLists.child) {
        let filtered = wishLists.filter(function (wishList) {
            return wishList.child === child.first_name;
        })
        let elems = filtered.map((wishLists, index) => {

                return (
                    <div div key={index}>
                        {/* <Link to={`/cashandcandy/wishlists/${wishLists.id}`}>{ wishLists.list_name }</Link> */}
                        <h2>{ wishLists.child } Wants:</h2>
                        <br/>
                        <h3>{ wishLists.items[0].item_name }</h3>
                        <br/>
                        <h4>${ wishLists.items[0].item_price }</h4>
                        {/* <h4>{ item.item_name }</h4> */}
                        <hr/>
                        <h3>{ wishLists.items[1].item_name }</h3>
                        <br/>
                        <h4>${ wishLists.items[1].item_price }</h4>

                    </div>
                )
            })
            return elems;
        // }
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
                    <p>Watch the video ---></p>
                    <p> then join Fido in choosing candy to buy. The more candy you add, the less money you will have for your wishlist items!</p>
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
                {/* <Button onClick={token && renderProducts() }>Display Candy!</Button> */}
            </div>
            <div id="calculating-area">
                <div id="calculator-div">
                    <h2>$$ Candy Shop Total $$</h2>
                    <CalcApp />
                    {/* <MyScreen value={calc.num ? calc.num : calc.res} />
                    <Button value="C" onClick={resetClickHandler}>Clear</Button> */}
                </div>
                <div id="comparison-div">
                    <h4>SAVE OR SPEND?</h4>
                </div>
                <div id="wishlist-div">
                    {renderWishLists()}
                </div>
            </div>
        </div>
    )
}

export default KidMainPage;