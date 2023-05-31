import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { handleDelete } from '../redux/card/cardSlice';

const List = () => {
    const { card } = useSelector((store) => store.card);
    const dispatch = useDispatch();
    document.title = 'List of cards';
  return (
    <div className='list'>
        <Link to='/' className='list-link'>Back to Home</Link>
        <h1>Card List</h1>
        <div className="list-header">
            <div className='list-header-number'>Card Number</div>
            <div className='list-header-holder'>Card Holder</div>
            <div className='list-header-expiry'>Expiry Date</div>
            <div className='list-header-btn'>Action</div>
        </div>
        {card.length>0? (<div className='list-container'>
            {card.map((item) => (
                (
                <div className='list-item' key={uuidv4()}>
                    <div className='list-item-number'>{item.number}</div>
                    <div className='list-item-holder'>{item.name}</div>
                    <div className='list-item-expiry'>{item.month} / {item.year}</div>
                    <div><button className="list-item-btn"
                    onClick={()=>dispatch(handleDelete(item.id))}>Delete</button></div>
                </div>
                )))
            }
        </div>) : (
            <div className='error'>No card is registered at the monent, please click the Home button!</div>
        )}
    </div>
  )
}

export default List