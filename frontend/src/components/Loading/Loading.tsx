const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid'></div>
        </div>
    )
}

const Spin = () => {
    return (
        <div className='flex justify-center items-center'>
            <div className='animate-spin rounded-full h-6 w-6 border-t-4 border-b-4 border-black-500 border-solid'></div>
        </div>
    )
}

export { Loading, Spin };