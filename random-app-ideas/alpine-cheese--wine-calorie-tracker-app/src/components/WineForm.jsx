import { useState } from 'react';

const wineCalories = {
  red: 85,
  white: 82,
};

export default function WineForm() {
  const [wineType, setWineType] = useState('red');
  const [wineGlasses, setWineGlasses] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);

  const calculateCalories = () => {
    const wine = wineCalories[wineType] * wineGlasses;
    setTotalCalories(wine);
  };

  return (
    <div className="form-container">
      <h2>Wine</h2>
      <div className="form-group">
        <label htmlFor="wine-type">Wine Type:</label>
        <select id="wine-type" value={wineType} onChange={(e) => setWineType(e.target.value)}>
          <option value="red">Red Wine</option>
          <option value="white">White Wine</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="wine-glasses">Glasses:</label>
        <input type="number" id="wine-glasses" value={wineGlasses} onChange={(e) => setWineGlasses(e.target.value)} />
      </div>
      <button onClick={calculateCalories}>Calculate</button>
      <h3>Total Calories: {totalCalories.toFixed(2)}</h3>
    </div>
  );
}