'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { monoFont } from '../styles/fonts/fonts';

const Navbar: React.FC = () => {
    
    const navItems = [
        { href: '/Projects', label: 'Projects' },
        { href: '/Blog', label: 'Blog' },
        { href: '/Notes', label: 'Notes' }
    ];

    return (
        <nav className={cn(monoFont.className, "relative z-50 p-4")}> 
            {/* Mobile Navigation */}
            <div className="sm:hidden flex justify-end items-center gap-6">
                {navItems.map((item) => (
                    <div
                        key={item.href}
                        className="relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-purple-500 after:left-0 after:bottom-[-2px] after:transition-all after:duration-200 hover:after:w-full"
                    >
                        <Link
                            href={item.href}
                            className={cn(
                                "text-sm text-muted-foreground hover:text-purple-500",
                                "transition-colors duration-200",
                                monoFont.className
                            )}
                        >
                            {item.label}
                        </Link>
                    </div>
                ))}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex justify-end items-center gap-12">
                {navItems.map((item) => (
                    <div
                        key={item.href}
                        className="relative after:content-[''] after:absolute after:w-0 after:h-[1px] after:bg-purple-500 after:left-0 after:bottom-[-2px] after:transition-all after:duration-200 hover:after:w-full"
                    >
                        <Link
                            href={item.href}
                            className={cn(
                                "text-sm text-muted-foreground hover:text-purple-500",
                                "transition-colors duration-200",
                                monoFont.className
                            )}
                        >
                            {item.label}
                        </Link>
                    </div>
                ))}
            </div>
        </nav>
    );
};

export default Navbar;
