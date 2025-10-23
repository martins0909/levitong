import { NavLink } from "react-router-dom"
import { assets } from "../../assets/assets"

const Sidebar = () => {
  return (
    <div className='flex flex-col border-r border-gray-200 min-h-full pt-6'>
        
        <NavLink end={true} to='/admin' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.home_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Dashboard</p>
        </NavLink>

        <NavLink to='/admin/addBlog' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.add_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Add Blogs</p>
        </NavLink>

        <NavLink to='/admin/ListBlog' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.List_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Blog List</p>
        </NavLink>

        <NavLink to='/admin/comment' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.comment_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Comments</p>
        </NavLink>

        <NavLink to='/admin/Subscribers' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.comment_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Subscribers</p>
        </NavLink>

        <NavLink to='/admin/users' 
          className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 
          md:min-w-4 w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <img src={assets.user_icon} alt="" className='min-w-4 w-5'/>
            <p className='hidden md:inline-block'>Users</p>
        </NavLink>

    </div>
  )
}

export default Sidebar
