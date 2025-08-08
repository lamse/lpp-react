import React from 'react';

const TechStackModal = () => {
  return (
    <div id="techStackModal" className="fixed z-10 inset-0 overflow-y-auto mt-4 hidden">
      <div className="flex items-center justify-end mr-52">
        <div className="bg-white w-1/2 p-6 rounded shadow-md border">
          <div className="flex justify-end mb-4">
            <button id="closeTechStack" className="text-gray-700 hover:text-red-500">
              <span className="material-icons">close</span>
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Java</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Spring Data JPA</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/thymeleaf/thymeleaf-original.svg"
                   alt="Thymeleaf" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Thymeleaf</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg"
                   alt="MariaDB" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">MariaDB</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
                   alt="TailwindCSS" className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">TailwindCSS</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">Git</span>
            </div>
            <div
              className="flex flex-col items-center p-4 bg-gray-600 rounded-xl shadow-lg transition transform hover:scale-105 hover:bg-gray-500">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" alt="jQuery"
                   className="w-12 h-12 mb-2"/>
              <span className="text-gray-300">jQuery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechStackModal;
