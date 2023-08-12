import React, { createContext, useEffect, useState } from 'react';

// create context
export const LoginContext = createContext();


const LoginProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  

  return (
    <LoginContext.Provider value={{login,setLogin}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
