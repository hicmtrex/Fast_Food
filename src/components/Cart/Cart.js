import React, { Fragment, useContext,useState } from 'react'

import Modal from '../UI/Modal';
import classes from './Cart.module.css'
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';


export default function Cart(props) {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSUbmitting, setIsSUbmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);
     
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  function cartItemRemovedHandler(id) {
    cartCtx.removeItem(id)
  }
  function cartItemAddHandler(item) {
    cartCtx.addItem({...item, amount:1})
  }

function orderHandler() {
  setIsCheckout(true)
}

 async function submitOrderHandler(userData) {
    setIsSUbmitting(true)
  await fetch('https://react-http-8ca7a-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
  });
   setIsSUbmitting(false)
   setDidSubmit(true)
   cartCtx.clearCart();
  };
  
    const cartItems = (
    <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem key={item.id} name={item.name}
            amount={item.amount}
            price={item.amount}
            onRemove={cartItemRemovedHandler.bind(null,item.id)}
            onAdd={cartItemAddHandler.bind(null,item)}/>
      ))}
        </ul>);
    
  const modalActions =   <div className={classes.actions}>
  <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
 {hasItems && <button className={classes.button}
 onClick={orderHandler}>Order</button>}
</div>
  const cartModalContent = <Fragment> {cartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
   <span>{totalAmount}</span>
    </div>
 {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />}
  {!isCheckout && modalActions}
  </Fragment>
  
  const isSUbmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = <Fragment><p>Successfully sent the order!</p>
    <div className={classes.actions}>
  <button className={classes.button} onClick={props.onClose}>Close</button>
</div> </Fragment>

 return (
    <Modal onClose={props.onClose}>
   {!isSUbmitting && !didSubmit && cartModalContent}
   {isSUbmitting && isSUbmittingModalContent}
   {!isSUbmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}
