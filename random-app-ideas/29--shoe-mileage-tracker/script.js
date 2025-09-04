document.addEventListener('DOMContentLoaded', () => {
    const shoeNameInput = document.getElementById('shoe-name');
    const addShoeBtn = document.getElementById('add-shoe-btn');
    const shoeList = document.getElementById('shoe-list');

    let shoes = JSON.parse(localStorage.getItem('shoes')) || [];

    const saveShoes = () => {
        localStorage.setItem('shoes', JSON.stringify(shoes));
    };

    const renderShoes = () => {
        shoeList.innerHTML = '';
        shoes.forEach((shoe, index) => {
            const shoeItem = document.createElement('div');
            shoeItem.classList.add('shoe-item');
            if (shoe.mileage >= 500) {
                shoeItem.classList.add('alert');
            }

            shoeItem.innerHTML = `
                <div class="shoe-info">
                    <span class="shoe-item-name">${shoe.name}</span>
                    <span class="shoe-item-mileage">${shoe.mileage} miles</span>
                </div>
                <div class="shoe-actions">
                    <input type="number" placeholder="miles" id="mileage-input-${index}" min="0">
                    <button data-index="${index}">Add Miles</button>
                </div>
            `;
            shoeList.appendChild(shoeItem);
        });
    };

    addShoeBtn.addEventListener('click', () => {
        const name = shoeNameInput.value.trim();
        if (name) {
            shoes.push({ name, mileage: 0 });
            shoeNameInput.value = '';
            saveShoes();
            renderShoes();
        }
    });

    shoeList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const index = e.target.dataset.index;
            const mileageInput = document.getElementById(`mileage-input-${index}`);
            const miles = parseInt(mileageInput.value, 10);
            if (!isNaN(miles) && miles > 0) {
                shoes[index].mileage += miles;
                mileageInput.value = '';
                saveShoes();
                renderShoes();
            }
        }
    });

    renderShoes();
});
