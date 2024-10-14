import React from 'react';

interface TVProps {
  channelImage: string; // Prop para a imagem do canal
  isOn: boolean; // Prop para indicar se a TV está ligada ou desligada
}

const TV: React.FC<TVProps> = ({ channelImage, isOn }) => {
  return (
    <div className="tv">
      {isOn ? (
        <div className="tv-screen">
          <img src={channelImage} alt="Canal da TV" />
        </div>
      ) : (
        <div className="tv-off">A TV está desligada</div>
      )}
    </div>
  );
};

export default TV;
