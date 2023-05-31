import './components/styles.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Success from './components/Success';
import List from './components/List';


const App = () => {
  
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/success" element={<Success />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </div>
  )
}

export default App