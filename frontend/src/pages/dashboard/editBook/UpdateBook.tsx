import { useMutation, useQuery } from '@tanstack/react-query';
import { Book } from '../../../types/book.type';
import InputField from '../addBook/InputField'
import SelectField from '../addBook/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { fetchBookById, updateBook } from '../../../apis/books/books.api';
import { Loading } from '../../../components/Loading/Loading';
import { useEffect } from 'react';

const UpdateBook = () => {
    const { id } = useParams();

    const { data: bookData, isLoading, isError } = useQuery<any>({
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

    const { register, handleSubmit, setValue, reset } = useForm<Book>();

    const { mutate: handelUpdateBook } = useMutation({
        mutationKey: ["updateBook"],
        mutationFn: (data: Book) => updateBook(id!, data),
        onSuccess: () => {
            alert("Your book is updated successfully!");
        },
        onError: (err) => {
            console.log("Failed to update book: ", err.message)
            alert("Failed to update book.");
        }
    })

    useEffect(() => {
        if (bookData) {
            setValue('title', bookData.title);
            setValue('description', bookData.description);
            setValue('category', bookData?.category);
            setValue('trending', bookData.trending);
            setValue('oldPrice', bookData.oldPrice);
            setValue('newPrice', bookData.newPrice);
            setValue('coverImage', bookData.coverImage)
        }
    }, [bookData, setValue])

    const onSubmit = async (data: Book) => {
        const updateBookData = {
            _id: bookData._id,
            auth: bookData.auth,
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || bookData.coverImage,
        };
        console.log(updateBookData);
        handelUpdateBook(updateBookData);
    }
    if (isLoading) return <Loading />
    if (isError) return <div>Error fetching book data</div>
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Book</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'business', label: 'Business' },
                        { value: 'technology', label: 'Technology' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
                    Update Book
                </button>
            </form>
        </div>
    )
}

export default UpdateBook