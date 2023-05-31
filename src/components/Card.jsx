import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Card = () => {

  const { front, CN, holder, month, year, CVV } = useSelector((store) => store.card)

  useEffect(() => {
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
  }, [CN, front]);

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
          <div className='holder'>{holder}</div>
          {month? <div className='expiry'>{month} / {year}</div> :
          <div className='expiry'>MM / YY</div>}
        </div>
      </div>
      : 
      <div className='card-box2'>
        <div className="cvv">{CVV}</div>
        </div>}
    </div>
  )
}

export default Card