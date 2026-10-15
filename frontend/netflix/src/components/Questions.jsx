import React from "react"
export default function Questions(prop){
    const [show, setshow] = React.useState(false)
    function showMore(){
        setshow(prevValue => !prevValue)
    }
    const pElements = prop.paragraph.map((elem,index) => <p key={index} className={`
        text-[18px]
        lg:text-[25px] `}>{elem}</p>)
    
    return(
        <div className={`
           
            w-full
            text-white
            text-[20px]
            lg:text-[25px]
            
            flex
            flex-col
            justify-between
            items-center
            gap-[1px]
            
            
            
        `}>
            <div 
    className={`
        flex
        w-full
        justify-between
        items-center
        px-[16px]
        bg-[rgb(45,45,45)]
        hover:bg-[rgb(65,65,65)]
        h-[72px]
        cursor-pointer
    `}
    onClick={showMore}
>
    <p>{prop.title}</p>
    <p className={`
        text-[60px]
        font-[100]
        transition-transform 
        duration-300 
        ease-in-out
        ${show ? '-rotate-45' : 'rotate-0'}
    `}>+</p>
</div>

{/* Accordion Body with Smooth Height Animation */}
<div className={`
    grid 
    transition-all 
    duration-300 
    ease-in-out
    ${show ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
`}>
    <div className="overflow-hidden">
        <div className={`
            flex
            flex-col
            bg-[rgb(45,45,45)]
            w-full
            p-[16px]
            gap-[2vh]
            relative
        `}>
            {pElements}
        </div>
    </div>
</div>
            
        </div>
    )
}