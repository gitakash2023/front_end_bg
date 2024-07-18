// pages/admin/Companies.js
"use client"
import Layout from "../../../admin-components/Layout"
import TeamContext from "./internal-team-component/TeamContext"


const InternalTeam = () => {
  return (
    <Layout>

<div className="container-fluid" style={{  minHeight: "100vh" }}>
  <div className="container">
    <TeamContext/>
  </div>
</div>
    </Layout>
  );
};

export default InternalTeam;
