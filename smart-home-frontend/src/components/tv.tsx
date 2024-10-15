import React from 'react';

// Definição das propriedades (props) que o componente TVProps espera receber
interface TVProps {
  canalImage: string;
  isOn: boolean;
}

// Componente funcional que representa a TV
const TV: React.FC<TVProps> = ({ canalImage, isOn }) => {
  return (
    <div className="tv">
      {isOn ? (
        <div className="tv-screen">
          <img src={canalImage} alt="Canal da TV" />
        </div>
      ) : (
        <div className="tv-off">A TV está desligada</div>
      )}
    </div>
  );
};

export default TV;