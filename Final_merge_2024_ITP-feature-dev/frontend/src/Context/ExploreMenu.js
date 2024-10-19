import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext'; // Ensure correct import path

const ExploreMenu = () => {
  const userContext = useContext(UserContext); // Access UserContext

  if (!userContext) {
    return <div>Loading... Please wait while we fetch the menu.</div>;
  }

  const { user, menu } = userContext;

  return (
    <div className="explore-menu">
      <h1>Explore Our Menu</h1>
      {user ? (
        <p>Welcome, {user.name}! Here's our menu just for you.</p>
      ) : (
        <p>Welcome, Guest! Check out our delicious offerings.</p>
      )}

      {menu ? (
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Menu is currently unavailable. Please check back later.</p>
      )}
    </div>
  );
};

export default ExploreMenu;
