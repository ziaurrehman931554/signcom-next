'use client'

import React, {useState} from 'react';
import Image from 'next/image';
import '../app/globals.css'

export default function Nav() {
    const [ search, setSearch ] = useState('')
    return (
        <section className="w-full nav bg-slate-700 text-white flex justify-between items-center px-4 ">
            <div className="h-14 w-14 rounded-full">
                <a href='/' className='flex justify-center items-center px-5 w-36'>
                    <Image src={require('../public/assets/logo.png')} alt="SignCom" className="rounded-full object-cover mr-3" height={50} width={50} />
                    <h1 className='text-blue-400 mt-1'>SignCom</h1>
                </a>
            </div>
            <div className='flex items-center gap-2 ml-60 w-96 p-2 rounded-full bg-cyan-600'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-transparent outline-none border-none placeholder-slate-100 text-black transition-all"  placeholder="🔎 Search" />
            </div>
            <div className="flex-row p-1 gap-3">
                <a href="/" className='p-2 rounded-lg bg-cyan-600 m-2 hover:text-black transition-all'>Home</a>
                <a href="/about" className='p-2 rounded-lg bg-cyan-600 m-2 hover:text-black transition-all'>About</a>
                <a href="/login" className='p-3 rounded-2xl bg-red-600 m-2 hover:text-black transition-all'>Get Access</a>
            </div>
        </section>
    );
}
