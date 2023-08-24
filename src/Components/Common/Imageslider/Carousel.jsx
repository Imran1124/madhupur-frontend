import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Schoolpic from "../../../Pages/landingpages/img/01.jpg";
import School2pic from "../../../Pages/landingpages/img/02.jpg";
import School3pic from "../../../Pages/landingpages/img/03.jpg";

export default function index() {
    const partnerImages=[
        {
            id:1,
        image:Schoolpic,
        },
        {
            id:2,
        image:School2pic,
        },
        {
            id:3,
            image:School3pic,
        },
            ]
  return (<>
  <Carousel showArrows={true} autoPlay={true} infiniteLoop={true} interval={2000}>
    {partnerImages.map((data,index)=> ( 
    
   <div key={data?.id} >
        <img src={data.image} className='h-[40vh]' />
    </div>
    

    )
)}
</Carousel>
</>)
}
