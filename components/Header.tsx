import React from 'react';
import Image from 'next/image';
import Link from "next/link"

import { Button } from "@/components/ui/button"

export function ButtonAsChild() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  )
}



const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className='flex items-center gap-2'>
        <Image src="/RedToolbox.svg" width={50} height={50} alt='logo'/>
        <h1 className="text-xl font-semibold">toolbox</h1>
        </div>
        <Button asChild>
          <Link href="/log">Login</Link>
        </Button>

      </div>
    </header>
  );
};

export default Header;
