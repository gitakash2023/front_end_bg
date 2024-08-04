"use client";
import { FaUser, FaUserCog, FaChartBar } from "react-icons/fa";
import MenuItem from '../../common-components/MenuItem';

const CompanySideMenu = () => {
  return (
    <div className="bg-light text-white p-4" style={{ height: "80vh" }}>
      <ul className="list-unstyled">
        <MenuItem
          href="/client/client-dashboard"
          icon={FaChartBar}
          label="Dashboard"
        />
        <MenuItem
          href="/client/candidates"
          icon={FaUser}
          label="Candidates"
        />
        <MenuItem
          href="/client/internal-team"
          icon={FaUserCog}
          label="Internal Team"
        />
      </ul>
    </div>
  );
};

export default CompanySideMenu;
