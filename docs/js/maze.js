/**
 * Maze Generator Visualization
 * Implements Prim's Algorithm for maze generation with step-by-step animation
 */

class MazeGenerator {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 25;
        this.height = 25;
        this.cellSize = 0;
        this.maze = [];
        this.walls = [];
        this.visited = new Set();
        this.isGenerating = false;
        this.animationId = null;
        this.speed = 100;
        this.wallsRemoved = 0;

        // Colors
        this.colors = {
            wall: '#12121a',
            path: '#f0f0f5',
            frontier: '#6366f1',
            start: '#10b981',
            end: '#ef4444',
            border: '#2a2a3a'
        };

        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const maxWidth = container.clientWidth - 48; // Account for padding
        const maxHeight = 500;

        // Calculate cell size to fit the canvas
        const cellWidth = Math.floor(maxWidth / this.width);
        const cellHeight = Math.floor(maxHeight / this.height);
        this.cellSize = Math.min(cellWidth, cellHeight, 20);

        this.canvas.width = this.width * this.cellSize;
        this.canvas.height = this.height * this.cellSize;

        this.draw();
    }

    setDimensions(width, height) {
        this.width = Math.max(5, Math.min(50, width));
        this.height = Math.max(5, Math.min(50, height));
        this.resizeCanvas();
        this.reset();
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    reset() {
        this.stop();
        this.maze = [];
        this.walls = [];
        this.visited = new Set();
        this.wallsRemoved = 0;

        // Initialize maze with all walls
        for (let y = 0; y < this.height; y++) {
            this.maze[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.maze[y][x] = {
                    x,
                    y,
                    walls: { top: true, right: true, bottom: true, left: true },
                    visited: false
                };
            }
        }

        this.updateStats();
        this.draw();
    }

    stop() {
        this.isGenerating = false;
        if (this.animationId) {
            clearTimeout(this.animationId);
            this.animationId = null;
        }
    }

    getKey(x, y) {
        return `${x},${y}`;
    }

    addWalls(cell) {
        const { x, y } = cell;
        const directions = [
            { dx: 0, dy: -1, wall: 'top', opposite: 'bottom' },
            { dx: 1, dy: 0, wall: 'right', opposite: 'left' },
            { dx: 0, dy: 1, wall: 'bottom', opposite: 'top' },
            { dx: -1, dy: 0, wall: 'left', opposite: 'right' }
        ];

        for (const dir of directions) {
            const nx = x + dir.dx;
            const ny = y + dir.dy;

            if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
                const neighbor = this.maze[ny][nx];
                if (!neighbor.visited) {
                    this.walls.push({
                        cell,
                        neighbor,
                        wall: dir.wall,
                        opposite: dir.opposite
                    });
                }
            }
        }
    }

    async generate() {
        if (this.isGenerating) return;

        this.reset();
        this.isGenerating = true;

        // Start from position (1, 1) to leave border
        const startX = 1;
        const startY = 1;
        const startCell = this.maze[startY][startX];
        startCell.visited = true;
        this.visited.add(this.getKey(startX, startY));

        this.addWalls(startCell);

        await this.step();
    }

    async step() {
        if (!this.isGenerating) return;

        if (this.walls.length === 0) {
            this.isGenerating = false;
            this.draw();
            return;
        }

        // Pick a random wall
        const randomIndex = Math.floor(Math.random() * this.walls.length);
        const wallData = this.walls[randomIndex];
        this.walls.splice(randomIndex, 1);

        const { cell, neighbor, wall, opposite } = wallData;

        // If the neighbor hasn't been visited, remove the wall
        if (!neighbor.visited) {
            // Remove walls between cells
            cell.walls[wall] = false;
            neighbor.walls[opposite] = false;
            this.wallsRemoved++;

            // Mark neighbor as visited
            neighbor.visited = true;
            this.visited.add(this.getKey(neighbor.x, neighbor.y));

            // Add neighbor's walls to the list
            this.addWalls(neighbor);
        }

        this.updateStats();
        this.draw();

        // Continue animation
        this.animationId = setTimeout(() => this.step(), this.speed);
    }

    updateStats() {
        const totalCells = this.width * this.height;
        document.getElementById('stat-cells').textContent = totalCells;
        document.getElementById('stat-visited').textContent = this.visited.size;
        document.getElementById('stat-walls').textContent = this.wallsRemoved;
    }

    draw() {
        const ctx = this.ctx;
        const size = this.cellSize;

        // Clear canvas
        ctx.fillStyle = this.colors.wall;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw cells
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.maze[y]?.[x];
                if (!cell) continue;

                const px = x * size;
                const py = y * size;

                // Draw cell background
                if (cell.visited) {
                    // Check if this cell is in the frontier (has unvisited neighbors)
                    let isFrontier = false;
                    if (this.isGenerating) {
                        for (const w of this.walls) {
                            if (w.cell === cell || w.neighbor === cell) {
                                isFrontier = true;
                                break;
                            }
                        }
                    }

                    if (isFrontier) {
                        ctx.fillStyle = this.colors.frontier;
                    } else {
                        ctx.fillStyle = this.colors.path;
                    }
                } else {
                    ctx.fillStyle = this.colors.wall;
                }

                ctx.fillRect(px, py, size, size);

                // Draw walls
                ctx.strokeStyle = this.colors.wall;
                ctx.lineWidth = 2;
                ctx.beginPath();

                if (cell.walls.top) {
                    ctx.moveTo(px, py);
                    ctx.lineTo(px + size, py);
                }
                if (cell.walls.right) {
                    ctx.moveTo(px + size, py);
                    ctx.lineTo(px + size, py + size);
                }
                if (cell.walls.bottom) {
                    ctx.moveTo(px, py + size);
                    ctx.lineTo(px + size, py + size);
                }
                if (cell.walls.left) {
                    ctx.moveTo(px, py);
                    ctx.lineTo(px, py + size);
                }

                ctx.stroke();
            }
        }

        // Draw start and end markers
        if (this.visited.size > 0) {
            // Start (green)
            ctx.fillStyle = this.colors.start;
            ctx.fillRect(1 * size + 4, 1 * size + 4, size - 8, size - 8);

            // End (red) - only if generation is complete
            if (!this.isGenerating || this.walls.length === 0) {
                ctx.fillStyle = this.colors.end;
                const endX = this.width - 2;
                const endY = this.height - 2;
                ctx.fillRect(endX * size + 4, endY * size + 4, size - 8, size - 8);
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('maze-canvas');
    const generator = new MazeGenerator(canvas);
    generator.reset();

    // Generate button
    document.getElementById('generate-btn').addEventListener('click', () => {
        generator.generate();
    });

    // Reset button
    document.getElementById('reset-btn').addEventListener('click', () => {
        generator.reset();
    });

    // Width input
    document.getElementById('maze-width').addEventListener('change', (e) => {
        const width = parseInt(e.target.value) || 25;
        const height = parseInt(document.getElementById('maze-height').value) || 25;
        generator.setDimensions(width, height);
    });

    // Height input
    document.getElementById('maze-height').addEventListener('change', (e) => {
        const height = parseInt(e.target.value) || 25;
        const width = parseInt(document.getElementById('maze-width').value) || 25;
        generator.setDimensions(width, height);
    });

    // Speed select
    document.getElementById('maze-speed').addEventListener('change', (e) => {
        generator.setSpeed(parseInt(e.target.value));
    });
});
