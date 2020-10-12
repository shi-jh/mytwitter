import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null); // 작성자 저장용  
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsloggedIn(true);
        setUserObj(user);
      } else{
        setIsloggedIn(false);
      }
      setInit(true);
    })
  },[])
  return(
  <> 
    {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/> : "Init..."    }
    <footer>&copy; {new Date().getFullYear()} My Twitter</footer>
  </>
  )
}

export default App;
