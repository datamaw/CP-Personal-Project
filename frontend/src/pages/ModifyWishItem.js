import { useState }  from 'react'
import { useParams, useLocation, useNavigate } from "react-router-dom" //useNavigate because it is calling a function and not a component
import BackendAPI from "../api/BackendAPI"

function ModifyWishItemPage(props) {

    //states
    const [item, setItem] = useState(null)

    //router props
    const params = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    //derived values
    const initialItem = location.state && location.state.item
    const action = initialItem ? "Update" : "Create"

    //handlers
    const handleFormSubmit = async (event) => {
        event.preventDefault()

        let itemObj = {
            wishlist: params.listID,
            item_name: event.target.elements[0].value,
            item_location: event.target.elements[1].value,
            // item_id: event.target.elements[2].value,
            item_price: event.target.elements[2].value,
            item_image: event.target.elements[3].value,
            date_added: event.target.elements[4].value,
            // purchased: event.target.elements[5].value
        }
        
        console.log(itemObj)


        const data = initialItem
           ? await BackendAPI.updateItem(itemObj, initialItem.id)
           : await BackendAPI.addWishItem(itemObj)
        if (data) {
            navigate(`/cashandcandy/wishlists/${params.listID}`)
        }
    }

    return (
        <div>
            <h2>{ action } Item Page</h2>
            <form onSubmit={handleFormSubmit}>
                <div class="form-group">
                    <label>Item Name</label>
                    <input defaultValue={initialItem && initialItem.item_name} class="form-control" id="item-name" placeholder="Enter item name"/>
                    {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                </div>
                <div class="form-group">
                    <label>Location</label>
                    <input defaultValue={initialItem && initialItem.item_location} class="form-control" id="store-name" placeholder="Enter store name"/>
                </div>
                {/* <div class="form-check">
                    <label>Item ID</label>
                    <input class="form-control" id="item-id" placeholder="Enter item id number, if known"/>
                </div> */}
                <div class="form-check">
                    <label>Price</label>
                    <input defaultValue={initialItem && initialItem.item_price} type='number' class="form-control" id="item-price" placeholder="Enter item price"/>
                </div>
                <div class="form-check">
                    <label>Item Image</label>
                    <input defaultValue={initialItem && initialItem.item_image} class="form-control" id="item-image" placeholder="Enter item image url"/>
                </div>
                <div class="form-check">
                    <label>Date Added</label>
                    <input defaultValue={initialItem && initialItem.date_added} class="form-control" id="item-added-date" placeholder="Enter today's date MM-DD-YYYY"/>
                </div>
                {/* <div class="form-check">
                    <label>Purchased</label>
                    <input class="form-control" id="item-status" placeholder="Enter true or false"/>
                </div> */}
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ModifyWishItemPage;