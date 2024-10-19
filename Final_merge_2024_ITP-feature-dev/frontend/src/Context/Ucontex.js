import { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext(null);

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to hold the user data
  const [menu, setMenu] = useState([
    { id: 1, name: 'Pizza', description: 'Delicious cheese pizza', price: 10 },
    { id: 2, name: 'Burger', description: 'Juicy beef burger', price: 8 },
    { id: 3, name: 'Pasta', description: 'Classic Italian pasta', price: 12 },
  ]);

  return (
    <UserContext.Provider value={{ user, setUser, menu }}>
      {children}
    </UserContext.Provider>
  );
};
