import React from 'react';

interface LightControlProps {
  room: string;
  lights: boolean;
  onToggle: () => void;
}

const LightControl: React.FC<LightControlProps> = ({ room, lights, onToggle }) => {
  return (
    <div>
      <button onClick={onToggle}>
        {lights ? 'A luz está acesa' : 'A luz está apagada'}
      </button>
      {lights ? (
        <img className="imgLuz" src="/imgLuzAcesa.png" alt="Luz acesa" />
      ) : (
        <img className="imgLuz" src="/imgLuzApagada.png" alt="Luz apagada" />
      )}
    </div>
  );
};

export default LightControl;
