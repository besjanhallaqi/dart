import { Inter } from "next/font/google";
import Link from "next/link";
import React from "react";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <div
      className={`relative w-full h-screen flex flex-col gap-8 text-4xl justify-center items-center ${inter.className}`}
    >
      <Link href={"/501"} className="hover:underline">
        Play 501
      </Link>
      <Link href={"/301"} className="hover:underline">
        Play 301
      </Link>
    </div>
  );
}
