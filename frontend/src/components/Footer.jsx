import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <div className={'w-full bg-slate-800'}>
            <div className="container flex justify-around mx-auto">
                <div className='text-blue-300 text-2xl italic font-bold pt-10'>
                    <img src="/HeyBossDarkShort.png" alt="" />
                    <div className="flex gap-3 mt-2">
                        <FaInstagram className='text-white'/>
                        <FaFacebookSquare className='text-white'/>
                        <FaTwitter className='text-white'/>
                    </div>
                </div>
                <div className="flex flex-col pt-10">
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <h5>About</h5>
                    </Link>
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all flex flex-col'>
                        <h5>Contact</h5>
                        <p>example@example.com</p>
                    </Link>
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all flex flex-row items-center gapt-10'>
                        <h5>WhatsApp</h5>
                        <FaWhatsapp className='text-green-500'/>
                    </Link>
                    
                </div>
                <div className="flex flex-col pt-10">
                    <Link to='/privacy-policy' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Privacy Policy</p>
                    </Link>
                    <Link to='/use-terms' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Discounts</p>
                    </Link>
                    <Link to='/use-terms' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Discounts Contidions</p>
                    </Link>
                    <Link to='/use-terms' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Security</p>
                    </Link>
                </div>
                <div className="flex flex-col pt-10">
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Guarantees</p>
                    </Link>
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <p>Use Terms</p>
                    </Link>
                    <Link to='/about' className='text-sm font-light text-slate-200 hover:underline hover:text-teal-500 transition-all'>
                        <h5>Services</h5>
                    </Link>
                </div>
            </div>
            <div className="container mx-auto flex items-center justify-center flex-col">
                <img src="/wompi-logo-white.png" alt="accepted_pays_image_footer" 
                    className='w-40 h-7 object-contain '
                />
                <img src="/pay.png" alt="accepted_pays_image_footer" 
                    className='w-40 h-16 object-contain '
                />
            </div>
            <div className="container mx-auto flex items-center justify-center flex-col">
                <span className='text-gray-500 font-light text-sm pb-5'>2023 HeyBoss. Todos los derechos reservados.</span>
            </div>
        </div>
    )
}

export default Footer