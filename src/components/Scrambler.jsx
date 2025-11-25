import React, { useRef, useState, useEffect } from 'react';
import ScramblerUtils from "../utils/ScramblerUtil";

export default function Scrambler() {
    const [text, setText] = useState('Liste de noel');
    const scramblerRef = useRef(new ScramblerUtils());

    useEffect(() => {
        // call scramble function with the text to be scrambled and handler.
        const inverval = setInterval(()=> {
            scramblerRef.current.scramble(()=>generateTitle(text), setText);
        }, 5000);
    }, []);

    useEffect(() => {
        // Lance l'intervalle
        const intervalId = setInterval(() => {
            scramblerRef.current.scramble(text, setText);
        }, 5000); // toutes les 5 secondes

        // Nettoyage à la destruction du composant
        return () => clearInterval(intervalId);
    }, [])

    function generateTitle() {
        const words = [
            "Super", "Digital", "Fête", "technologique", "Rock",
            "Célébration", "Reveillon", "Festivité", "Joyeux", "Impact",
            "Optimisation", "Surprise", "Mega", "Synergie"
        ];

        const numberOfWords = Math.floor(Math.random() * 3) + 2;
        const selected = [];

        for (let i = 0; i < numberOfWords; i++) {
            const word = words[Math.floor(Math.random() * words.length)];
            selected.push(word);
        }

        return selected.join(" ");
    }

    return (<h1>{text}</h1>)

}
