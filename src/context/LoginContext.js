import React, { createContext, useEffect, useState } from 'react';

// create context
export const LoginContext = createContext();


const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState({})

  

  return (
    <LoginContext.Provider value={{login,setLogin,currentUser,setCurrentUser}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
