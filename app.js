// Configuration for circle colors (circle size will be dynamic)
const config = {
    defaultColor: "red",
    dragColor: "green"
};

// Get the canvas and context
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Circle object (radius and position will be updated dynamically)
let circle = {
    x: 0,
    y: 0,
    radius: 0,
    color: config.defaultColor,
    isDragging: false
};

// Function to resize the canvas and update the circle size and position
function resizeCanvas() {
    canvas.width = window.innerWidth;  // Set canvas width to window width
    canvas.height = window.innerHeight; // Set canvas height to window height

    // Set circle radius to be proportional to the canvas size
    circle.radius = Math.min(canvas.width, canvas.height) * 0.1; // 10% of the smaller dimension
    circle.x = canvas.width / 2; // Center the circle horizontally
    circle.y = canvas.height / 2; // Center the circle vertically

    drawCircle(); // Redraw the circle with the new size
}

// Function to draw the circle
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2); // Draw circle
    ctx.fillStyle = circle.color; // Set fill color
    ctx.fill(); // Fill the circle
    ctx.closePath();
}

// Check if the point (x, y) is inside the circle
function isPointInCircle(x, y) {
    const dist = Math.sqrt((x - circle.x) ** 2 + (y - circle.y) ** 2);
    return dist < circle.radius;
}

// Event listeners for mouse events
canvas.addEventListener('mousedown', (event) => {
    const mouseX = event.offsetX;
    const mouseY = event.offsetY;

    if (isPointInCircle(mouseX, mouseY)) {
        circle.isDragging = true;
        circle.color = config.dragColor; // Change color to green when dragging
        drawCircle(); // Redraw with updated color
    }
});

canvas.addEventListener('mousemove', (event) => {
    if (circle.isDragging) {
        circle.x = event.offsetX;
        circle.y = event.offsetY;
        drawCircle(); // Redraw the circle at new position
    }
});

canvas.addEventListener('mouseup', () => {
    if (circle.isDragging) {
        circle.isDragging = false;
        circle.color = config.defaultColor; // Revert to red
        drawCircle(); // Redraw with updated color
    }
});

// Event listeners for touch events
canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    const touchX = touch.clientX - canvas.getBoundingClientRect().left;
    const touchY = touch.clientY - canvas.getBoundingClientRect().top;

    if (isPointInCircle(touchX, touchY)) {
        circle.isDragging = true;
        circle.color = config.dragColor; // Change color to green when dragging
        drawCircle(); // Redraw with updated color
    }
});

canvas.addEventListener('touchmove', (event) => {
    if (circle.isDragging) {
        const touch = event.touches[0];
        circle.x = touch.clientX - canvas.getBoundingClientRect().left;
        circle.y = touch.clientY - canvas.getBoundingClientRect().top;
        drawCircle(); // Redraw the circle at new position
    }
});

canvas.addEventListener('touchend', () => {
    if (circle.isDragging) {
        circle.isDragging = false;
        circle.color = config.defaultColor; // Revert to red
        drawCircle(); // Redraw with updated color
    }
});

// Prevent default scrolling behavior on touch move
canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
}, { passive: false });

// Resize canvas and update circle size when window resizes
window.addEventListener('resize', resizeCanvas);

// Initial setup and draw
resizeCanvas();
