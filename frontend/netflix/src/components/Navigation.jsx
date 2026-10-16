import '../App.css'
import {Link, useNavigate} from "react-router-dom"

import React from 'react'
export function Navigation(prop){
    const [searchTerm, setSearchTerm] = React.useState("")
    const navigation = useNavigate()

    console.log("On navigation:",)
     React.useEffect(()=>{
        const userData = async () => {
        try{
            const response = await fetch(`/api/user/checkStatus`,
                {
                    method: "GET", 
                    credentials: "include"
                }
            );
            if(response.ok){
                const data = await response.json()
                console.log("data at navigation is:", data)
                if(data.success){
                    
                    prop.func(data)
                    navigation("/movies")
                }
               
                 
                
                
                
            }
             else{
                    prop.func({success: false, username: null, status: null})
                }
        }
        catch(error){
            console.error()
        }
    }
        userData();
    }, [prop.where])
    async function logout(){
        try{
        const response = await fetch(`/api/user/logout`)
        
        if(response.ok){
            const data = await response.json()
            console.log("data inside logout  is:", data)
            if(data.success){
                prop.func({success: false, username: null, status: null})
                navigation("/")
            }

        }
        }
        catch(error){
            console.error("error is:", error)
        }
        
    }
    function searchHandler(e){
        e.preventDefault();
        navigation(`/movies?search=${encodeURIComponent(searchTerm)}`)
    }

    return(
        <header className={`
           sticky
             
            pl-3 
            pr-5 
            w-[100%]
            h-[10vh]
            flex 
            flex-row 
            items-center
            justify-between 
            z-30
            lg:pl-[15%]
            lg:pr-[15%]
            
            
            `}>
            
            <Link to="/">
                <img className={`
                w-[100px] 
                h-[40px]
                lg:w-[150px]
                lg:h-[50px]
                `} src="https://res.cloudinary.com/n4ucymig/image/upload/v1792055871/logo.png" width="100px"/>
            </Link>
            
            {prop.where !== "/login" && (!prop.user  || !prop.user.success)  ?<Link to="/login">
                <button className={`
                    bg-[rgb(229,9,20)]
                    hover:bg-[rgb(193,17,25)]
                    p-2
                    z-30
                    rounded-sm
                    text-white
                    text-[14px]
                    font-semibold
                `}>Sign In</button>
            </Link> : ""}
            { (prop.user && prop.user.username) && 
            <div className={`
                flex
                justify-center
                items-center
                text-white
                gap-[10px]
                h-[100%]
            
                
            `}>
                <p>Tv Shows</p>
                <p>Movies</p>
                <div className={`
                   

                    `}>
                    <form onSubmit={searchHandler} className={`
                        flex
                        items-center
                        h-[50px]
                        `}>
                    <input className={`
                        bg-[rgb(25,25,25)]
                        border-1
                        border-[rgb(125,125,125)]
                        h-[50px]
                        p-1
                        rounded-lg
                        `} type="text" 
                        placeholder="artist, Title"
                        name="search"
                        value={searchTerm}
                        onChange={(e)=> setSearchTerm(e.target.value)}
                        />
                    
                    <button className={`
                        bg-white
                        ml-[8px]
                        w-[30px]
                        h-[30px]
                        rounded-lg
                        `}><img className={`
                            h-[25px]
                            object-cover
                        `} src="https://res.cloudinary.com/n4ucymig/image/upload/v1792136559/search.svg" 
                        type="submit"
                        /></button>
                </form>
                </div>
                
                <div className={`
                    flex
                    justify-center
                    items-center
                    `}>
                
                <span className="text-white z-30 mr-1 ">{prop.user.username ? prop.user.username: "undefiend"}</span>
        
                  <button className={`
                bg-[rgb(229,9,20)]
                    hover:bg-[rgb(193,17,25)]
                    p-2
                    rounded-sm
                    text-white
                    text-[14px]
                    
                    font-semibold
            `}
            onClick={logout}
            >Logout</button>

          
             </div>

            </div>
            
            }
           
            
            
        </header>
            
            
       
        
    
    )
}