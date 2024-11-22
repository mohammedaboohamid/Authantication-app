```jsx

    <div className="flex gap-6">
         <NavLink to="/">Home</NavLink>
        

        {
            auth.user? (
                <div>
                <NavLink to="/collection">Collection</NavLink>
                 <NavLink onClick={handleLogout} to="/logout">Logout</NavLink>
                </div>

            ): (
                <div>
                 <NavLink to="/login">Login</NavLink>
                 <NavLink to="/signup">Signup</NavLink>
                </div>
            )
        }
        
          
        
        

    </div>


```