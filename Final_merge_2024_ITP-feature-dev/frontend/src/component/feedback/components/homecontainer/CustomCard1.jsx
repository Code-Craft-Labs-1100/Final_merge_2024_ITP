import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const CustomCard1 = ({ header, imageSrc, buttonLabel, buttonClassName, buttonOnClick, className }) => {
  return (
    // <div className={`m-12 bg-bgc h-60 w-150 md:w-1/4 rounded-xl hover:bg-bgc hover:scale-110 duration-700 p-5 ${className}`}>
    <div style={{backgroundColor: "#d3d3d3", borderRadius: "8px", width:"210px"}}>
      <h2 className="p-3 text-2xl text-ternary font-BreeSerif text-center">{header}</h2>
      <img src={imageSrc}  alt="Card" className="mx-auto h-32 p-2" />
      <div className="pt-7 pb-2 flex justify-center">
        <motion.button
          className={`w-36 h-10 font-BreeSerif rounded-md bg-primary hover:scale-90 duration-500 ${buttonClassName}`}
          onClick={buttonOnClick}
          whileHover={{ scale: 0.8 }}
          whileTap={{ scale: 1.0 }}
        >
          {buttonLabel}
        </motion.button>
      </div>
    </div>
  );
};

CustomCard1.propTypes = {
  header: PropTypes.string,
  imageSrc: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonClassName: PropTypes.string,
  ClassName: PropTypes.string,
  buttonOnClick: PropTypes.func,
};

export default CustomCard1;
