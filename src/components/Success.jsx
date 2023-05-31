import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetCard, setTime } from '../redux/card/cardSlice';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { time } = useSelector((store) => store.card);

  useEffect(() => {
   const interval = setInterval(() => {
      if(time === 1){
        dispatch(resetCard())
        navigate('/')
      }
      else {dispatch(setTime())}
    }, 1000)

    return () => {
      clearInterval(interval);
    };

  }, [time, dispatch, navigate])

  return (
    <div className="success">
      <h1>Congratulations!</h1>
      <h3>Your card registration was successful</h3>
      <p>You will be redirected in {time} seconds</p>
    </div>
  )
}

export default Success