export default function InfoCard(prop){
    return(
      
        <div className={`
              {/*this is for the card element it self*/}
            flex
            bg-[linear-gradient(135deg,rgb(26,33,69),rgb(32,18,32))]
            pt-[24px]
            pl-[16px]
            pr-[16px]
            w-full
            lg:w-[24%]
            md:w-[49%]
            rounded-xl
            text-white
           
            flex-col
            
            
            justify-between
            
            
           
        `}>
          <div className={`
                
                flex
                flex-col
               
                
                justify-start
            `}>
                <h1 className={`
                text-[25px]
                font-semibold
                 
                    `}>{prop.header}</h1>
                <p className={`
                    text-gray-300
                    
                    `}>{prop.text}</p>
            
            
            </div>
            <div className={`
                h-[full]
                flex
                justify-end
                items-end
               
               
                `}>
                <img className={`
                w-[80px]
                h-[80px]
                
                `}src={prop.imgUrl}/>

        </div>

        </div>
        
    )
}