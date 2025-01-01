import User from './User';
import DarkModeSwitcher from './DarkModeSwitcher';
import Logo from '../../images/logo/Skincare_Logo.png'; // Frissített logó
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex w-full bg-gradient-to-r from-[#a76bb5] to-[#7b3586] drop-shadow-md dark:bg-boxdark dark:drop-shadow-none transition-all duration-300">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-md md:px-6 2xl:px-11">
        {/* Logó és márkanev interaktív animációval */}
        <div className="flex items-center gap-4 hover:scale-105 transition-transform duration-300">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src={Logo} 
              alt="BE A CARE Logo" 
              className="h-20 md:h-24 rounded-md shadow-md transform hover:rotate-12 transition-transform duration-500" 
            />
            <span className="text-2xl md:text-3xl font-bold text-white dark:text-lavender-200 transition-colors duration-300">
              BE A CARE
            </span>
          </Link>
        </div>

        {/* Felhasználói és sötét mód kapcsoló */}
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-2">
            {/* Dark Mode Toggler */}
            <DarkModeSwitcher />
          </ul>

          {/* Felhasználói információs blokk */}
          <User />
        </div>
      </div>
    </header>
  );
};

export default Header;
