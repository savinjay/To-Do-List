import Home from './Component/Home';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Home/>
      <Routes>
        <Route path="" element />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
