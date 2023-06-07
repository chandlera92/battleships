const base = 26;

/**
 * Generates the y-axis labels for the game board grid based on the given size.
 * @param size The size of the game board grid.
 * @returns An array of y-axis labels.
 */
export function generateXAxis(size: number): string[] {
  const labels: string[] = [];
  let index = 0;
  let labelLength = 1;

  while (labels.length < size) {
    const label = generateLabel(index, labelLength);
    labels.push(label);

    index++;
    if (index === Math.pow(base, labelLength)) {
      index = 0;
      labelLength++;
    }
  }

  return labels;
}

/**
 * Generates a single label for the y-axis based on the given index and label length.
 * @param index The index of the label.
 * @param length The length of the label.
 * @returns The generated label.
 */
function generateLabel(index: number, length: number): string {
  let label = "";
  while (label.length < length) {
    label = String.fromCharCode(97 + (index % base)) + label;
    index = Math.floor(index / base);
  }
  return label;
}
