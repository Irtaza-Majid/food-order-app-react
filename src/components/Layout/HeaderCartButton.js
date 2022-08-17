import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cart-context'
import CartIcon from './CartIcon'

import classes from './HeaderCartButton.module.css'


const HeaderCartButton = (props) => {

  const [heighlighted, setHeighlighted] = useState(false)
  const cartCtx = useContext(CartContext);

  const cartItems = cartCtx.items.reduce((currentNum, item) => {
    return currentNum + item.amount
  }, 0)
  const btnClasses = `${classes.button} ${heighlighted ? classes.bump : ''}`

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return
    }
    setHeighlighted(true)

    const timer = setTimeout(() => {
      setHeighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [cartCtx.items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {cartItems}
      </span>
    </button>
  )
}

export default HeaderCartButton
