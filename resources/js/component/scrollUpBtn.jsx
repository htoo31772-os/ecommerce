import React, { useEffect, useState } from "react";
const ScrollUpBtn = () => {
    const [isVisiable, setIsVisiable] = useState(false);
    const topFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
    const scrollUpFunction = () => {
        if (window.scrollY > 20) {
            setIsVisiable(true);
        } else {
            setIsVisiable(false);
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollUpFunction);
        return () => {
            window.removeEventListener('scroll', scrollUpFunction);
        }
    }, []);
    return (
        <div style={{ display: isVisiable ? "block" : "none" }}
            onClick={topFunction}
            id="myBtn"
            className="btn btn-primary"
        >
            Top
        </div>
    )
}
export default ScrollUpBtn;
