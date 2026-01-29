import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="p-3 bg-transparent  text-center text-white">
      Copyright © {currentYear} GetMeFunding - All rights reserved.
    </div>
  )
}

export default Footer
