document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main")

  const canvas = document.createElement("canvas")
  canvas.id = "canvas"
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  main.appendChild(canvas)
  const m = generateMatrix(4)

  const ctx = canvas.getContext('2d');
  renderMatrix(ctx, canvas, m)


})

function kaprekarIterations(num) {
  if (num < 1000 || num === 1111 || num === 2222 || num === 3333 || num === 4444 || num === 5555 || num === 6666 || num === 7777 || num === 8888 || num === 9999) {
    return 0; // Repdigit numbers do not reach Kaprekar's constant.
  }

  let iterations = 0;
  let currentNumber = num;

  while (currentNumber !== 6174) {
    // Convert the number to a string to work with individual digits
    let digits = currentNumber.toString().padStart(4, '0'); // Ensure it's 4 digits, pad with leading zeros if needed

    // Sort the digits in descending and ascending order
    let descending = digits.split('').sort((a, b) => b - a).join('');
    let ascending = digits.split('').sort((a, b) => a - b).join('');

    // Subtract the smaller number from the larger one
    currentNumber = parseInt(descending) - parseInt(ascending);

    iterations++;
  }

  return iterations;
}

function generateMatrix(numOfDigits) {

  const max = 10 ** numOfDigits
  const matrixSideLength = Math.sqrt(max)

  return new Array(matrixSideLength)
    .fill()
    .map((_, i) =>
      new Array(matrixSideLength)
        .fill()
        .map((_, j) => kaprekarIterations((i * matrixSideLength) + j))
    ).splice(10, matrixSideLength)
}

const colors = [
  'red',        // 1. Red
  'orange',     // 2. Orange
  'yellow',     // 3. Yellow
  'green',      // 4. Green
  'blue',       // 5. Blue
  'indigo',     // 6. Indigo
  'violet'      // 7. Violet
];


function renderMatrix(ctx, canvas, m) {

  const cellHeight = canvas.height / m.length;   // Divide height by number of rows
  // const cellWidth = canvas.width / m[0].length;  // Divide width by number of columns
  const cellWidth = cellHeight

  const padding = 10; // space between cells

  const rows = m.length;
  const cols = m[0].length;

  const offsetX = (canvas.width / 2) - (cellWidth * cols / 2)

  let max = 0
  // Loop through each row and column of the matrix
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const colorIndex = m[row][col];  // Get the color index from the matrix
      const color = colors[colorIndex];     // Get the corresponding color
      if (colorIndex > max) {
        max = colorIndex
      }

      // Draw a rectangle for each matrix value
      ctx.fillStyle = color;
      ctx.fillRect(col * cellWidth + offsetX, row * cellHeight, cellWidth, cellHeight);

    }
  }

  console.log(max)
}
