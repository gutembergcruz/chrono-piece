'use client'
import { LuSearch, LuFilter, LuBell, LuUser } from 'react-icons/lu'
import { FiEdit } from 'react-icons/fi'
import logoImg from '@/assets/logo.png'
import Image from 'next/image'
import './styles.scss'

export function Header() {
  return (
   <div className="header-container">
        <div className="header-left">
            <Image src={logoImg} alt="Logo" />
        </div>
        <div className="header-search">
            <input type="text" placeholder='Buscar acontecimentos...' />
            <button onClick={() => alert('Clicou no botão')} className='search-button'><LuSearch size={18} className="search-icon" /></button>
        </div>
   </div>
  );
}