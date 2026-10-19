import '../App.css'
import React from 'react'
import {Link} from 'react-router-dom'
export default function Card(prop){
    const [showMore, setShowMore] = React.useState(false)

    function clickHandler(){
        console.log("clicked the movie card")
        setShowMore(prevValue => !prevValue)
    }
    
    return(
        <div>
         <div className={`
            relative  
            w-[112px]
            h-[156px]
            md:w-[140px]
            md:h-[196px]
            lg:w-[180px]
            lg:h-[220px]
            
            transition-transform duration-300 ease-out 
            hover:scale-105
            shrink-0
           
            
        `}
        onClick={clickHandler}
        >
            <p className={`
            absolute 
            text-[60px] 
            md:text-[90px]
            md:mt-[60%]
            mt-[70%] 
            ml-[-15%] 
            font-extrabold  
            text 
            lg:text-[120px]
            lg:mt-[35%]
            z-20
            [-webkit-text-stroke:2px_white]
            `}>{prop.num}</p>
            <p className={`
                absolute 
                text-[rgb(206,13,20)] 
                font-extrabold 
                z-20 
                text-[25px] 
                top-[-5px] 
                left-0`}>R</p>
            <img className={`
                w-full
                h-full
                object-cover
                rounded-lg
                
                `} src={prop.imgUrl} />
            
        </div>
        {showMore &&
            <div className={`
                absolute
                bg-[rgba(0,0,0,0.7)]
                w-[100%]
                text-white
                z-40
                top-0
                left-0
                
                pt-[10vh]
                pb-[10vh]
                flex
                justify-center
                
            `}
            
            >
               <div className={`
                    w-[90%]
                    min-h-[50vh]
                    h-[100%]
                    bg-[rgb(0,0,0))]
                    z-40
                    grid-template-rows-[3]
                    p-3
                    rounded-lg
                    
                    border-yellow-500
                    `}
                    

                    >
                    <button onClick={clickHandler}>X</button>
                    <img className={`
                        w-[100%]
                        h-[30vh]
                        
                        object-contain
                        `} src={prop.imgUrl} />
                    <p className={`
                    text-[50px]
                    font-extrabold
                    
                    `}>{prop.title}</p>
                    <p className={`
                        text-white
                    `}>{prop.description}</p>
                    <Link to="/login">
                        <button className={`
                    bg-[rgb(230,0,0)]
                    p-2
                    rounded-lg
                    hover:scale-95
                    transition-all
                    duration-300s
                    ease-out
                    mt-2
                    
                    `}>Get Started</button>
                    </Link>
                    
                </div>
            </div>
        }
        </div>
       
    )
}