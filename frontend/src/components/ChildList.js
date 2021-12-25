
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ChildList(props) {
    // render
    const renderChildList = () => {
      if (!props.childList)
        return null
  
      console.log(props.childList)
      return props.childList.map((child, index) => {
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
        <Table striped bordered hover>
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