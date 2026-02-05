/**
 * Home Page - Animations and Preview Renders
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mini maze preview on homepage
    const mazePreviewCanvas = document.getElementById('maze-preview-canvas');

    if (mazePreviewCanvas) {
        const ctx = mazePreviewCanvas.getContext('2d');
        const container = mazePreviewCanvas.parentElement;

        // Set canvas size
        mazePreviewCanvas.width = container.clientWidth;
        mazePreviewCanvas.height = container.clientHeight;

        // Draw a simple pre-generated maze pattern
        drawMiniMaze(ctx, mazePreviewCanvas.width, mazePreviewCanvas.height);
    }

    // Smooth scroll for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('.projects-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
});

function drawMiniMaze(ctx, width, height) {
    const cellSize = 12;
    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    // Colors
    const wallColor = '#12121a';
    const pathColor = '#6366f1';

    // Fill background
    ctx.fillStyle = wallColor;
    ctx.fillRect(0, 0, width, height);

    // Generate a simple maze pattern using randomized DFS-like approach
    const visited = new Set();
    const stack = [];

    // Start position
    const startX = 1;
    const startY = 1;
    stack.push({ x: startX, y: startY });
    visited.add(`${startX},${startY}`);

    // Simple maze generation
    while (stack.length > 0) {
        const current = stack[stack.length - 1];
        const neighbors = getUnvisitedNeighbors(current.x, current.y, cols, rows, visited);

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            visited.add(`${next.x},${next.y}`);

            // Draw path
            ctx.fillStyle = pathColor;
            ctx.globalAlpha = 0.3;

            // Current cell
            ctx.fillRect(current.x * cellSize, current.y * cellSize, cellSize, cellSize);

            // Path between cells
            const midX = (current.x + next.x) / 2;
            const midY = (current.y + next.y) / 2;
            ctx.fillRect(midX * cellSize, midY * cellSize, cellSize, cellSize);

            // Next cell
            ctx.fillRect(next.x * cellSize, next.y * cellSize, cellSize, cellSize);

            stack.push(next);
        } else {
            stack.pop();
        }
    }

    ctx.globalAlpha = 1;
}

function getUnvisitedNeighbors(x, y, cols, rows, visited) {
    const neighbors = [];
    const directions = [
        { dx: 0, dy: -2 },  // Up
        { dx: 2, dy: 0 },   // Right
        { dx: 0, dy: 2 },   // Down
        { dx: -2, dy: 0 }   // Left
    ];

    for (const dir of directions) {
        const nx = x + dir.dx;
        const ny = y + dir.dy;

        if (nx > 0 && nx < cols - 1 && ny > 0 && ny < rows - 1 && !visited.has(`${nx},${ny}`)) {
            neighbors.push({ x: nx, y: ny });
        }
    }

    return neighbors;
}

// Add hover animations for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
