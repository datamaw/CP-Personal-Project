import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

// pages
import HomePage from './pages/HomePage';
import KidMainPage from './pages/KidMainPage';
import AddWishItemPage from './pages/AddWishItem';
import CallBackPage from './pages/CallBackPage';

//router
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/cashandcandy" element={ <HomePage />} />
          <Route exact path="/cashandcandy/:childID" element={ <KidMainPage />} />
          <Route exact path="/cashandcandy/additem" element={ <AddWishItemPage />} />
          {/* <Route exact path="/cashandcandy/callback" element={ <CallBackPage/>} /> */}
        </Routes>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
