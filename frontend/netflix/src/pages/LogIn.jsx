import '../App.css'
import {Link, useNavigate} from "react-router-dom"
import {useState} from 'react'
import Footer from '../components/Footer.jsx'
export default function LogIn(prop){
  const [helpVisible, sethelpVisible] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  function showHelp(){
    sethelpVisible(prevValue => !prevValue)

  }
  const navigate = useNavigate()

async function registerHandler(formData){
    const result = Object.fromEntries(formData)
    
    
    if(result.password != result.confirmPassword){
        
        return
    }
    try{
      
      const response = await fetch(`/api/user/register`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result)
      });
      
      if(response.ok){
        const data = await response.json();
        
        prop.func(data)
        navigate("/")

      }
      else{
        console.error('Server error:', response.statusText)
      }
    }
    catch(error){
      console.error("Network error:", error)
    }

  }


  async function logInHandler(formData){
    const result = Object.fromEntries(formData)
  
    try{
      const response = await fetch(`/api/user/login`,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
        credentials: "include"
      });
      if(response.ok){
        const data = await response.json();
        
       prop.func(data)
        navigate("/movies")
      }
      else{
        console.error('Server error:', response.statusText);
      }
    }
    catch(error){
      console.error("Network error:", error);
    }

  }
  function toogleLogin(){
    setIsLogin(prevValue => !prevValue)
  }
  return(
    <main className={`
      flex
      flex-col
    `}>
      <div className={`
      
      flex
      justify-center
      
      text-white
      `}>
      <hr className={`
        mt-[20px]
        absolute
        h-[1px]
        w-[100%]
        z-30
        bg-[rgb(76,41,43)]
        border-none
        `}/>
      <div className={`
      w-[100%]
      min-h-[100vh]
     
      bg-[linear-gradient(180deg,rgb(67,21,24),rgb(0,0,0))]
      mt-[-68px]
      lg:mt-[-65px]
      z-0
      flex
      justify-center
      
      
      `}>
        <form action={isLogin ? logInHandler : registerHandler} className={`
        text-white
        absolute
        top-[10vh]
        z-20
        w-[440px]
        mt-[10vh]
        `}>
        <div>
          <h1 className={`
            font-bold
            text-[32px]
            `}>Enter your info to {!isLogin ? "Register": "sign In"}</h1>
        {isLogin && <p className={`
            text-[rgb(171,183,184)]
            text-[20px]
            mb-[2vh]
          `}>Or get started with a new account.</p>
        }
        </div>
         
        <div className="input-group">
             <input className={`
             w-[100%]
             h-[56px]
             bg-[rgb(28,18,19)]
             border-1
             border-[rgb(64,57,57)]
             rounded-md
             mb-[2vh]
             `}
             type="email" id="email" name="email" placeholder= " " required />
              <label htmlFor="email">Enter your Email</label>
        </div>
        <div className="input-group">
             <input className={`
             w-[100%]
             h-[56px]
             bg-[rgb(28,18,19)]
             border-1
             border-[rgb(64,57,57)]
             rounded-lg
             mb-[2vh]
             `} type="password" id="password" name="password" placeholder= " " required />
              <label htmlFor="password">Enter password</label>
        </div>
        {!isLogin &&
        <>
        <div className="input-group">
             <input className={`
             w-[100%]
             h-[56px]
             bg-[rgb(28,18,19)]
             border-1
             border-[rgb(64,57,57)]
             rounded-lg
             mb-[2vh]
             `} type="password" id="confirmPassword" name="confirmPassword" placeholder= " " required />
              <label htmlFor="confirmPassword">Confirm password</label>
        </div>
        <div className="input-group">
             <input className={`
             w-[100%]
             h-[56px]
             bg-[rgb(28,18,19)]
             border-1
             border-[rgb(64,57,57)]
             rounded-lg
             mb-[2vh]
             `} type="text" id="username" name="username" placeholder= " " required />
              <label htmlFor="username">User name</label>
        </div>
        <div className="input-group">
             <input className={`
             w-[100%]
             h-[56px]
             bg-[rgb(28,18,19)]
             border-1
             border-[rgb(64,57,57)]
             rounded-lg
             mb-[2vh]
             `} type="date" id="birthDate" name="birthDate" placeholder= " " required />
              <label htmlFor="birthDate">Birth Date</label>
        </div>
        </>
        
        
        }
        <button  type="submit" className={`
          w-[100%]
          h-[7vh]
          bg-[rgb(229,9,20)]
          hover:bg-[rgb(193,17,25)]
          font-semibold
          text-[20px]
          button
          `} 
        >{isLogin ? "Continue" : "Register"}</button>
        <div className={`
      mt-[30px]
     
      flex
      items-center
      align-center
      text-[20px]
      padding-2
      cursor-pointer
      `}
      onClick={showHelp}
      >
        <p>Get Help</p>
        <button
        className={`
          text-[20px]
           ${
                   helpVisible     ? '-rotate-180' : 'rotate-0'
                    }`}
        >^</button>
        
      </div>
      {helpVisible && 
       <div className={`
          underline
          grid 
          transition-all
          duration-300
          ease-in-out
          `}>
        
        <p>Forgot email or mobiel number?</p>
        <p>Learn more about sign-in</p>
      </div>
      }
        
        <p className={`
        underline
        `}
        onClick={toogleLogin}
        >{isLogin ? "Register" : "LogIn"}</p>     
        
        <p className={`
          text-[rgb(159,159,159)]
          text-[13px]
          `}>This page is protected by Google reCAPTCHA to ensure you're not a bot.</p>
        
      </form>
      
      </div>
       
    </div>
    <div className={`
      pl-[5vw]
      pr-[5vw]
      lg:pl-[9vw]
      bg-[rgb(22,22,22)]
      pt-[30px]
      pb-[30px]
      text-[rgb(159,159,159)] 
      `}>
      <p className={`
        
        
      `}>Questions? Call 0800 861 997 (Toll-Free)</p>
      <Footer />
     
    </div>
    </main>
    
    
  )
}

