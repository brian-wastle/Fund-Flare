import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay, Mousewheel, Pagination } from 'swiper/modules';

const Carousel = ({ orgs }) => {

  console.log(orgs)

  const organizationData = orgs.map((org) => ({
    id: org._id,
    image: org.image,
    title: org.name,
  }));

  return (
    <>
      <div className='w-full py-8 mx-auto overflow-hidden'>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={0}
          coverflowEffect={{
            rotate: 10,
            stretch: 40,
            depth: 200,
            modifier: 1,
            slideShadows: true,
          }}
          mousewheel={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Autoplay, Mousewheel, Pagination]}
          className="mySwiper py-12 w-full"
          style={{
            '--swiper-pagination-color': '#FF7067',
          }}
        >
          {organizationData.map((project) => (
            <SwiperSlide key={project.id} style={{ width: '300px', height: '200px' }}>
              <div className="w-full h-full">
                <h2 className="absolute">{project.title}</h2>
                <Link to={`/organization/${project.id}`}>
                  <img className="block w-full h-full" src={project.image} alt={project.title} />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
};

export default Carousel;
