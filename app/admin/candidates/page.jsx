
"use client"
import * as React from 'react';
import CustomButton from "@/common-components/CustomButton";
import Layout from "../../../admin-components/Layout"

import { BsDownload, BsPlus } from "react-icons/bs";
import Link from "next/link";
import SearchComponent from "@/common-components/SearchComponent";
import CandidateList from "../candidates/candidates-components/CandidateList"
import { Button } from '@mui/material';





const Condidate = () => {
  return (
    <Layout>

<div className="container-fluid" style={{  minHeight: "100vh" }}>
  <div className="container">
  <div style={{ display: 'flex', justifyContent: "space-between"}}>
                <div style={{ margin: "10px" }}>
                    
                </div>
                
                
                <div style={{ display: 'flex' }}>
                <div style={{ margin: "10px" }}>
                        <Button
                            variant="contained"
                            startIcon={<BsDownload style={{ fontSize: '1.2em' }} />}
                        >
                            Download as Excel
                        </Button>
                    </div>
                    <div style={{ margin: "10px" }}>
                    <Link href="/admin/candidates/add-candidates" passHref style={{ textDecoration:"none"}}>
                    <div >
                        <Button
                            variant="contained"
                            startIcon={<BsPlus style={{ fontSize: '1.2em' }} />}
                        >
                            ADD NEW CANDIDATE
                        </Button>
                    </div>
            </Link>
                    </div>
                </div>
            </div>
            <CandidateList/>
  </div>

</div>


    </Layout>
  );
};

export default Condidate;
