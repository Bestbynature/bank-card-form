import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Card = () => {

  const { front, CN, holder, month, year, CVV, focused } = useSelector((store) => store.card)
const { value } = focused
  useEffect(() => {
    const cardNumber = document.querySelector('.card-number');
    const cardHolder = document.querySelector('.holder');
    const cardExpiry = document.querySelector('.expiry');
    const cardCVV = document.querySelector('.cvv');
    
    const elementsMap = {
      1: cardNumber,
      2: cardHolder,
      3: cardExpiry,
      4: cardCVV,
    };
  
    const element = elementsMap[value];
  
    if (element) {
      document.querySelectorAll('.focused').forEach((el) => {
        el.classList.remove('focused');
      });
      element.classList.add('focused');
    }
  
    const updateCardNumber = () => {
      if (!CN) return;
      for (let i = 0; i < 4; i++) {
        const partElements = document.getElementsByClassName('part' + (i + 1));
        if (partElements[0]) {
          const partValue = front ? CN.slice(i * 4, (i + 1) * 4) : '';
          if(i ===1 || i === 2) partElements[0].innerHTML = partValue.replace(/\d/g, '*');
          else partElements[0].innerHTML = partValue;
        }
      }
    };

    updateCardNumber();
  }, [CN, front, value]);

  return (
    <div>
        {front? <div className='card-box1'>
        <div className='card-number'>
          <div className="part1"></div>
          <div className="part2"></div>
          <div className="part3"></div>
          <div className="part4"></div>
        </div>
        <div className='holder-line'>
          <div className='holder'><p>{holder}</p></div>
          {month? <div className='expiry'><p>{month}/{year}</p></div> :
          <div className='expiry'><p>MM/YY</p> </div>}
        </div>
      </div>
      : 
      <div className='card-box2'>
        <div className="cvv"><p>{CVV}</p></div>
        </div>}
    </div>
  )
}

export default Card