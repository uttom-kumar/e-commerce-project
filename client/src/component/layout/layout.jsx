
import AppNavbar from "./appNavbar.jsx";
import Footer from "./footer.jsx";
import ScrollTab from "./scrollTab.jsx";
import {Toaster} from "react-hot-toast";
import NextTopLoader from 'nextjs-toploader';

const Layout = (props) => {
    return (
        <div>
            <NextTopLoader
                color="linear-gradient(to right, rgb(254, 202, 202), rgb(220, 38, 38))"
                height={3}
                speed={400}
                easing="ease-in-out"
            />
            <AppNavbar/>
            {props.children}
                <Toaster position={"top-center"} reverseOrder={false}/>
            <ScrollTab/>
            <Footer/>
        </div>
    );
};

export default Layout;