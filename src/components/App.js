import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase";

function App() {    
  const [init, setInit] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);    // 로그인 여부 확인

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      if(user)  setIsLoggedIn(true);        
      else      setIsLoggedIn(false);      
      setInit(true);
    })
  }, [])
  
  //setInterval(() => {
  //  console.log(authService.currentUser)
  //}, 2000);

  return (
    <>
      {init ? <AppRouter isLoggedIn = {isLoggedIn} /> : "Initializing...."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;