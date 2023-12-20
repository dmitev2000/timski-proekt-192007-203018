import React from "react";
import image1 from "../../assets/gallery/1.jpg";
import image2 from "../../assets/gallery/2.jpg";
import image3 from "../../assets/gallery/3.jpg";
import image4 from "../../assets/gallery/4.jpg";
import image5 from "../../assets/gallery/5.jpg";
import image6 from "../../assets/gallery/6.jpg";
import image7 from "../../assets/gallery/7.jpg";
import "./ui.css";

const Gallery = () => {
    return (
        <div className="gallery">
            <span style={{ "--i": 1 }}>
                <img src={image1} alt="" />
            </span>
            <span style={{ "--i": 2 }}>
                <img src={image2} alt="" />
            </span>
            <span style={{ "--i": 3 }}>
                <img src={image3} alt="" />
            </span>
            <span style={{ "--i": 4 }}>
                <img src={image4} alt="" />
            </span>
            <span style={{ "--i": 5 }}>
                <img src={image5} alt="" />
            </span>
            <span style={{ "--i": 6 }}>
                <img src={image7} alt="" />
            </span>
            <span style={{ "--i": 7 }}>
                <img src={image6} alt="" />
            </span>
            <span style={{ "--i": 8 }}>
                <img src={image3} alt="" />
            </span>
        </div>
    );
};

export default Gallery;
