import React, { Component, useState } from 'react'
import { Button } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI.js'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
// import UserContext from '../contexts/UserContext.js'

function ModifyChildPage(props) {
  //states
  const [child, setChild] = useState(null)

  //router props
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  //derived values
  const initialChild = location.state && location.state.child
  const action = initialChild ? "Update" : "Add"


  //handlers
  const handleSubmit = async (event) => {
    event.preventDefault()

    const childObject = {
      first_name: event.target.elements[0].value,
      age: event.target.elements[1].value,
      user: params.userID  //event.target.elements[2].value
    }
    console.log(childObject)

    const data = initialChild
      ? await BackendAPI.updateChild(childObject, initialChild.id)
      : await BackendAPI.addChild(childObject)
    if (data) {
      navigate(`/cashandcandy/parents`)
    }
  }

    return (
      <div>
        <h2>{ action } Child Page </h2>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label>Child's First Name</label>
            <input defaultValue={initialChild && initialChild.first_name} class="form-control" id="child-name" placeholder="Enter first name"/>
          </div>

          <div class="form-group">
            <label>Child's Age</label>
            <input defaultValue={initialChild && initialChild.age} class="form-control" id="child-age" placeholder="Enter child age"/>
          </div>

          <button variant="secondary" type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  
}

export default ModifyChildPage