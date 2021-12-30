import React, { Component } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function WishList(props) {

    // render
    const renderWishList = (items) => {
    //   if (!props.wishList)
    //     return null
  
    //   console.log(props.wishList)
      return items.map((item, index) => {
        return (
                <div key={index}>
                    <h4> { item.item_name }</h4>
                    <h5>Location: { item.item_location }</h5>
                    <h5>{ item.item_name } Price: ${ item.item_price }</h5>
                    <img src={ item.item_image } />
                    <h5>Date Added: { item.date_added }</h5>
            
                    <Link to={`/cashandcandy/wishlists/${item.id}/item/${item.id}`}><Button variant="success">Edit</Button></Link>
                    <hr/>
                </div>
                )}) 
            }
        
            // render
            return (
            <div>
                <h3>{ props.wishList.list_name }</h3>
                <hr/>
                { renderWishList(props.wishList.items) }
            </div>
            )
        }
        
        export default WishList;