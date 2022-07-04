import './toggle.scss';

// Reuseable button component
// state = the text to be displayed above the toggle for the two different states
// action = the function provided to the onClick action of the input
// id = the id of the input and htmlFor value of the label
// textColor = color of the state text above the toggle

const toggle = ( state, action, id, textColor ) => {
  return (
    <div id="toggleBtn">
      <span style={{ "color" : textColor }}>{state}</span>
      <input type="checkbox" id={id} onClick={action}/>
      <label htmlFor={id}>Toggle</label>
    </div>
  )
}

export default toggle;