
import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import UserContext from '../contexts/UserContext'

function ChildList(props) {
    // render
    const renderChildList = () => {
      if (!props.childList)
        return null

      const username = localStorage.getItem("auth-user")

      let filtered = props.childList.filter(function (child) {
        console.log(child.user)
        console.log(props.user)
          return child.user === username;
      })

      console.log("filtered children",filtered)

      return filtered.map((child, index) => {
        return (
          <tr key={index}>
            {/* <td>{ child.id }</td> */}
            <td><Link to={`${child.id}/`}>{ child.first_name }</Link></td>
            {/* <td>{ child.first_name }</td> */}
          </tr>
        )
      })
    }
  
    return (
      <div>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              {/* <th>#</th> */}
              <th>Child Accounts</th>

              {/* <th>Price</th>
              <th>Varietal</th>
              <th>Description</th> */}
            </tr>
          </thead>
          <tbody>
            { renderChildList() }
          </tbody>
        </Table>
        
      </div>
    )
  }

export default ChildList