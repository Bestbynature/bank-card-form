import Form from './Form';
import Card from './Card';
import { Link } from 'react-router-dom';


const Home = () => {
  document.title = 'Home';
  return (
    <>
        <Card />
        <Form />
        <Link to='/list' className='list-link'>Card List</Link>
    </>
  )
}

export default Home