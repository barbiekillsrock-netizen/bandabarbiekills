import { Zap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'lg';
  className?: string;
}

const Logo = ({ size = 'sm', className = '' }: LogoProps) => {
  const isLarge = size === 'lg';
  
  return (
    <div className={`flex flex-col leading-none select-none ${className}`}>
      {/* BARBIE - Cyan outline */}
      <span
        className={`font-bebas tracking-wider ${
          isLarge ? 'text-6xl md:text-8xl' : 'text-3xl md:text-4xl'
        }`}
        style={{
          WebkitTextStroke: isLarge ? '2px #00FFFF' : '1.5px #00FFFF',
          color: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(0, 255, 255, 0.8))',
        }}
      >
        BARBIE
      </span>
      
      {/* KILLS - Pink outline with Zap icon */}
      <span
        className={`font-bebas tracking-wider flex items-center ${
          isLarge ? 'text-6xl md:text-8xl' : 'text-3xl md:text-4xl'
        }`}
        style={{
          WebkitTextStroke: isLarge ? '2px #FF007F' : '1.5px #FF007F',
          color: 'transparent',
          filter: 'drop-shadow(0 0 10px rgba(255, 0, 127, 0.8))',
        }}
      >
        K
        <Zap 
          className={`${isLarge ? 'w-10 h-10 md:w-14 md:h-14' : 'w-5 h-5 md:w-6 md:h-6'} -mx-1`}
          fill="#FF007F"
          color="#FF007F"
          style={{
            filter: 'drop-shadow(0 0 10px rgba(255, 0, 127, 0.8))',
          }}
        />
        LLS
      </span>
    </div>
  );
};

export default Logo;
