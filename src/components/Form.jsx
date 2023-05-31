import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { switcher, handleFocus, setCVV, setCN, setHolder, setHolder2, setMonth, setYear } from '../redux/card/cardSlice';

const Form = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const { CN, holder2, CVV, month, year } = useSelector((store) => store.card)

    const handleSubmit = (e) => {
      e.preventDefault();
      const errorDiv = document.querySelector('.error');
      errorDiv.innerHTML = '';
      if(CN.length !== 16){
        errorDiv.innerHTML = 'Invalid card number';
        return;
      }else if(month === 'Month' || year === 'Year' || !month || !year){
        errorDiv.innerHTML = 'Invalid expiry date. Please select month and year';
        return;
      }else if(CVV.length !== 3){
        errorDiv.innerHTML = 'Invalid CVV';
        return;
      }else{
        navigate('/success');
        }
    }

  return (
    <>
    <form onSubmit={(e)=>handleSubmit(e)}>
        <label htmlFor="1">Card Number</label>
        <input
  type='text'
  placeholder='Card Number'
  id='1'
  required
  onChange={(e) => {
    const formattedValue = e.target.value.replace(/\s/g, '');
    dispatch(setCN(formattedValue));
  }}
  onKeyDown={(e) => {
    if (e.key === 'Backspace') {
      const cursorPosition = e.target.selectionStart;
      const previousChar = e.target.value[cursorPosition - 1];
      if (previousChar === ' ') {
        e.preventDefault();
        e.target.setSelectionRange(cursorPosition - 2, cursorPosition - 2);
      }
    }
  }}
  maxLength={19}
  value={CN === '################' ? '' : CN.replace(/\s/g, '').replace(/(\d{4}(?=\d))/g, '$1 ')}
  onFocus={()=>dispatch(handleFocus(1))}
  onBlur={()=>dispatch(handleFocus(0))}
/>

        <label htmlFor="2">Card Holder</label>
        <input type='text' placeholder='Card Holder' id='2' required 
        onChange={(e)=>dispatch(setHolder(e.target.value))}
        onBlur={(e)=>dispatch(setHolder2(e.target.value))}
        value={holder2 === "Cardholder's name"? '' : holder2}
        onFocus={()=>dispatch(handleFocus(2))}
        maxLength={22}
       />

        <div className='grid'>
        <label htmlFor="3">Expiration Date</label>
        <label htmlFor="4">&nbsp;</label>
        <label htmlFor="5">CVV</label>
        <select id='3' name='months' 
        required
        onChange={(e)=>dispatch(setMonth(e.target.value))}
        onFocus={()=>dispatch(handleFocus(3))}
        onBlur={()=>dispatch(handleFocus(0))}
        >
            <option value='01'>01</option>
            <option value='02'>02</option>
            <option value='03'>03</option>
            <option value='04'>04</option>
            <option value='05'>05</option>
            <option value='06'>06</option>
            <option value='07'>07</option>
            <option value='08'>08</option>
            <option value='09'>09</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
            <option value='12'>12</option>
            <option selected value='Month'>Month</option>
        </select>
            <select name="Year" id="4" 
            required
            onChange={(e)=>dispatch(setYear(e.target.value))}
            onFocus={()=>dispatch(handleFocus(3))}
            onBlur={()=>dispatch(handleFocus(0))}>
                <option value="16">2016</option>
                <option value="17">2017</option>
                <option value="18">2018</option>
                <option value="19">2019</option>
                <option value="20">2020</option>
                <option value="21">2021</option>
                <option value="22">2022</option>
                <option value='23'>2023</option>
                <option value='24'>2024</option>
                <option value='25'>2025</option>
                <option value='26'>2026</option>
                <option value='27'>2027</option>
                <option value='28'>2028</option>
                <option value='29'>2029</option>
                <option value='30'>2030</option>
                <option selected value="Year">Year</option>
            </select>
            <input type="text" required id="5"
            onFocus={()=>dispatch(switcher(4))}
            onBlur={()=>dispatch(switcher())}
            maxLength={3}
            onChange={(e)=>dispatch(setCVV(e.target.value))}
            value={CVV}
            />
        </div>
       <input type="submit" value="Submit"/>
       <div className="error"></div>
    </form>
  </>
  )
}

export default Form