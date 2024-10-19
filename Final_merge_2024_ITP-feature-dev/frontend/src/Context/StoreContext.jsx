import { createContext, useEffect, useState } from "react";
import { food_list as initialFoodList, menu_list } from "../assets/foodcardasset/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = "http://localhost:5000";
    const [foodList, setFoodList] = useState([]);  // Renamed state variable to avoid conflict with imported `food_list`
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("");
    const currency = "$";
    const deliveryCharge = 5;

    const addToCart = async (itemId) => {
        try {
            if (!cartItems[itemId]) {
                setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
            } else {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
            }

            if (token) {
                await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.error("Error adding item to cart:", error);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            if (cartItems[itemId] > 1) {
                setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
            } else {
                const { [itemId]: _, ...rest } = cartItems;
                setCartItems(rest);
            }

            if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                try {
                    const itemInfo = foodList.find((product) => product._id === item);
                    if (itemInfo) {
                        totalAmount += itemInfo.price * cartItems[item];
                    }
                } catch (error) {
                    console.error("Error calculating total cart amount:", error);
                }
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();

            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                await loadCartData(storedToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        url,
        food_list: foodList,  // Provide the updated state `foodList` here
        menu_list,  // Assuming `menu_list` comes from the imported assets
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,
        loadCartData,
        setCartItems,
        currency,
        deliveryCharge,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
