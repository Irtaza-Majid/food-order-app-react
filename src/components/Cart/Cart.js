import React, { useContext, useState } from 'react'
import useAxios from '../../hooks/useAxios'
import CartContext from '../../store/cart-context'
import Modal from '../UI/Modal'
import Spinner from '../UI/Spinner'
import classes from './Cart.module.css'
import CartItem from './CartItem'
import Checkout from './Checkout'
const Cart = (props) => {

  const [isCheckOut, setIsCheckOut] = useState(false)
  const [isDataFilled, setIsDataFilled] = useState(false)

  const cartCtx = useContext(CartContext)
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`
  const hastItems = cartCtx.items.length > 0
  const [orderData, setOrderData] = useState(null)

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 })
  }
  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  const orderHandler = () => {
    setIsCheckOut(true)
  }
  const getRes = (res) => {
    console.log('Data submitted!!', res);
    setIsCheckOut(false)
    setIsDataFilled(false)
    cartCtx.clearCart()

  }
  const onSubmitmHandler = (userData) => {
    if (userData) {
      setOrderData(userData)
      setIsDataFilled(true)
    }
  }
  const { error, loading } = useAxios({
    method: 'post',
    url: 'orders.json',
    data: { orderData, OrderItems: cartCtx.items },
  }, getRes, isDataFilled)

  const cartItems =
    <ul className={classes['cart-items']}> {cartCtx.items.map(item => (
      <CartItem
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
      />
    ))}
    </ul>

  const modalAction =
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hastItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

  const showFeedBack = error ? <Modal>{error.message}</Modal> : loading ? <Modal><Spinner /></Modal> : <p>Order Sent Successfully </p>
  return (
    <Modal onClick={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckOut && <Checkout onConfirm={onSubmitmHandler} onClose={props.onClose} />}
      {!isCheckOut && modalAction}
      {showFeedBack}
    </Modal>
  )
}

export default Cart
