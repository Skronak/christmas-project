import React, { useRef, useState } from "react"
import { useScramble } from "use-scramble"

const texts = [
    "Application de gestion des cadeaux de noël ",
    "Pour un reveillon plein de magie 🎄",
    "Avec plein de cadeaux 🎁",
    "Et plus de fichier Excël",
    "Et sans soucis (sauf si le site tombe",
    "La ce serait pas de bol !",
    "[...]",
    "Allez il est temps de se connecter !",
    "[...]",
    "Juste la ↓",
    "[...]",
    "Selectionne ton nom dans la liste ↓",
    "↓↓↓↓↓",
    "L'animation est terminé il faut partir...",
    "[...]",
    "Il n'y a plus rien après",
    "OH MON DIEU DERRIERE TOI !! ",
    "Je t'ai eu, je boucle !"
]

export const ScrambledTitle = () => {
    const [index, setIndex] = useState(0)

    const loopRef = useRef();

    const { ref, replay } = useScramble({
        text: texts[index],
        onAnimationStart: () => {
            clearInterval(loopRef.current)
        },
        onAnimationEnd: () => {
            clearInterval(loopRef.current)
            loopRef.current = setTimeout(() => {
                setIndex((index) => (index < texts.length - 1 ? index + 1 : 0))
            }, 5000)
        },
    })

    return  <p className="intro" aria-label={texts[index]} ref={ref} onClick={replay} />
}
