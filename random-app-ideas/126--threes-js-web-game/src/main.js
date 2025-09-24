import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    preload() {
        // No assets to load for this basic example
    }

    create() {
        const gridSize = 4;
        const cellSize = 100;
        const startX = (this.cameras.main.width - (gridSize * cellSize)) / 2;
        const startY = (this.cameras.main.height - (gridSize * cellSize)) / 2;

        this.add.text(this.cameras.main.width / 2, startY - 50, 'Threes JS', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5);
        this.scoreText = this.add.text(this.cameras.main.width / 2, startY - 20, 'Score: 0', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        const graphics = this.add.graphics();
        graphics.fillStyle(0x333333, 1);
        graphics.fillRect(startX - 10, startY - 10, (gridSize * cellSize) + 20, (gridSize * cellSize) + 20);


        this.grid = [];
        for (let y = 0; y < gridSize; y++) {
            this.grid[y] = [];
            for (let x = 0; x < gridSize; x++) {
                const cellX = startX + x * cellSize + cellSize / 2;
                const cellY = startY + y * cellSize + cellSize / 2;
                const cell = this.add.rectangle(cellX, cellY, cellSize - 10, cellSize - 10, 0x555555);
                this.grid[y][x] = {
                    cell: cell,
                    value: 0,
                    text: this.add.text(cellX, cellY, '0', { fontSize: '32px', fill: '#fff' }).setOrigin(0.5)
                };
            }
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 500,
    height: 600,
    scene: [GameScene],
    backgroundColor: '#111'
};

const game = new Phaser.Game(config);