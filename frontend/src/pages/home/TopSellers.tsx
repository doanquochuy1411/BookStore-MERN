import { useEffect, useMemo, useState } from 'react'
import { Book } from '../../types/book.type'
import BookCard from '../books/BookCard'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Navigation, Pagination } from 'swiper/modules'

import 'swiper/swiper-bundle.css';
import { useQuery } from '@tanstack/react-query'
import { fetchAllBooks } from '../../apis/books/books.api'

const categories = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]

const TopSellers = () => {
    const [selectedCategory, setSelectedCategory] = useState<string>("Choose a genre")

    const { data: books = [] } = useQuery<Book[]>({
        queryKey: ["books"],
        queryFn: fetchAllBooks,
        gcTime: 0,
        staleTime: 0
    })

    const filteredBooks = useMemo(() => {
        return selectedCategory === "Choose a genre" ?
            books : books.filter(books => books.category === selectedCategory.toLowerCase())
    }, [books, selectedCategory])

    return (
        <div className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>

            {/* Category filtering */}
            <div className='mb-8 flex items-center'>
                <select
                    name="category"
                    id="category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {
                        categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))
                    }
                </select>
            </div>

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
                    filteredBooks.length > 0 && filteredBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <BookCard book={book} />
                        </SwiperSlide>

                    ))
                }
            </Swiper>
        </div>
    )
}

export default TopSellers