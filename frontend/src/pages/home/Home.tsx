import Banner from "./Banner"
import News from "./News"
import Recommned from "./Recommned"
import TopSellers from "./TopSellers"

const Home = () => {
    return (
        <>
            <Banner />
            <TopSellers />
            <Recommned />
            <News />
        </>
    )
}

export default Home
