import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Register from './pages/Register';

const App = () => {

  const [page, setPage] = useState("login");
  const [userData, setUserData] = useState(null);
  const [registerMessage, setRegisterMessage] = useState(null);

  if (page === "posts" && userData !== null){
    return <Posts setPage={setPage} userData={userData} setUserData={setUserData} />
  }
  else if (page === "register"){
    return (
      <Register 
        setPage={setPage}
        setRegisterMessage={setRegisterMessage}
      />
    )
  }
  else if(page === "login" || userData === null){
    return (
      <Login 
        setPage={setPage} 
        setUserData={setUserData} 
        registerMessage={registerMessage} 
        setRegisterMessage={setRegisterMessage} 
      />
    )
  }
}

export default App;
