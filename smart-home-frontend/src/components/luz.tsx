import React from 'react';

// Definição das propriedades (props) que o componente LuzControl espera receber
interface LuzControlProps {
  room: string;
  Luz: boolean;
  onToggle: () => void;
}

// Componente funcional para controlar o estado da luz
const LuzControl: React.FC<LuzControlProps> = ({ room, Luz, onToggle }) => {
  return (
    <div>
      <button onClick={onToggle}>
        {Luz ? 'A luz está acesa' : 'A luz está apagada'}
      </button>
      {Luz ? (
        <img className="imgLuz" src="/imgLuzAcesa.png" alt="Luz acesa" />
      ) : (
        <img className="imgLuz" src="/imgLuzApagada.png" alt="Luz apagada" />
      )}
    </div>
  );
};

export default LuzControl;