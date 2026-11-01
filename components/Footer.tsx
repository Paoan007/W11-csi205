'use client'

import Link from "next/link";

import { Badge } from "@/components/tailgrids/core/badge";
import { Facebook, Instagram, Twitter } from "@tailgrids/icons";
import 'bootstrap-icons/font/bootstrap-icons.min.css'
export default function Footer () {
    return (
        // footer container
        <div className="mt-4 text-center">
        {/* student */}
        <div>
        <Badge className="text-xl text-black rounded-lg">68070606 นายภาคิน งามเดชากิจ</Badge>
        </div>
        {/* contacts */}
        <div className="mt-4 flex justify-center gap-6 "> 
            <Link href={'https://www.facebook.com/pincourses'} target="blank">
            <Facebook className=" text-blue-700 "/>
            </Link>
            <div className="border-l-1"></div>

            <Link href={'https://www.tiktok.com/'} target="blank">
            <span className=" bi bi-tiktok text-xl"></span>
            </Link>
            <div className="border-l-1"></div> 

            <Link href={'https://www.youtube.com/@pin-pcmagics'} target="blank">
            <span className="bi bi-youtube text-3xl text-red-500 "></span>
            </Link>
            <div className="border-l-1"></div>

            <Link href={'https://www.twitter.com'} target="blank">
            <Twitter className="text-2xl"/>
            </Link>
            <div className="border-l-1"></div>

            <Link href={'https://www.instagram.com'} target="blank">
            <Instagram className="text-pink-600"/>
            </Link>
        </div>
        </div>
    )
}