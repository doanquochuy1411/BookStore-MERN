import { useParams } from 'react-router'
import { getImgUrl } from '../../utils/getImgUrl'
import { FiShoppingCart } from 'react-icons/fi'
import { useQuery } from '@tanstack/react-query';
import { addBook, fetchBookById } from '../../apis/books/books.api';
import { useDispatch } from 'react-redux';
import { Book } from '../../types/book.type';
import { addToCart } from '../../redux/features/cart/cart.slice';

const SingleBook = () => {
    const { id } = useParams<{ id: string }>();
    const { data: book, isLoading, isError } = useQuery<any>({
        queryKey: ["books", id],
        queryFn: () => {
            console.log(id)
            console.log(typeof (String(id)))
            console.log(String(id))
            return fetchBookById(String(id));
        },
        gcTime: 0,
        staleTime: 0,
    })

    const dispatch = useDispatch();
    const handelAddToCart = (book: Book) => {
        dispatch(addToCart(book));
    }

    if (isLoading) {
        return <div>Loading...</div>; // Loading state
    }

    if (isError) {
        return (
            <div>
                <h1>Something went wrong!</h1>
            </div>
        );
    }

    return (
        <div>
            <h1 className='text-2xl font-bold mb-6'>{book?.title}</h1>
            <div>
                <div>
                    <img
                        src={`${getImgUrl(book?.coverImage)}`}
                        alt={book?.title}
                        className='mb-8'
                    />
                </div>

                <div className='mb-5'>
                    <p className='text-gray-700 mb-2'>
                        <strong>Author: </strong> {book?.auth || "Admin"}
                    </p>

                    <p className='text-gray-700 mb-2'>
                        <strong>Published:</strong> {new Date(book?.createAt).toLocaleDateString()}
                    </p>

                    <p className='text-gray-700 mb-4 capitalize'>
                        <strong>Category:</strong> {book?.category}
                    </p>

                    <p className="text-gray-700">
                        <strong>Description:</strong> {book?.description}
                    </p>
                </div>

                <button onClick={() => handelAddToCart(book)} className='btn-primary px-6 space-x-1 flex items-center gap-1'>
                    <FiShoppingCart className='' />
                    <span>Add to cart</span>
                </button>
            </div>
        </div>
    )
}

export default SingleBook