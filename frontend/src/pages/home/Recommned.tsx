import { Book } from '../../types/book.type'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/swiper-bundle.css';
import BookCard from '../books/BookCard';
import { useQuery } from '@tanstack/react-query';
import { fetchAllBooks } from '../../apis/books/books.api';

const Recommned = () => {
    const { data: books = [] } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchAllBooks,
        gcTime: 0,
        staleTime: 0
    })

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommend for you</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    books.length > 0 && books.slice(8, 18).map((book, index) => (
                        <SwiperSlide key={index} >
                            <BookCard book={book} />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    )
}

export default Recommned