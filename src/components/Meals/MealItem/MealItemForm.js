import React,{useRef,useState} from 'react'
import Input from '../../UI/Input'
import classes from './MealItemForm.module.css'


export default function MealItemForm(props) {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef()

 function submitHandler(e) {
     e.preventDefault()

     const enterdAmount = amountInputRef.current.value;
     const entredAmountNumber = +enterdAmount;
     if (enterdAmount.trim().length === 0 ||
         entredAmountNumber < 1 ||
         entredAmountNumber > 5) {
         setAmountIsValid(false)
         return;
     }
   props.onAddToCart(entredAmountNumber)
    };
    
    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <Input
                ref={amountInputRef}
                label="Amount" input={{
                id: 'amount',
                type: 'number',
                min:'1',
                max: '5',
                step: '1',
                defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}
