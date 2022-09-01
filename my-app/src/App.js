
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Register from './Pages/Register/Register';
import Details from './Pages/Details/Details';
import Edit from './Components/Navbar/Edit/Edit';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
        <Route path="/register" element={<Register/>}/>

      <Route path="/view/:id" element={<Details/>}/>

      <Route path="/edit/:id" element={<Edit/>}/>

      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App;
