"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

import Header from "../../common-components/Header"

function ConditionedHeader() {
  const router = useRouter();
  const currentPath = router.pathname;
  const excludeHeaderPaths = ['/admin/companies/add-companies'];

  // Check if the current path matches the excludeHeaderPaths
  const excludeHeader = excludeHeaderPaths.includes(currentPath);

  return (
    <>
      
      {!excludeHeader && <Header />}
    </>
  );
}

export default ConditionedHeader;
