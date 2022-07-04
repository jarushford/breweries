const toggle = ( state, action, id, style ) => {
  return (
    <div id={style}>
      <span>{state}</span>
      <input type="checkbox" id={id} onClick={action}/>
      <label htmlFor={id}>Toggle</label>
    </div>
  )
}

export default toggle;