import './button.scss';

const Button = ({ text, action, borderColor, textColor }) => {
  return (
    <button 
      style={{ "borderColor": borderColor, "color": textColor }} 
      id="custom-btn" 
      onClick={action}
    > {text} </button>
  )
}

export default Button;