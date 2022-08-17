import { useReducer } from "react"


import { INPUT, BLUR, RESET, INITIAL_INPUT_STATE } from "../Constant.js"

const inputSateReducer = (state, action) => {
  switch (action.type) {
    case INPUT:
      return { isTouched: state.isTouched, value: action.value }
    case BLUR:
      return { isTouched: true, value: state.value }
    case RESET:
      return { isTouched: false, value: '' }
    default:
      return INITIAL_INPUT_STATE
  }
}

const useInpt = (validateValue) => {
  const [inputState, dispatch] = useReducer(inputSateReducer, INITIAL_INPUT_STATE)


  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: 'BLUR' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};


export default useInpt
