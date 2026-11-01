'use client'
import { Badge } from "@/components/tailgrids/core/badge";

export default function Header () {
    return (
        // header container
        <div className="mt-4 text-center">

            {/* code */}
            <div className="flex justify-center gap-4">
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-red-500 text-white rotate-10">C</Badge>
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-green-700 text-white rotate-350">S</Badge>
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-blue-600 text-white rotate-10">I</Badge>
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-cyan-400 text-white rotate-350">2</Badge>
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-yellow-400 text-white rotate-10">0</Badge>
            <Badge className="text-2xl rounded-lg py-2 px-4 bg-gray-500 text-white rotate-350">5</Badge>
            </div>
            
            {/* name */}
            <div className="mt-4">
                <Badge className="text-sm rounded-lg py-1 px-3 bg-black text-white">FRONT END SOFTWARE DEVELOPMENT</Badge>
            </div>

        </div>
    )
}