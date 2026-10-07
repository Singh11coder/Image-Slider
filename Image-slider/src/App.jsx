import React, { useEffect, useState } from 'react'
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import './App.css';

const App = () => {
  let url = "https://picsum.photos/v2/list";
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errMsg, setErrMsg] = useState(null);
  const [loading,setLoading] = useState(false);

  const fetchImages = async (url,limit = 10, page = 1) => {
      try{
        setLoading(true);
        const response = await fetch(`${url}?page=${page}&limit=${limit}`);
        const data = await response.json();
        if(data){   
          setLoading(false);
          setImages(data);

        }
        
        console.log(data);
   
      }
      catch(e){
          setErrMsg(e.message);
      }
  }

  const handleNext = () => {
      setCurrentSlide(currentSlide === 0 ? images.length-1 : currentSlide - 1);
  }

  const handlePrev = () => {
      setCurrentSlide(currentSlide === images.length ? 0 : currentSlide + 1);
  }

  const handleRandom = (index) => {
      setCurrentSlide(index);
  }

  useEffect(() => {
      if(url !== "") fetchImages(url);
  },[url]);

  if(loading){
    return <div>Loading....</div>
  }

  if(errMsg) {
     return <div>{errMsg}</div>
  }
  return (
    <div className="container">
      <div className="container2">
         <BsArrowLeftCircleFill 
         onClick = {handlePrev} 
         className="arrow arrow-left"/>
       { images?
         images.map((item,index) => {
             return <img
               key={item.id}
               src={item.download_url}
               alt={item.download_url}
               className={currentSlide === index ? "current-image" : "inactive"}  
             />
         })
        : null
       }
       <BsArrowRightCircleFill 
        onClick = {handleNext}
        className="arrow arrow-right"/>
      </div>
      
       <span className="circle-indicator" >
           {  images && images.length ?
              images.map((_,index) => {
                 return <button
                   key={index}
                   className={currentSlide === index ? "current-indicator":"indicator "}
                   onClick={() => handleRandom(index)}  
                 ></button>
              }): null
           } 
       </span>
    </div>
  )
}

export default App
