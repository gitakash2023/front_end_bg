import React from 'react';
import WelcomeUser from './WelcomeUser';

const LoggedInPage = () => {
  const loggedInUsername = "Admin"; 
  return (
    <div>
      <WelcomeUser username={loggedInUsername} />
     
    </div>
  );
};

export default LoggedInPage;
