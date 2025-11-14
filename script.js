let array = [];
let arraySize = 50;
let animationSpeed = 50;
let isSorting = false;
let sortStartTime = 0;
const HYBRID_THRESHOLD = 32;

const arrayContainer = document.getElementById('arrayContainer');
const generateArrayBtn = document.getElementById('generateArray');
const arraySizeSlider = document.getElementById('arraySize');
const arraySizeValue = document.getElementById('arraySizeValue');
const animationSpeedSlider = document.getElementById('animationSpeed');
const animationSpeedValue = document.getElementById('animationSpeedValue');
const algorithmButtons = document.querySelectorAll('.btn-algorithm');
const algorithmName = document.getElementById('algorithmName');
const sortingTime = document.getElementById('sortingTime');

function generateArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 380) + 20);
  }
  renderArray();
}

function renderArray() {
  arrayContainer.innerHTML = '';
  const barWidth = Math.max(2, Math.floor((arrayContainer.offsetWidth - arraySize * 2) / arraySize));

  array.forEach((value) => {
    const bar = document.createElement('div');
    bar.classList.add('array-bar');
    bar.style.height = `${value}px`;
    bar.style.width = `${barWidth}px`;
    arrayContainer.appendChild(bar);
  });
}

function disableControls() {
  isSorting = true;
  generateArrayBtn.disabled = true;
  arraySizeSlider.disabled = true;
  algorithmButtons.forEach(btn => btn.disabled = true);
}

function enableControls() {
  isSorting = false;
  generateArrayBtn.disabled = false;
  arraySizeSlider.disabled = false;
  algorithmButtons.forEach(btn => btn.disabled = false);
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function updateBar(index, state = 'default') {
  const bars = document.querySelectorAll('.array-bar');
  bars[index].classList.remove('comparing', 'swapping', 'sorted');

  if (state === 'comparing') {
    bars[index].classList.add('comparing');
  } else if (state === 'swapping') {
    bars[index].classList.add('swapping');
  } else if (state === 'sorted') {
    bars[index].classList.add('sorted');
  }

  bars[index].style.height = `${array[index]}px`;
  await delay(animationSpeed);
}

async function swap(i, j) {
  [array[i], array[j]] = [array[j], array[i]];
  await Promise.all([
    updateBar(i, 'swapping'),
    updateBar(j, 'swapping')
  ]);
}

async function bubbleSort() {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await updateBar(j, 'comparing');
      await updateBar(j + 1, 'comparing');

      if (array[j] > array[j + 1]) {
        await swap(j, j + 1);
      }

      await updateBar(j, 'default');
      await updateBar(j + 1, 'default');
    }
    await updateBar(n - i - 1, 'sorted');
  }
  await updateBar(0, 'sorted');
}

async function selectionSort() {
  const n = array.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    await updateBar(i, 'comparing');

    for (let j = i + 1; j < n; j++) {
      await updateBar(j, 'comparing');

      if (array[j] < array[minIdx]) {
        await updateBar(minIdx, 'default');
        minIdx = j;
      } else {
        await updateBar(j, 'default');
      }
    }

    if (minIdx !== i) {
      await swap(i, minIdx);
    }

    await updateBar(i, 'sorted');
    await updateBar(minIdx, 'default');
  }
  await updateBar(n - 1, 'sorted');
}

async function insertionSort(start = 0, end = array.length) {
  for (let i = start + 1; i < end; i++) {
    let key = array[i];
    let j = i - 1;

    await updateBar(i, 'comparing');

    while (j >= start && array[j] > key) {
      await updateBar(j, 'comparing');
      array[j + 1] = array[j];
      await updateBar(j + 1, 'swapping');
      await updateBar(j, 'default');
      j--;
    }

    array[j + 1] = key;
    await updateBar(j + 1, 'swapping');
    await updateBar(i, 'default');
    await updateBar(j + 1, 'default');
  }

  for (let i = start; i < end; i++) {
    await updateBar(i, 'sorted');
  }
}

async function merge(left, mid, right) {
  const leftArr = array.slice(left, mid + 1);
  const rightArr = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    await updateBar(k, 'comparing');

    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      await updateBar(k, 'swapping');
      i++;
    } else {
      array[k] = rightArr[j];
      await updateBar(k, 'swapping');
      j++;
    }
    await updateBar(k, 'default');
    k++;
  }

  while (i < leftArr.length) {
    array[k] = leftArr[i];
    await updateBar(k, 'swapping');
    await updateBar(k, 'default');
    i++;
    k++;
  }

  while (j < rightArr.length) {
    array[k] = rightArr[j];
    await updateBar(k, 'swapping');
    await updateBar(k, 'default');
    j++;
    k++;
  }
}

async function mergeSortHelper(left, right) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  }
}

