document.getElementById('plan-route').addEventListener('click', () => {
    const startPoint = document.getElementById('start-point').value;
    const endPoint = document.getElementById('end-point').value;

    if (startPoint && endPoint) {
        // Simulate route planning
        const distance = (Math.random() * 100).toFixed(1);
        const elevation = Math.floor(Math.random() * 2000);
        const effort = ['Easy', 'Moderate', 'Hard', 'Very Hard'][Math.floor(Math.random() * 4)];

        document.getElementById('distance').textContent = distance;
        document.getElementById('elevation').textContent = elevation;
        document.getElementById('effort').textContent = effort;
    } else {
        alert('Please enter a start and end point.');
    }
});
