import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';
import { GET_SINGLE_USER } from '../utils/queries';
import Auth from '../utils/auth';

const Carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const organizationData = [
      { id: 1, image: '/public/', title: 'Item 1' },
      { id: 2, image: '/public/', title: 'Item 2' },
      { id: 3, image: '/public/', title: 'Item 3' },
    ];
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % organizationData.length);
      }, 3000)
  
      return () => clearInterval(interval)
    }, [organizationData.length])
  
    return (
      <div>
        <AnimatePresence initial={false}>
          {organizationData.map((project, index) => (
            index === activeIndex && (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <img src={project.image} alt={project.title} />
                <h2>{project.title}</h2>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    )
};

export default Carousel;
