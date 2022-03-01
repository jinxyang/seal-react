import ReactDOM from 'react-dom'

const Portal = ({ show = false, node = document.body, children }) => {
  return show && ReactDOM.createPortal(children, node ?? document.body)
}

export default Portal
