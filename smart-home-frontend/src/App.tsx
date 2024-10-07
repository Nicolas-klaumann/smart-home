import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const App: React.FC = () => {
  const [lights, setLights] = useState(false);

  useEffect(() => {
    socket.on('lightStatus', (status: boolean) => {
      setLights(status);
    });

    return () => {
      socket.off('lightStatus');
    };
  }, []);

  const toggleLights = () => {
    const newStatus = !lights;
    setLights(newStatus);
    socket.emit('toggleLights', newStatus);
  };

  return (
    <div>
      <h1>Smart Home</h1>
      <div>
        <button onClick={toggleLights}>
          {lights ? 'Turn Off' : 'Turn On'} Lights
        </button>
      </div>
    </div>
  );
};

export default App;
