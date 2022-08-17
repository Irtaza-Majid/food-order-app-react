import React from 'react'
import classes from './Modal.module.css'
import ReactDOM from 'react-dom'



const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />

}


const Overlay = (props) => {
  return (
    <div className={classes.modal} >
      <div className={classes.content}>{props.children}</div>
    </div>
  )

}



const porytalElement = document.getElementById('overlays');

function Modal(props) {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, porytalElement)}
      {ReactDOM.createPortal(<Overlay >{props.children}</Overlay>, porytalElement)}
    </>
  )
}

export default Modal