async function mergeSort() {
  await mergeSortHelper(0, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    await updateBar(i, 'sorted');
  }
}

async function partition(low, high) {
  const pivot = array[high];
  await updateBar(high, 'comparing');
  let i = low - 1;

  for (let j = low; j < high; j++) {
    await updateBar(j, 'comparing');

    if (array[j] < pivot) {
      i++;
      if (i !== j) {
        await swap(i, j);
      }
    }
    await updateBar(j, 'default');
  }

  await swap(i + 1, high);
  await updateBar(high, 'default');
  return i + 1;
}

async function quickSortHelper(low, high) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSortHelper(low, pi - 1);
    await quickSortHelper(pi + 1, high);
  }
}

async function quickSort() {
  await quickSortHelper(0, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    await updateBar(i, 'sorted');
  }
}

async function heapify(n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  await updateBar(i, 'comparing');

  if (left < n) {
    await updateBar(left, 'comparing');
    if (array[left] > array[largest]) {
      largest = left;
    }
  }

  if (right < n) {
    await updateBar(right, 'comparing');
    if (array[right] > array[largest]) {
      largest = right;
    }
  }

  if (largest !== i) {
    await swap(i, largest);
    await updateBar(i, 'default');
    if (left < n) await updateBar(left, 'default');
    if (right < n) await updateBar(right, 'default');
    await heapify(n, largest);
  } else {
    await updateBar(i, 'default');
    if (left < n) await updateBar(left, 'default');
    if (right < n) await updateBar(right, 'default');
  }
}

async function heapSort() {
  const n = array.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    await swap(0, i);
    await updateBar(i, 'sorted');
    await heapify(i, 0);
  }
  await updateBar(0, 'sorted');
}

async function hybridMergeInsertionSort() {
  await hybridMergeSortHelper(0, array.length - 1);
  for (let i = 0; i < array.length; i++) {
    await updateBar(i, 'sorted');
  }
}

async function hybridMergeSortHelper(left, right) {
  if (right - left + 1 <= HYBRID_THRESHOLD) {
    await hybridInsertionSort(left, right + 1);
  } else if (left < right) {
    const mid = Math.floor((left + right) / 2);
    await hybridMergeSortHelper(left, mid);
    await hybridMergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  }
}

async function hybridInsertionSort(start, end) {
  for (let i = start + 1; i < end; i++) {
    let key = array[i];
    let j = i - 1;

    await updateBar(i, 'comparing');

    while (j >= start && array[j] > key) {
      await updateBar(j, 'comparing');
      array[j + 1] = array[j];
      await updateBar(j + 1, 'swapping');
      await updateBar(j, 'default');
      j--;
    }

    array[j + 1] = key;
    await updateBar(j + 1, 'swapping');
    await updateBar(i, 'default');
    await updateBar(j + 1, 'default');
  }
}

async function startSort(algorithm) {
  disableControls();
  sortingTime.textContent = '';

  const algorithms = {
    bubble: { name: 'Bubble Sort', fn: bubbleSort },
    selection: { name: 'Selection Sort', fn: selectionSort },
    insertion: { name: 'Insertion Sort', fn: insertionSort },
    merge: { name: 'Merge Sort', fn: mergeSort },
    quick: { name: 'Quick Sort', fn: quickSort },
    heap: { name: 'Heap Sort', fn: heapSort },
    hybrid: { name: 'Hybrid Merge–Insertion Sort', fn: hybridMergeInsertionSort }
  };

  const selected = algorithms[algorithm];
  algorithmName.textContent = `Sorting with ${selected.name}...`;
  sortStartTime = performance.now();

  await selected.fn();

  const elapsedTime = performance.now() - sortStartTime;
  const timeStr = elapsedTime >= 1000
    ? `${(elapsedTime / 1000).toFixed(2)}s`
    : `${elapsedTime.toFixed(0)}ms`;

  algorithmName.textContent = `${selected.name} - Completed!`;
  sortingTime.textContent = `Time taken: ${timeStr}`;
  enableControls();
}

arraySizeSlider.addEventListener('input', (e) => {
  arraySize = parseInt(e.target.value);
  arraySizeValue.textContent = arraySize;
  if (!isSorting) {
    generateArray();
  }
});

animationSpeedSlider.addEventListener('input', (e) => {
  animationSpeed = parseInt(e.target.value);
  animationSpeedValue.textContent = `${animationSpeed}ms`;
});

generateArrayBtn.addEventListener('click', () => {
  if (!isSorting) {
    generateArray();
    algorithmName.textContent = 'Select an algorithm to begin';
    sortingTime.textContent = '';
  }
});

algorithmButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const algorithm = btn.getAttribute('data-algorithm');
    startSort(algorithm);
  });
});

window.addEventListener('resize', () => {
  if (!isSorting) {
    renderArray();
  }
});

generateArray();
