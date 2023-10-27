"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Keyboard, Navigation, Pagination } from 'swiper';
import { useMediaQuery, useTheme } from '@mui/material';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CategoryItem from '../categoryItem';
// import Skeleton from '@mui/material/Skeleton';
import { useQuery } from '@apollo/client';
import { CHARACTERS_QUERY } from '@/app/graphql/queries/characters';

const Carousel: React.FC = (props: any) => {
  const { data, loading, error } = useQuery(CHARACTERS_QUERY);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const tablet = useMediaQuery(theme.breakpoints.only('sm'));
  const responsive = desktop ? 4 : tablet ? 3 : 2;
  if(loading){
    return (<>Loading...</>)
  }
  return (
    <>
    <Swiper width={1500}
      rewind={true}
      slidesPerView={responsive}
      spaceBetween={10}
      freeMode={true}
      pagination={{
        clickable: true,
        dynamicBullets: true,
      }}
      keyboard={{
        enabled: true,
      }}
      modules={[Keyboard, FreeMode, Navigation, Pagination]}
    >
      {data?.products?.map((item: any) => {
        return (
          <SwiperSlide key={item.id}>
            <CategoryItem category={item} />
          </SwiperSlide>
        );
      })
      }
    </Swiper>
    </>
  );
}

export default Carousel

