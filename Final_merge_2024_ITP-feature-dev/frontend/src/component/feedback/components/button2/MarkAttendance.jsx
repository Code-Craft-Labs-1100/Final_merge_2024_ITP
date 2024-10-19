import PropTypes from "prop-types";
import { MdAddShoppingCart } from "react-icons/md"; // You can use an appropriate icon for adding to cart

const MarkAttendance = ({ onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-fit h-fit justify-between p-1.5 text-md bg-blue-500 text-white rounded-lg shadow-md font-BreeSerif ${className}`} // You can adjust the styling as needed
        >
            <MdAddShoppingCart className="text-xl ml-1 mr-2" /> {/* Icon for adding to cart */}
            <span className="mx-2">Mark Attendance</span> {/* Button label */}
        </button>
    );
};

MarkAttendance.propTypes = {
    onClick: PropTypes.func,
    className: PropTypes.string,
    label: PropTypes.string,
};

export default MarkAttendance;
