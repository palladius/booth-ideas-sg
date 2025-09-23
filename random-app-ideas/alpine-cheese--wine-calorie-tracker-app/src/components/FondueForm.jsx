import { useState } from 'react';

const cheeseCalories = {
  gruyere: 413,
  vacherin: 389,
  appenzeller: 400,
};

const breadCalories = {
  white: 265,
  whole_wheat: 247,
};

export default function FondueForm() {
  const [cheeseType, setCheeseType] = useState('gruyere');
  const [cheeseAmount, setCheeseAmount] = useState(0);
  const [breadType, setBreadType] = useState('white');
  const [breadAmount, setBreadAmount] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const calculateCalories = () => {
    const cheese = cheeseCalories[cheeseType] * (cheeseAmount / 100);
    const bread = breadCalories[breadType] * (breadAmount / 100);
    setTotalCalories(cheese + bread);
  };

  return (
    <div className="form-container">
      <h2>Fondue</h2>
      <div className="form-group">
        <label htmlFor="cheese-type">Cheese Type:</label>
        <select id="cheese-type" value={cheeseType} onChange={(e) => setCheeseType(e.target.value)}>
          <option value="gruyere">Gruyère</option>
          <option value="vacherin">Vacherin Fribourgeois</option>
          <option value="appenzeller">Appenzeller</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="cheese-amount">Cheese Amount (g):</label>
        <input type="number" id="cheese-amount" value={cheeseAmount} onChange={(e) => setCheeseAmount(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="bread-type">Bread Type:</label>
        <select id="bread-type" value={breadType} onChange={(e) => setBreadType(e.target.value)}>
          <option value="white">White Bread</option>
          <option value="whole_wheat">Whole Wheat Bread</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="bread-amount">Bread Amount (g):</label>
        <input type="number" id="bread-amount" value={breadAmount} onChange={(e) => setBreadAmount(e.target.value)} />
      </div>
      <button onClick={calculateCalories}>Calculate</button>
      <h3>Total Calories: {totalCalories.toFixed(2)}</h3>
    </div>
  );
}