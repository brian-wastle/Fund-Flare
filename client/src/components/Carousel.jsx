import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { useQuery, useMutation } from '@apollo/client';

const Carousel = ({orgs}) => {

    const [activeIndex, setActiveIndex] = useState(0);
    console.log(orgs)
    const organizationData = orgs.map((org) => ({
      id: org._id,
      image: org.image,
      title: org.name,
    }));
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % organizationData.length);
      }, 2000)
  
      return () => clearInterval(interval)
    }, [organizationData.length])
  
    return (
      <div className='absolute right-0 bottom-0'>
        <AnimatePresence initial={false}>
          {organizationData.map((project, index) => (
            index === activeIndex && (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Link to={`/organization/${project.id}`}><img src={project.image} alt={project.title} /></Link>
                <h2>{project.title}</h2>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    )
};

export default Carousel;
