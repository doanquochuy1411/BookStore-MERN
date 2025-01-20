import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "./InputField"
import SelectField from "./SelectField"
import { useState } from "react";
import { Book } from "../../../types/book.type";
import { useMutation, useQueries, useQueryClient } from "@tanstack/react-query";
import { addBook } from "../../../apis/books/books.api";

const AddBook = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Book>();
    const [imageFile, setimageFile] = useState<File | null>(null);
    const [imageFileName, setimageFileName] = useState('');

    const onSubmit: SubmitHandler<Book> = async (data) => {

        const newBookData = {
            ...data,
            coverImage: imageFileName
        }

        console.log(newBookData)

        handelAddBook(newBookData);

    }

    const { mutate: handelAddBook, isPending } = useMutation({
        mutationKey: ["addBook"],
        mutationFn: (data: Book) => addBook(data),
        onSuccess: () => {
            console.log("Book created successfully");
            queryClient.invalidateQueries({
                queryKey: ["books"],
                exact: true,
                type: "active"
            })
            alert("Book created successfully");
        },
        onError: (err) => {
            console.log("Failed to create book: ", err.message)
            alert("Failed to created book");
        },


    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }

    return (
        <div className="max-w-lg   mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Book</h2>

            {/* Form starts here */}
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Reusable Input Field for Title */}
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    register={register}
                />

                {/* Reusable Textarea for Description */}
                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter book description"
                    type="textarea"
                    register={register}

                />

                {/* Reusable Select Field for Category */}
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
                        // Add more options as needed
                    ]}
                    register={register}
                />

                {/* Trending Checkbox */}
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

                {/* Old Price */}
                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}

                />

                {/* New Price */}
                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}

                />

                {/* Cover Image Upload */}
                <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
                    <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
                    {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
                    {/* {
                        isLoading ? <span className="">Adding.. </span> : <span>Add Book</span>
                    } */}
                    Add Book
                </button>
            </form>
        </div>
    )
}

export default AddBook