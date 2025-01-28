import React from 'react'

const Navbar:React.FC = () => {
    const navItems: string[] = ['Projects', 'Blogs','Notes']
  return (
    <nav className='flex items-center space-x-9 bg-black p-4'>
      {navItems.map((item,index) => (
        <a
        key={index}
        href={`#${item.toLowerCase()}`}
        className='text-white hover:text-blue-500 transition-colors'
        >
          {item}
        </a>
      ))}

    </nav>
  )
}

export default Navbar
