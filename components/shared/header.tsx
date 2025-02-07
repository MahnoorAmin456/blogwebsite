'use client'
import React from 'react'
import Link from 'next/link'
import { Label } from '../ui/label'
import { ThemeToggle } from '../ui/theme-toggle'
import useInvalidPaths from '../../lib/use-invalid-paths'
 
export default function Header  ()  {
    const invalidPath: boolean = useInvalidPaths();
    if (invalidPath) return <></>
  return (
    <div className={`flex fixed inset-0 flex-col items-center z-50 h-20 bg-background border-b border-border`}>
        <div className='max-w-[1500px] w-full md:px-14 px-4 h-full flex flex-row items-center justify-between'>
            <Link href='/' sr-only='home page' className='cursor-pointer'><Label className='font-extrabold text-2xl'>Personal Blog</Label></Link>
           <ThemeToggle/>
        </div>
      
    </div>
  )
}


