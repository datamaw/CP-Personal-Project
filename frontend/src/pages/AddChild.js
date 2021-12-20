import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import BackendAPI from '../api/BackendAPI.js'
import { Navigate } from 'react-router'

class AddChildPage extends Component {
  state = {
    redirect: false
  }

  handleSubmit(event){
    event.preventDefault()
    const childObject = {
      first_name: event.target.elements[0].value,
      date_of_birth: event.target.elements[1].value,
    }
    console.log(childObject)
    BackendAPI.addChild(childObject)
      .then((response) => { this.setState({ redirect: true }) })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Navigate to = "/cashandcandy" />
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Form.Group controlId="wine_name">
            <Form.Label>Child's First Name</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Form.Group controlId="varietal">
            <Form.Label>Child's Date of Birth</Form.Label>
            <Form.Control/>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default AddChildPage