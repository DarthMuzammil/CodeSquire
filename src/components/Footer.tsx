
import React from 'react';
import { Heart, Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 py-6 bg-white/80 dark:bg-black/20 backdrop-blur-sm transition-all duration-200 ease-in-out">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Code Review Assistant
          </p>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-sm">
          <a 
            href="#privacy" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            Privacy
          </a>
          <a 
            href="#terms" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            Terms
          </a>
          <a 
            href="#about" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
          >
            About
          </a>
          <a 
            href="https://github.com" 
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} className="mr-1" />
            <span>GitHub</span>
          </a>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> by Code Review Team
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
