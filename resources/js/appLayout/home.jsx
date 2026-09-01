import React from "react";
import Banner from "../appPage/banner";
import Service from "../component/service";
import Category from "../appPage/category";
import Product from "../appPage/product";
import Feature from "../component/feature";
import About from "../component/about";
import ContactPaymentSection from "../component/contact";
import ScrollUpBtn from "../component/scrollUpBtn";
const Home = ()=>{
    return(
        <>
            <Banner/>
            <Service/>
            <Category/>
            <Product/>
            <Feature/>
            <About/>
            <ContactPaymentSection/>
            <ScrollUpBtn/>
        </>
    );
}
export default Home;
