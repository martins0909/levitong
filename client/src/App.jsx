import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';                     // ✅ Beautiful UI Blog (public)
import BlogDetails from './pages/BlogDetails';       // ✅ Admin blog details
import BblogDetails from './pages/BblogDetails';     // ✅ Tutorial blog details

import Layout from './pages/admin/Layout';
import Dashboard from './pages/admin/Dashboard';
import Addblog from './pages/admin/AddBlog';
import Listblog from './pages/admin/ListBlog';
import Comment from './pages/admin/Comment';
import Login from './components/admin/Login';
import Contact from "./pages/Contact";
import FAQ from './components/FAQ';
import About from "./pages/About";
import Services from "./pages/Services";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TrackOrder from "./components/TrackOrder";
import 'quill/dist/quill.snow.css';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Subscribers from './pages/admin/Subscribers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserList from './pages/admin/UserList';
import UserDashboard from './pages/UserDashboard';
import AdSense from './components/AdSense'; // Import AdSense component
import SEOControl from './components/SEOControl';

const App = () => {
    const { token } = useAppContext();

    return (
        <div>
            <Toaster />
            <SEOControl /> {/* Add SEO setup */}
            <AdSense /> {/* Load AdSense conditionally */}
      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} /> {/* ✅ Main blog list */}
        <Route path="/blog/:id" element={<Blog />} /> {/* ✅ Beautiful blog UI details */}
        <Route path="/bblog/:id" element={<BblogDetails />} /> {/* ✅ Tutorial blog details */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/track-order/:orderId" element={<TrackOrder />} />

        {/* 👤 User Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* 🔐 Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* 🛠️ Admin Routes (Protected) */}
        <Route path="/admin" element={token ? <Layout /> : <Login />}>
          <Route index element={<Dashboard />} />
          <Route path="addBlog" element={<Addblog />} />
          <Route path="listBlog" element={<Listblog />} />
          <Route path="comment" element={<Comment />} />
          <Route path="subscribers" element={<Subscribers />} />
          <Route path="users" element={<UserList />} />
        </Route>

        {/* 👤 User Dashboard */}
        <Route path="/userDashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
