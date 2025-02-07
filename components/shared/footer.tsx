// Footer.tsx (you can place it in a components folder)
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-3">
        <div className="text-center md:text-left">
          <p className="font-bold text-xl">My Personal Blog</p>
          <p className="text-sm mt-2">Sharing my journey, thoughts, and creativity.</p>
        </div>

        

        <div className="mt-6 flex justify-between items-center md:mt-0">
          <p className="text-sm">© My Personal Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
