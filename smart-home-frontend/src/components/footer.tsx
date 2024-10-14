import React from 'react';
import '../App.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>Smart Home</p>
      <p>
        Desenvolvido por{' '}
        <a href="https://github.com/Marcos-Petry" target="_blank" rel="noopener noreferrer">
          Marcos Petry
        </a>{' '}
        e{' '}
        <a href="https://github.com/Nicolas-klaumann" target="_blank" rel="noopener noreferrer">
          Nicolas Klaumann
        </a>
      </p>
    </footer>
  );
};

export default Footer;