import ('../App.css')
import React from 'react'
import Card from '../components/Card.jsx'
import Footer from "../components/Footer.jsx"
import {useSearchParams} from 'react-router-dom'
import {CircleLoader, PulseLoader} from 'react-spinners'
export default function Movies(prop){
    const [movies, setMovies] = React.useState([])
    const [paymentForm, setPaymentForm] = React.useState(false)
    const [isLoading, setisLoading] = React.useState(true)
    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get('search') || ''
    const [search, setSearch] = React.useState(searchQuery)
    
  
    if((searchQuery !== search) && (searchQuery != '')){
        
        setisLoading(true)
        setSearch(searchQuery)
    }
    React.useEffect(()=>{
       
        const movieData = async()=>{
            try{
                
                const response = await fetch(`/api/movie/getMovie?search=${searchQuery}`)
                if(response.ok){
                    const data = await response.json()
                   
                    setMovies(data.data)

                }

            }
            catch(error){
                console.error("func movieData:", error)
            }
            finally{
                setisLoading(false)
            }
        }
        
        if(prop.user && prop.user.success)
            {

                if(prop.user.status.subscription && (new Date(prop.user.status["expiration"]) > new Date())){
                    
                    movieData();
                    setPaymentForm(false)
                }
                else{
                    setPaymentForm(true)
                    setisLoading(false)
                    
                }
        }
        else{
            setisLoading(false)
        }
       
    
    }, [search,prop.user, paymentForm])
    const cardElements = movies.map((elem,index)=>{
       return <Card   imgUrl={elem.imgUrl} title={elem.name} description={elem.description} videoSrc={elem.trailer}/>
    })
    
    async function subscribe(e){
       e.currentTarget.disabled = true;
      
        try{
            const response = await fetch(`/api/user/subscribe`)
            if(response.ok){
                const data = await response.json()
                
                window.location.href = data.payment_link                
            }
        }
        catch(error){
            console.error("Error subscribing:", error)
        }
    
    }

    return(
        <main>
             <hr className={`
            relative
            h-[1px]
            w-[100%
            bg-[rgb(76,41,43)]
            z-30
            border-none
            `}/>
        <div className={`
            relative
            w-[100%]
            min-h-[100vh]
            bg-[linear-gradient(180deg,rgb(67,21,24),rgb(0,0,0))]
            mt-[-90px]
            lg:mt-[-85px]
            lg:mt-[-62px]
            relative
            pt-[15vh]
            flex
            flex-wrap
            items-center
            justify-center
            pl-[5vw]
            gap-[30px]
        `}>
       
                {paymentForm && 
                <div className={`
                        bg-[rgba(228,31,31,0.1)]
                        w-[60%] 
                        h-[80vh]
                        rounded-lg
                        flex
                        flex-col
                        text-[rgb(206,13,20)] 
                        font-extrabold
                        p-2
                        pt-2
                        items-center
                        gap-[10px]
                      
                    `}>
                    <p className={`
                        text-[200px]
                        
                        `}>R</p>
                    <h1 className={`
                        text-white
                        text-[18px]
                        font-bold

                        `}>Robflix
                    </h1>
                    <p className={`
                        text-center
                        font-thin
                        text-white
                        `}>subscribe to Robflix and Enjoy Tvshows and series on demand</p>
                    <button className={`
                        text-white
                        text-[30px]
                        font-semibold
                        w-[80%]
                        transition-transform
                        duration-300
                        ease-out
                        hover:scale-95
                        p-2
                        hover:bg-[rgb(193,17,25)]
                        bg-[rgb(229,9,20)]
                        rounded-lg
                        `}
                        onClick={subscribe}>Subscribe</button>
                        
                    
                </div>}
                
                
                    
                     {cardElements}
                

                    {/*loading spinner */}
                    { isLoading && 
                    <div className={`
                        absolute
                        top-0
                        flex
                        flex-col
                        justify-center
                        items-center
                        w-[95%]
                        h-[100vh]
                        z-20
                        text-red-500
                        `}>
                        <CircleLoader

                            color= "red"
                            size= "250px"
                        />
                        <p>Loading</p>
                </div>
                }

                
        </div>
        <div className={`
                   text-[rgb(159,159,159)] 
                   mt-[2vh]
                    pl-[10vw]
                    w-full
                    pt-2
                    pb-5
                    bg-[rgb(25,25,25)]
                `} >
                <h3 className={`
                 
                    underline`}>Disclaimer</h3>
                <p>This is a non-commercial, personal portfolio project built purely for educational purposes. This website is not affiliated with, authorized, or endorsed by Netflix. No real user data or payment information is processed or stored</p>
                <Footer />
                </div>
       
            

            
                   
        
       
        </main>
         
        
    )
}