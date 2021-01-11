import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase";

function App() {    
  const [init, setInit] = useState(false);  
  const [isLoggedIn, setIsLoggedIn] = useState(false);    // 로그인 여부 확인
  const [userObj, setUserObj] = useState(null);   

  useEffect(() => {
    authService.onAuthStateChanged( (user) => {
      /* change.. not use setisloggedin */
      /*if(user){
        setIsLoggedIn(true);        
        setUserObj(user);
      }  
      else{
        setIsLoggedIn(false);              
      }      */
      if(user){
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile : (args) => user.updateProfile(args)
        });
      }else{
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);
  
  //setInterval(() => {
  //  console.log(authService.currentUser)
  //}, 2000);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile : (args) => user.updateProfile(args)
    });
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn = {Boolean(userObj)} userObj={userObj} /> : "Initializing...."}
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;