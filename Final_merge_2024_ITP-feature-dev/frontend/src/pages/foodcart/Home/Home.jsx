import React, { useState } from "react";
import Header from "../../../component/foodcart/Header/Header";
import ExploreMenu from "../../../component/foodcart/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../../component/foodcart/FoodDisplay/FoodDisplay";
import AppDownload from "../../../component/foodcart/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <Header />
      <ExploreMenu setCategory={setCategory} category={category} />
      <FoodDisplay category={category} />
      <AppDownload />
    </>
  );
};

export default Home;
