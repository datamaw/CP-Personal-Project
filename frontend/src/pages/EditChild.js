import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI.js'
import { Navigate } from 'react-router'
import UserContext from '../contexts/UserContext.js'

class EditChildPage extends Component {
  state = {
    redirect: false
  }

  handleSubmit(event){
    event.preventDefault()
    const childObject = {
      first_name: event.target.elements[0].value,
      age: event.target.elements[1].value,
      user: 1  //event.target.elements[2].value
    }
    console.log(childObject)
    BackendAPI.addChild(childObject)
      .then((response) => { this.setState({ redirect: true }) })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Navigate to = "/cashandcandy/parents" />
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group controlId="child_name">
            <Form.Label>Child's First Name</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="age">
            <Form.Label>Child's Age</Form.Label>
            <Form.Control/>
          </Form.Group>

          {/* <Form.Group controlId="varietal">
            <Form.Label>Parent's Username</Form.Label>
            <Form.Control/>
          </Form.Group> */}

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default EditChildPage