function Child(props) {
  
    const renderChild = () => {
      if (!props.child)
        return null
  
      return (
        <div>
          <h3>Child Name: { props.child.first_name }</h3>
          <h4>Age: { props.child.age } </h4>
        </div>
      )
    }
    
    return (
      <div>
        { renderChild() }
      </div>
    )
  }
  
  export default Child;