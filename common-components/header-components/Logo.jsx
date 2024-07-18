"use client"
import Image from 'next/image';

const Logo = () => (
  <div className="logo-container">
    <div className="logo">
      <Image src="/logo.jpeg" alt="Company Logo" width={150} height={50} priority={true}/>
    </div>

    <style jsx>{`
      .logo-container {
       
      }
    `}</style>
  </div>
);

export default Logo;
