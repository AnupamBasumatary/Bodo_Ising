import React, { createContext, useState } from 'react';

export const UserDataContext = createContext('');

const UserContext = ({ children }) => {
  const [userData, setuserData] = useState('');
  return (
    <>
      <UserDataContext.Provider value={{ userData, setuserData }}>
        {children}
      </UserDataContext.Provider>
    </>
  );
};

export default UserContext;
