import React from 'react'
import Link from 'next/link'
import { monoFont } from '../styles/fonts/fonts'

const Navbar: React.FC = () => {
    const navItems = [
        { href: '#projects', label: 'Projects' },
        { href: '#blogs', label: 'Blogs' },
        { href: '#notes', label: 'Notes' }
    ]

    return (
        <nav className={`${monoFont.className} relative z-50 p-4`}>
            <div className="flex items-center gap-6">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm text-muted-foreground hover:text-purple-500 transition-colors duration-200 ${monoFont.className}`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Navbar