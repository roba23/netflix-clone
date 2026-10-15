import '../App.css'
export default function Card(prop){
    
    return(
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
            
            
        `}>
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
    )
}