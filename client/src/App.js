import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Route,Routes } from "react-router-dom";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import UserDashbord from "./pages/user/UserDashbord";
import AdminDashbord from "./pages/admin/AdminDashbord";
import CreateCollection from "./pages/admin/CreateCollection";
import CreateProducts from "./pages/admin/CreateProducts";
import Users from "./pages/admin/Users";
import Layout from "./components/Layout";
import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import Products from "./pages/admin/Products";



function App() {
  return (
       <Routes>
       <Route path="/" element={<Layout/>}>
       <Route index element={<Home/>}/>
       <Route path="collection" element={<Collection/>}/>
       <Route path="login" element={<Login/>}/>
       <Route path="signup" element={<Signup/>}/>

       <Route path="user" element={<UserLayout/>}>
          <Route index element={<UserDashbord/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="orders" element={<Orders/>}/>
       </Route>

       <Route path="admin" element={<AdminLayout/>}>
       <Route index element={<AdminDashbord/>}/>
       <Route path="create-collection" element={<CreateCollection/>}/>
       <Route path="create-products" element={<CreateProducts/>}/>
       <Route path="users" element={<Users/>}/>
       <Route path="products" element={<Products/>}/>

       </Route>

       </Route>


      

       </Routes>   


  );
}

export default App;

/*
 <Route  path="/" element={<Home/>}/>
       
       <Route  path="/collection" element={<Collection/>}/>
       <Route  path="/login" element={<Login/>}/>
       <Route  path="/signup" element={<Signup/>}/>

     
       <Route path="/dashboard" element={<UserRoute />}>
       
       <Route path="user" element={<UserDashbord />} />
       <Route path="user/profile" element={<Profile />} />
       <Route path="user/orders" element={<Orders />} />

     </Route>
     <Route path="/dashbord" element={<AdminRoute/>}>
     <Route path="admin" element={<AdminDashbord/>}/>
     <Route path="admin/create-collection" element={<CreateCollection/>}/>
     <Route path="admin/create-product" element={<CreateProducts/>}/>
     <Route path="admin/users" element={<Users/>}/>
     </Route>
*/
