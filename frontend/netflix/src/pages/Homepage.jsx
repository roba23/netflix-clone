import { Navigation } from "../components/Navigation.jsx"
import { useEffect , useState, useRef} from "react"

import Footer from "../components/Footer.jsx"
import "../App.css"
import data from "./data.js"
import Card from "../components/Card.jsx"
import InfoCard from "../components/InfoCard.jsx"
import Questions from "../components/Questions.jsx"
export function Homepage(prop){
    let  elements = data.map((elem,index)=>{
        return <Questions key={elem.id} title={elem.title} paragraph={elem.paragraph} />
    })
    const scrollRef = useRef(null)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    
    const checkScrollPosition = ()=>{
        if(scrollRef.current){
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current
            console.log("scrollLeft:",scrollLeft, " scroll Width:",scrollWidth," clientWidth: ", clientWidth)
            setCanScrollLeft(scrollLeft > 5)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
        }
    }
    useEffect(()=>{
        checkScrollPosition()
        window.addEventListener('resize', checkScrollPosition)
        return ()=>window.removeEventListener('resize', checkScrollPosition)
    }, [])

    const scroll = (offset) =>{
        if(scrollRef.current){
            scrollRef.current.scrollBy({left: offset, behavior: 'smooth'})
        }
    }
    return(
        <>
        
        <main className={`
            flex
            flex-col
            w-[100%]
            
          
            `}>
            <div className={`
                w-[100%] 
                h-[100vh]  
                mt-[-70px]
                lg:mt-[-70px]
                p-0 
                m-0 
                z-10  
                absolute
                bg-cover 
                bg-center 
                bg-[radial-gradient(rgba(0,0,0,0.6)70%,rgba(0,0,0,0.5))]
                flex
                justify-center
                items-center
                border
                pl-[15vw]
                pr-[15vw]
                
                
                
            `}>
                <form className={`
                text-white 
                
                lg:w-[588px] 
                z-20
                flex 
                flex-col
                flex-wrap
                justify-start
                items-center
                pl-[15px]
                pr-[15px]
                text-center
                gap-[2vh]
            `}>
                <h1 className={`
                    text-white 
                    text-[40px]
                    lg:text-[50px]
                    font-bold
                    
                    `}>Entertainment for every moment</h1>
                
                <h3 className={`
                    lg:font-bold
                    lg:text-[18px]
                    font-extrabold
                    `}>Disclaimer.</h3>
                <h3 className={`
                    lg:text-[18px]
                    font-bold
                    text-[16px]
                    `}>This is a non-commercial, personal portfolio project built purely for educational purposes. This website is not affiliated with, authorized, or endorsed by Netflix. No real user data or payment information is processed or stored</h3>
                <div className={`
                    flex
                    w-[100%]
                    gap-[1vw]
                   
                  
                `}
                >
                    <div className={`
                        input-group  
                         w-[60%] 
                         lg:w-[70%]   
                         border
                         border-[rgb(95,95,95)]
                         rounded-lg              
                        `}>
                        <input className={`
                          w-[100%]
                           
                            bg-cover 
                            bg-[rgba(28,18,19,0.8)]
                            
                            h-[50px] b-1
                            rounded-lg
                            
                        `}
                         type="email" id="email" placeholder= " " required />
                        <label htmlFor="email">Email address</label>   
                    </div>
                    <button className={`
                        bg-[rgb(255,255,255)]
                        hover:bg-[rgb(230,230,230)]
                        text-black
                        font-bold
                        font-sans
                        w-[40%]
                        rounded-lg
                        `}>Get Started</button>
                
                        
                </div>
                
                </form>

            </div>
            <img className="overflow-hidden mt-[-70px] lg:mt-[-68px] relative z-0 top-0 left-0 w-[100%] h-[100vh] object-cover" src="https://res.cloudinary.com/n4ucymig/image/upload/v1792136560/main_image.jpg" 
                srcSet="https://res.cloudinary.com/n4ucymig/image/upload/v1792136559/image1.jpg 2000w,
                https://res.cloudinary.com/n4ucymig/image/upload/v1792136559/image2.jpg 1279w,
                https://res.cloudinary.com/n4ucymig/image/upload/v1792136558/image3.jpg 959w"/>
            

            
                

            
            
                
                <div className="curve-container ">
                        <div className="curve"></div>
                    </div>
                   
                <div className={`
                    lg:pl-[150px]
                    
                    lg:pr-[150px]
                    pl-[5vw] 
                    pr-[5vw]
                    md:pl-[96px]
                    md:pr-[96px]
                    w-full
                    pt-[10px]
                    mt-[-30px]
                    z-10
                    relative
                    `}>
                    <div className={`
                        pt-[50px]
                        pb-[50px]`}>
                        <p className={`
                        text-white
                        text-[20px]
                        font-semibold
                        md:text-[30px]
                        mb-[20px]
                        mt-[-18px]

                        `}>Trending Now</p>
                        <div className={`
                            flex
                            relative
                            items-center
                            gap-[1vw]
                            `}>
                            <button
                            onClick={()=>scroll(-500)}
                             className={`
                             text-white
                             h-[80px]
                                w-[30px]
                                rounded-lg
                                hover:bg-[rgb(26,26,26)]
                                bg-[rgb(35,35,35)]
                                ${!canScrollLeft ? 'opacity-0 pointer-events-none': 'opacity-100'}
                             `}>{"<"}</button>
                             <div id="movies-container"
                             ref={scrollRef} 
                             onScroll={checkScrollPosition}
                             className={`
                        flex
                        pl-[20px]
                        lg:pl-[40px]
                        overflow-x-hidden
                        overflow-y-hidden
                        gap-[3vw]
                        scroll-sooth 
                        w-full
                        
                        
                        `}>
                            <Card imgUrl="https://thumb.wikimedia.org/wikipedia/en/thumb/7/73/Below_%282026%29_poster.jpg/250px-Below_%282026%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail" num={1}/>
                            <Card imgUrl="https://upload.wikimedia.org/wikipedia/en/6/6b/Beauty_in_Black_%28TV_series%29.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled" num={2} />   
                            <Card imgUrl="https://upload.wikimedia.org/wikipedia/en/8/8d/72_Hours_%282026%29_poster.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled" num={3} />
                            <Card imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk168L4pV88hjQlaiFrNjVMJoDiCJx9FDzNBZRbV5UMIAaIlkov5VZLho&s=10" num={4} />
                            <Card imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRaEw2seUkCUvnhnY0OkYcywjDDOTd1U4EmqWA7_1XZ4yEIRORON8IgwKD&s=10" num={5} />
                            <Card imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU3z4B_R8A-6cKsFFRHDYqrFVIAJlENT6kSMjgTfZLdM4qANe_9t0VjAc&s=10" num={6} />
                            <Card imgUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7IEjgJdbUQbJB5J3U3WVKRR_9V14NFmrC3Uq425mKRR0sHqDaKZeaqJdi&s=10" num={7} />
                        </div>
                            <button
                            onClick={()=> scroll(500)}
                            disabled={!canScrollRight}
                             className={`text-white 
                                h-[80px]
                                w-[30px]
                                rounded-lg
                                hover:bg-[rgb(26,26,26)]
                                ${!canScrollRight ? 'opacity-0 pointer-events-none': 'opacity-100'}
                                bg-[rgb(35,35,35)]
                             `}>{">"}</button>
                            
                        </div>
                       
                     
                    </div>
                     <p className={`
                     text-white 
                     text-[20px] 
                     font-semibold
                     md:text-[30px]
                     mb-[2vh]
                     `}>More Reasons to Join</p>
                    {/*the container for the info cards */}
                    <div className={`
                        flex
                        flex-row
                        max-md:flex-col
                        gap-[10px]
                        justify-between
                        lg:h-[308px]
                        flex-wrap
                       
                        `}>
                       
                        <InfoCard 
                        header="Enjoy on your TV"
                        text="Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more."
                        imgUrl="https://res.cloudinary.com/n4ucymig/image/upload/v1792136560/tv.svg"
                         />
                          <InfoCard 
                        header="Download your shows to watch offline"
                        text="Save your favorites easily and always have something to watch."
                        imgUrl="https://res.cloudinary.com/n4ucymig/image/upload/v1792136557/download.svg"
                         />
                         <InfoCard 
                        header="Watch everywhere"
                        text="Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV."
                        imgUrl="https://res.cloudinary.com/n4ucymig/image/upload/v1792136559/telescope.svg"
                         />
                         <InfoCard 
                        header="Create profiles for kids"
                        text="Send kids on adventures with their favorite characters in a space made just for them — free with your membership."
                        imgUrl="https://res.cloudinary.com/n4ucymig/image/upload/v1792136559/profile.svg"
                         />
                    </div>
                    <div className={`
                    mt-[6vh]
                    flex
                    flex-col
                    gap-[1vh]
                    
                    
                    `}>
                        <p className={`
                        mb-[2vh]
                        text-white
                        text-[20px]
                        font-semibold
                        md:text-[30px]
                        `}>Frequently Asked Questions</p>
                        {elements}
                            <div className={`
                                text-white
                                
                            `}>
                                <p className={`
                                    lg:pl-[10%]
                                    lg:pr-[10%]
                                    text-[17px]
                                    mt-[10px]
                                    mb-[10px]
                                    text-center
                                    `}>Ready to Watch? Enter your email to create or restart our membership</p>
                                <div className={`
                                flex
                                justify-center
                                gap-[1%]
                                h-[56px]
                                
                                `}>
                                    <div className={`
                                input-group
                                w-[70%]
                                
                                lg:w-[50%]
                                text-[rgb(255,0,0)]
                                
                                `}>
                                    <input className={`
                                    border-1
                                    border-[rgb(95,95,95)]
                                    bg-[rgb(15,15,15)]
                                    w-full
                                    flex
                                    rounded-sm
                                    
                                        `} type="email" placeholder=" "/>
                                    <label>Email address</label>
                                </div>
                                <button className={`
                                    bg-white
                                    hover:bg-[rgb(230,230,230)]
                                    text-black
                                    font-semibold
                                    p-2
                                    lg:w-[20%]
                                    w-[35%]
                                    text-[25px]
                                    rounded-lg

                                    `}>Get Started</button>

                                </div>
                                 
                            </div>
                           
                        </div>
                      

                    
                </div>            
                <div className={`
                    
                   mt-[2vh]
                    pl-[10vw]
                    w-full
                    pt-2
                    pb-5
                `} >
                <p className={`
                    text-white
                    `}>DISCLAIMER: This is a non-commercial, personal portfolio project built purely for educational purposes. This website is not affiliated with, authorized, or endorsed by Netflix. No real user data or payment information is processed or stored</p>
                
                 <p className={`
                 text-white
              `}>Questions? Call 0800 861 997 (Toll-Free)</p>
                <Footer />
                </div>
                  
          
                    
        </main>
        
        </>
    )
}