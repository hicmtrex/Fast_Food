import React, { Fragment } from 'react'
import ReactDom from 'react-dom'

import classes from './Modal.module.css'

 function Backdrop(props) {
 return <div className={classes.backdrop} onClick={props.onClose}/>
}

 function ModalOverlay(props) {
    return (
        <div className={classes.modal}>
       <div className={classes.content}>{props.children}</div>
       </div>
    )
}

const portalElement = document.getElementById('overlays');

export default function Modal(props) {
    return (
        <Fragment>
         {ReactDom.createPortal(<Backdrop onCLose={props.onClose} />,portalElement)}  
 {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
        </Fragment>
    )
}
