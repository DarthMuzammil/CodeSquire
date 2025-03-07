
import React from 'react';
import { Search, Settings, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Header: React.FC = () => {
  const [isDark, setIsDark] = React.useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setIsDark(!isDark);
    
    toast({
      title: `${isDark ? 'Light' : 'Dark'} theme activated`,
      description: "Your preference has been saved",
      duration: 2000,
    });
  };

  return (
    <header className="w-full backdrop-blur-sm bg-white/80 dark:bg-black/20 border-b border-gray-200 dark:border-gray-800 z-10 transition-all duration-200 ease-in-out">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3H7C5.34315 3 4 4.34315 4 6V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V6C20 4.34315 18.6569 3 17 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 3C8 1.89543 8.89543 1 10 1H14C15.1046 1 16 1.89543 16 3V5C16 6.10457 15.1046 7 14 7H10C8.89543 7 8 6.10457 8 5V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 14H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 18H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-lg font-medium">Code Review Assistant</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search size={16} />
            </div>
            <input
              type="search"
              className="block w-full pl-10 py-2 text-sm rounded-full bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Search reviews..."
            />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={toggleTheme}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Settings size={18} />
          </Button>
          
          <Button
            variant="ghost"
            className="rounded-full hidden sm:flex"
          >
            Help
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
