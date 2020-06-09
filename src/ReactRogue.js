import React, {useRef, useEffect, useState } from 'react';
import InputManager from './InputManager.js';


const ReactRogue = ({width, height, tilesize}) => {
    const canvasRef = useRef();
    const [player, setPlayer] = useState({x: 64, y: 128});
    let inputManager = new InputManager();
    const handleInput = (action, data) => {
        console.log(`handle input: ${action}:${JSON.stringify(data)}`)
        let newPlayer = {...player};
        newPlayer.x += tilesize * data.x;
        newPlayer.y += tilesize * data.y;
        setPlayer(newPlayer);
    }

    useEffect(() => {
        console.log('Bind input');
        inputManager.bindKeys();
        inputManager.subscribe(handleInput)
        return () => {
            inputManager.unbindKeys();
            inputManager.unsubscribe(handleInput);
        };
    });

    useEffect(()=> {
        console.log('Draw the canvas');
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, width * tilesize, height * tilesize);
        context.fillStyle='#000';
        context.fillRect(player.x, player.y, 16, 16);
    });
    return (
        <canvas 
            ref={canvasRef}
            width= {width * tilesize} 
            height= {height * tilesize} 
            style={{border: '1px solid black'}}
        ></canvas>
    );
};

export default ReactRogue;