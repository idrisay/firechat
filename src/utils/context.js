import { useRouter } from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
let access_token;
if (typeof window !== "undefined") {
  access_token = window.localStorage.getItem("access_token");
}

export function AppWrapper({ children }) {
  const [user, setUser] = useState();
  const router = useRouter()

  useEffect(() => {
    fetch(`${process.env.AUTH_API_URL}/auth/check-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setUser(data);
      });
  }, []);

  useEffect(() => {
    if(user && !user.loggedIn){
        router.push("/login");
    }
  }, [user])
  

  let sharedStates = {
    user,
    setUser,
  };

  return (
    <AppContext.Provider value={sharedStates}>{children}</AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}
