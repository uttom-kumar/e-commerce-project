import { FaArrowUp } from "react-icons/fa6";
import { useState, useEffect } from 'react';


const ScrollTab = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset > 250) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className='ScrollTab'
            onClick={handleScrollToTop}
            style={{ display: isVisible ? 'block' : 'none' }}
        >
            <FaArrowUp className='fw-bolder' />
        </div>
    );
};

export default ScrollTab;
