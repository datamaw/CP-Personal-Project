function WishItem(props) {
  
    const renderItem = () => {
      if (!props.item)
        return null
  
      return (
        <div>
          <h3>Item: { props.item.item_name }</h3>
          <h4>Store: { props.item.item_location } </h4>
          <h4> Price: ${ props.item.item_price }</h4>
          <h4> Date Added: { props.item.date_added }</h4>
        </div>
      )
    }
    
    return (
      <div>
        { renderItem() }
      </div>
    )
  }
  
  export default WishItem;