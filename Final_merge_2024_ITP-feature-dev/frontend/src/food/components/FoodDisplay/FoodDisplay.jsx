import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle input changes in the search bar
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
    };

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <input
                type="text"
                placeholder="Search for food..."
                className="search-bar"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="food-display-list">
                {food_list
                    .filter(item => 
                        category === "All" || category === item.category
                    )
                    .filter(item => 
                        item.name.toLowerCase().includes(searchQuery)
                    )
                    .map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
            </div>
        </div>
    );
}

export default FoodDisplay;
