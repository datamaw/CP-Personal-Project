import React, { Component, useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
// import UserContext from '../contexts/UserContext.js'

function ModifyWishlist(props) {

  //router prop
  

  //states
  // const [child, setChild] = useState(null)
  // const [user, setUser] = useState(null)

  //router props
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  //derived values
  const initialWishlist = params.listID
  const action = initialWishlist ? "Update" : "Add"
//   const id = localStorage.getItem("user info")

  //handlers
  const handleSubmit = async (event) => {
    event.preventDefault()
    // if (localStorage.getItem("user info") != null) {

    // }

    const listObject = {
      list_name: event.target.elements[0].value,
      child: event.target.elements[1].value,
    }
    console.log(listObject)

    const data = initialWishlist
      ? await BackendAPI.updateWishlist(listObject, params.listID)
      : await BackendAPI.addWishlist(listObject)
    if (data) {
      navigate(`/cashandcandy/wishlists`)
    }
  }

    return (
      <div>
        <h2>{ action } Wishlist Page </h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Wishlist Name</label>
            <input defaultValue={initialWishlist && props.list_name} class="form-control" id="list-name" placeholder="Enter list name"/>
          </div>

          <div class="form-group">
            <label>Which Child is this For?</label>
            <input defaultValue={initialWishlist && props.child} class="form-control" id="child" placeholder="Enter child ID number"/>
          </div>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </form>
      </div>
    )
  
}

export default ModifyWishlist