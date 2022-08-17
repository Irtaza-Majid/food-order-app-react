import React from 'react'
import useInpt from '../../hooks/useInput'
import classes from './Checkout.module.css'
import { nameIsVlaid, postalIsVlaid, cityIsVlaid } from '../../Utils.js'

const Checkout = (props) => {

  const {
    value: name,
    hasError: nameInputHasError,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInpt(nameIsVlaid);

  const {
    value: postal,
    hasError: postalInputHasError,
    isValid: enteredPostalIsValid,
    reset: resetPostalInput,
    valueChangeHandler: postalChangedHandler,
    inputBlurHandler: postalBlurHandler,
  } = useInpt(postalIsVlaid);
  const {
    value: city,
    hasError: cityInputHasError,
    isValid: enteredCityIsValid,
    reset: resetCityInput,
    valueChangeHandler: cityChangedHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInpt(cityIsVlaid);

  const formIsValid = enteredNameIsValid && enteredPostalIsValid && enteredCityIsValid

  const onConfirmHandler = (e) => {
    e.preventDefault()
    if (!formIsValid) {
      return
    }
    props.onConfirm({
      name, postal, city
    })
    resetNameInput()
    resetPostalInput()
    resetCityInput()
  }
  return (
    <form className={classes.form} onSubmit={onConfirmHandler}>
      <div className={`${classes.control} ${nameInputHasError ? classes.invalid : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameChangedHandler}
          onBlur={nameBlurHandler}
          value={name}
        />
        {nameInputHasError && (
          <p className={classes.errortext}>Please Enter Valid Name.</p>
        )}
      </div>

      <div className={`${classes.control} ${postalInputHasError ? classes.invalid : ''}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input
          type='text'
          id='postal'
          onChange={postalChangedHandler}
          onBlur={postalBlurHandler}
          value={postal}
        />
        {postalInputHasError && (
          <p className={classes.errortext}>Please Enter Valid Postal Address.</p>
        )}
      </div>
      <div className={`${classes.control} ${cityInputHasError ? classes.invalid : ''}`}>
        <label htmlFor='city'>City</label>
        <input
          type='text'
          id='city'
          onChange={cityChangedHandler}
          onBlur={cityBlurHandler}
          value={city}
        />
        {cityInputHasError && (
          <p className={classes.errortext}>Please Enter Valid City Name.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onClose}>
          Cancel
        </button>
        <button type='submit' className={classes.submit} disabled={!formIsValid}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
