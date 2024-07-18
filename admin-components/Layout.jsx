"use client";

import LeftSideMenu from './LeftSideMenu';

const Layout = ({ children }) => {
  return (
    <div className="d-flex">
      <LeftSideMenu />
      <div className="flex-grow-1">{children}</div>
    </div>
  );
};

export default Layout;