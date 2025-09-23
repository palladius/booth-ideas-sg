import { useState } from 'react';

const racletteCheeseCalories = 350;
const potatoCalories = 77;

export default function RacletteForm() {
  const [cheeseSlices, setCheeseSlices] = useState(0);
  const [potatoes, setPotatoes] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const calculateCalories = () => {
    const cheese = racletteCheeseCalories * cheeseSlices;
    const potato = potatoCalories * potatoes;
    setTotalCalories(cheese + potato);
  };

  return (
    <div className="form-container">
      <h2>Raclette</h2>
      <div className="form-group">
        <label htmlFor="cheese-slices">Cheese Slices:</label>
        <input type="number" id="cheese-slices" value={cheeseSlices} onChange={(e) => setCheeseSlices(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="potatoes">Potatoes:</label>
        <input type="number" id="potatoes" value={potatoes} onChange={(e) => setPotatoes(e.target.value)} />
      </div>
      <button onClick={calculateCalories}>Calculate</button>
      <h3>Total Calories: {totalCalories.toFixed(2)}</h3>
    </div>
  );
}