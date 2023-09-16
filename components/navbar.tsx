import { UserButton } from "@clerk/nextjs";
import Link from "next/link"
import Image from 'next/image'
import { MapPin, Grip } from "lucide-react"
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
const Navbar = async () => {

  return (
    <div className="w-full p-5 flex items-center justify-between shadow-md">
      {/* <MobileSidebar isPro={!isPro} apiLimitCount={apiLimitCount} /> */}
      <div className="">

        <Image src='/logo.png' alt='logo' width={120} height={120} />

      </div>

      <div className="relative inline-block text-left">
       
        <select id="pricingType" name="pricingType"
          className="hidden md:flex h-10  focus:outline-none focus:border-grey-500 text-grey-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
          <option value="All" className="text-blue">Looking For</option>
          <option value="Freemium">Job</option>
          <option value="Free">Internship</option>
          <option value="Paid">Hire</option>
        </select>
      </div>

      <div className="hidden md:flex text-black">

        <MapPin />
        <h2 className="ml-2">Thalassery</h2>

      </div>

      <div className="flex  p-4 items-center justify-center text-black">

        <div className="flex-col ml-2">
          <Link href='/dashboard'><h2 className="hidden md:flex text-1xl hover:text-black text-gray-500 font-bold">Dashboard</h2></Link>
        </div>
        <div className="flex-col ml-2">
          <Link href='/profile'><h2 className="hidden md:flex text-1xl hover:text-black text-gray-500 font-bold">Profile</h2></Link>
        </div>
        <div className="flex-col ml-2">
          <Link href='/applications'><h2 className="hidden md:flex text-1xl hover:text-black text-gray-500 font-bold">Applications</h2></Link>
        </div>

        

        <div className="ml-[10px]">
        <UserButton afterSignOutUrl="/"/>
        </div>

        <div className="ml-5">
          <DropdownMenu>
            <DropdownMenuTrigger><Grip /></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/profile">Profile</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/login">Billing</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/applications">Applied Jobs</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/dashboard">Dashboard</Link></DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </div>

      </div>
    </div>
  );
}

export default Navbar;