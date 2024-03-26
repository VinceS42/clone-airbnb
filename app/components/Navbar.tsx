import Image from "next/image";
import React from "react";
import DesktopLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import Link from "next/link";
import UserNav from "./UserNav";

export default function NavBar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                <Link href={"/"}>
                    <Image
                        src={DesktopLogo}
                        alt="Desktop Logo"
                        className="w-32 hidden lg:block"
                    />
                    <Image
                        src={MobileLogo}
                        alt="Desktop Logo"
                        className="w-12 block lg:hidden"
                    />
                </Link>

                <UserNav />
            </div>
        </nav>
    );
}
