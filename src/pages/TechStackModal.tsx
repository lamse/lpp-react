import React from 'react';
import Close from '@mui/icons-material/Close';

interface TechStackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TechStackModal: React.FC<TechStackModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto mt-4">
      <div className="flex items-center justify-end mr-52">
        <div className="bg-white w-1/2 p-6 rounded shadow-md border">
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-700 hover:text-red-500">
              <Close/>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">React</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">TypeScript</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/zustand/zustand-original.svg"
                   alt="Zustand" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Zustand</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg"
                   alt="React Router" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">React Router</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                   alt="TailwindCSS" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">TailwindCSS</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" alt="Material UI"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Material UI</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/axios/axios-plain.svg" alt="Axios"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Axios</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="gh-pages"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">gh-pages</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Git</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;
