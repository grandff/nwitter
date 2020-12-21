import React, { useState } from 'react';
import AppRouter from 'components/Router';
import {authService} from "fbase";

function App() {    
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);    // 로그인 여부 확인
  return (
    <>
      <AppRouter isLoggedIn = {isLoggedIn} />
      <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;