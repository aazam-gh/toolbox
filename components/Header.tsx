import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        {/* Add navigation links or other content here */}
      </div>
    </header>
  );
};

export default Header;
