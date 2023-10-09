import { useState, useEffect } from 'react';
import { GET_SINGLE_USER, GET_ALL_TAGS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules';

const ForMe = ({ organizations }) => {

  const { loading, data } = useQuery(GET_SINGLE_USER);

  const userData = data?.getSingleUser || {};
  // console.log(userData)

  const savedOrgs = userData.savedOrganizations
  const tagIdsArray = savedOrgs?.map((org) => org.tag).filter(Boolean);
  console.log(tagIdsArray);

  const { _, data: tagData } = useQuery(GET_ALL_TAGS);
  const allTagData = tagData?.getAllTags || {};
  console.log(allTagData);
  const forYouOrgs = [];
  if (Array.isArray(allTagData)) {

    // Step 1: Filter out the tags that do not exist on the page
    const userTagData = allTagData.filter(value => tagIdsArray?.includes(value._id))
    console.log(userTagData);

    const counts = {};

    // Step 2: Iterate through the array and count values
    userTagData.forEach(item => {
      const key = item._id; // Use the 'name' property as the key
      counts[key] = (counts[key] || 0) + 1;
    });

    // Step 3: Convert counting object to an array of objects
    const countedValues = Object.entries(counts).map(([_id, count]) => ({
      _id,
      count,
    }));

    // Step 4: Sort the array by count in descending order
    countedValues.sort((a, b) => b.count - a.count);

    // Step 5: Extract sorted values into a new array
    const sortedIds = countedValues.map(item => item._id);

    console.log(sortedIds);

    // Sort by tag with most saves
    const customSort = (a, b) => {
      const indexesOfA = sortedIds.map((item, index) => (item === a ? index : -1)).filter(index => index !== -1);
      const indexesOfB = sortedIds.map((item, index) => (item === b ? index : -1)).filter(index => index !== -1);

      if (indexesOfA.length === 0 && indexesOfB.length === 0) {
        return 0; // Both elements are not in the referenceArray
      } else if (indexesOfA.length === 0) {
        return 1; // 'a' is not in the referenceArray, 'b' comes after
      } else if (indexesOfB.length === 0) {
        return -1; // 'b' is not in the referenceArray, 'a' comes before
      } else {
        // Compare the minimum index values for 'a' and 'b'
        const minIndexA = Math.min(...indexesOfA);
        const minIndexB = Math.min(...indexesOfB);
        return minIndexA - minIndexB;
      }
    };

    forYouOrgs.length = 0; // Clear the existing content
    forYouOrgs.push(...organizations.filter(value => sortedIds?.includes(value.tag)));
    forYouOrgs.sort(customSort);
    console.log(organizations);
    console.log(forYouOrgs)

  }

  if (loading) {
    return <p>Still Loading...</p>
  }

  console.log(forYouOrgs.length)

  return (
    <>
      {forYouOrgs.length >= 3 && (
        <>
          <div className='bg-light-2 pb-14'>
            <div className='md:container 2xl:w-2/3 mx-auto'>
              <h2 className='font-main text-primary text-3xl py-4 text-center md:text-start'>Trending for you</h2>
            </div>
            <div className='hidden md:container 2xl:w-2/3 mx-auto md:flex flex-wrap justify-center items-center'>
              <div className='overflow-hidden'>
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  centeredSlides={true}
                  mousewheel={true}
                  autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Mousewheel, Pagination]}
                  className="mySwiper"
                  style={{
                    '--swiper-pagination-color': '#FF7067',
                  }}
                >

                  {forYouOrgs.map((project) => (
                    <SwiperSlide key={project._id}>
                      <div className="w-full h-full">
                        <Link to={`/organization/${project._id}`}>
                          <img className="block w-full h-full rounded-xl" src={project.image} alt={project.name} />
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper>
              </div>
            </div>

            <div className='md:hidden md:container 2xl:w-2/3 mx-auto flex flex-wrap justify-center items-center'>
              <div className='overflow-hidden'>
                <Swiper
                  slidesPerView={1}
                  spaceBetween={0}
                  loop={true}
                  mousewheel={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Autoplay, Mousewheel, Pagination]}
                  className="mySwiper"
                  style={{
                    '--swiper-pagination-color': '#FF7067',
                  }}
                >

                  {forYouOrgs.map((project) => (
                    <SwiperSlide key={project._id}>
                      <div className="w-full h-full">
                        <Link to={`/organization/${project._id}`}>
                          <img className="block w-full h-full" src={project.image} alt={project.name} />
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}

                </Swiper>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForMe;
