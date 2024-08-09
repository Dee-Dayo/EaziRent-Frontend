import Hero from "./Hero";
import FindNewHome from "./FindNewHome";
import MakeEasy from "./MakeEasy";
import PropertyGrid from "./PropertyView/PropertyGrid";

const Home = () => {
    return(
        <div>
            <Hero/>
            <FindNewHome/>
            <PropertyGrid/>
            <MakeEasy/>
        </div>
    )
}

export default Home;