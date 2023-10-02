import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/images/baldurs-gate.jpg", matched: false },
  { src: "/images/elden-ring.jpg", matched: false },
  { src: "/images/final-fantasy.png", matched: false },
  { src: "/images/god-of-war.jpg", matched: false },
  { src: "/images/grand-turismo.jpg", matched: false },
  { src: "/images/hogwarts-legacy.jpg", matched: false },
  { src: "/images/kingdom-hearts.jpg", matched: false },
  { src: "/images/red-dead-redemption.jpg", matched: false },
  { src: "/images/resident-evil.jpg", matched: false },
  { src: "/images/witcher.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    setDisabled(false);
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    if (!firstChoice) {
      setFirstChoice(card);
      console.log("first");
    } else {
      setSecondChoice(card);
      console.log("second");
    }
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else return card;
          });
        });
        setFirstChoice(null);
        setSecondChoice(null);

        setTimeout(() => {
          setDisabled(false);
        }, 1000);
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Memory Match</h1>
        <button onClick={shuffleCards}>New Game</button>
      </header>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
