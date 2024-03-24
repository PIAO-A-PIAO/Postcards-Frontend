import {createContext, useState} from "react";

const AuthContext = createContext({
  // Default values are optional, but if set, they should match the structure
  auth: {}, // the authenticated user information
  setAuth: () => {
  }, // the function to update the auth state
});

export const AuthProvider = ({children}) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;