import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.scss";
const BackDrop = ({onCloseLogin}) => {
  return <div onClick={onCloseLogin} className={classes.backdrop}>
    <i class="fas fa-times" className={classes.backdropIcon}></i>
  </div>;
};
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};
const portalElement = document.getElementById("overlay");
const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<BackDrop onCloseLogin={props.onCloseLogin}/>, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
