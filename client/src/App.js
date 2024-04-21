import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBlogs from './pages/MyBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path='/' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/my-blogs' element={<MyBlogs />} />
        <Route path='/create-blogs' element={<CreateBlog />} />
        <Route path='/blog-details/:id' element={<BlogDetails />} />
      </Routes>
    </>


  );
}

export default App;
