import { createContext, useContext, useState } from "react"

const StateContext = createContext({
  // currentUser: null,
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
  // employees: null,
  // setEmployees: () => {},
})

const ContextProvider = ({ children }) => {

  const [user, setUser] = useState({})
  // const [employees, setEmployees] = useState({})
  const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('ACCESS_TOKEN', token);
    } else {
      localStorage.removeItem('ACCESS_TOKEN')
    }
  }

  return (
    <StateContext.Provider value={{
      user,
      token,
      setUser,
      setToken,
      // employees,
      // setEmployees
     }}>

      {children}

    </StateContext.Provider>
  )
}

export default ContextProvider;

export const useStateContext = () => useContext(StateContext)
