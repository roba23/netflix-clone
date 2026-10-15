import { Navigation } from "./components/Navigation.jsx"
import {Routes,Route, useLocation} from "react-router-dom"
import { Homepage } from "./pages/Homepage.jsx"
import LogIn from "./pages/LogIn.jsx"
import Subscribed from "./pages/Subscribed.jsx"
import Movies from "./pages/Movies.jsx"
import React from "react"
export default function App(){
  const location = useLocation();
  const theRoute = location.pathname
  const [user, setUser] = React.useState(null)
  
  return(
    <div>
      <Navigation where={theRoute}  user={user} func={setUser}/>
      <Routes>
        <Route path="/" element={<Homepage func={setUser}/>} />
        <Route path="/login" element={<LogIn func={setUser} />}/>
        <Route path="/subscribed" element={<Subscribed />} />
        <Route path="/movies" element={<Movies user={user} />} />
      </Routes>
    </div>

  )

}
