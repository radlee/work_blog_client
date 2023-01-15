import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./components/ProtectedRoute";
import { useSelector } from "react-redux";
import Loader from './components/Loader';
import AddEditBlog from "./pages/AddEditBlog";

function App() {
  const { loading } = useSelector(state => state.loadersReducer);
  return (
    <div>
      {loading && <Loader />}
      <Toaster position="top-center" reverseOrder={false}/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <ProtectedRoute><Home /></ProtectedRoute> } />
          <Route path='/add-blog' element={ <ProtectedRoute><AddEditBlog /></ProtectedRoute> } />
          <Route path='/edit-blog/:id' element={ <ProtectedRoute><AddEditBlog /></ProtectedRoute> } />
          <Route path='/login' element={ <Login />} />
          <Route path='/register' element={ <Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
