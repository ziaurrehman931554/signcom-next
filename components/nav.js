'use client'

import React, {useState} from 'react';
import Image from 'next/image';
import '../app/globals.css';
import { cn } from '../lib/utils';
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion"

import logButton from './logButton';

export default function Nav() {
    const links = [
        {
            path: "/",
            name: "Home",
        },
        {
            path: "/about",
            name: "About",
        },
        {
            path: "/login",
            name: "Get Access",
        },
        {
            path: "/call",
            name: "Call",
        }
    ]

    const pathname = usePathname()
    const MotionLink = motion(Link)

    const mapRange = (inputLower,inputUpper,outputLower,outputUpper) => {
        const INPUT_RANGE = inputUpper - inputLower
        const OUTPUT_RANGE = outputUpper - outputLower

        return (value) =>
        outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0)
    }

    const setTransform = (item,event,x,y) => {
        const bounds = item.getBoundingClientRect()
        const relativeX = event.clientX - bounds.left
        const relativeY = event.clientY - bounds.top
        const xRange = mapRange(0, bounds.width, -1, 1)(relativeX)
        const yRange = mapRange(0, bounds.height, -1, 1)(relativeY)
        x.set(xRange * 10)
        y.set(yRange * 10)
    }

    const [ search, setSearch ] = useState('')
    return (
        <section className="w-full nav bg-slate-700 text-white flex justify-between items-center px-4 ">
            <div className="h-14 w-14 rounded-full">
                <a href='/' className='flex justify-center items-center px-5 w-36'>
                    <Image src={require('../public/assets/logo.png')} alt="SignCom" className="rounded-full object-cover mr-3" height={50} width={50} />
                    <h1 className='text-blue-400 mt-1'>SignCom</h1>
                </a>
            </div>
            <div className='flex navS items-center gap-2 ml-60 w-96 p-2 rounded-full bg-cyan-600'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent outline-none border-none placeholder-slate-100 text-black transition-all"  placeholder="🔎 Search" />
            </div>
            <div className="flex-row p-1 gap-3 navL">
                <ul className="flex gap-2">
                    <AnimatePresence>
                        {links.map((link) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const x = useMotionValue(0)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const y = useMotionValue(0)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const textX = useTransform(x, (latest) => latest * 0.5)
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            const textY = useTransform(y, (latest) => latest * 0.5)
                            return (
                            <motion.li
                                onPointerMove={(event) => {
                                const item = event.currentTarget
                                setTransform(item, event, x, y)
                                }}
                                key={link.path}
                                onPointerLeave={(event) => {
                                x.set(0)
                                y.set(0)
                                }}
                                style={{ x, y }}
                            >
                                <MotionLink
                                className={cn(
                                    "font-medium relative rounded-xl text-sm py-2 px-4 transition-all duration-500 ease-out hover:bg-cyan-200",
                                    pathname === link.path ? "" : ""
                                )}
                                href={link.path}
                                >
                                <motion.span
                                    style={{ x: textX, y: textY }}
                                    className="z-10 relative"
                                >
                                    {link.name}
                                </motion.span>
                                {pathname === link.path ? (
                                    <motion.div
                                    transition={{ type: "spring" }}
                                    layoutId="underline"
                                    className="absolute w-full h-full rounded-xl left-0 bottom-0 bg-red-300"
                                    ></motion.div>
                                ) : null}
                                </MotionLink>
                            </motion.li>
                            )
                        })}
                        {}
                    </AnimatePresence>
                    <logButton />
                </ul>
            </div>
        </section>
    );
}
