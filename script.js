// Function to create and display bars representing array elements
function displayBars(array, selectedIndexes = []) {
    var barsDiv = document.getElementById("bars");
    barsDiv.innerHTML = "";

    for (var i = 0; i < array.length; i++) {
        var barHeight = array[i] * 10; // Scale factor to make bars visible
        var bar = document.createElement("div");
        bar.className = "bar";
        if (selectedIndexes.includes(i)) {
            bar.style.backgroundColor = "red";
        }
        bar.style.height = barHeight + "px";

        var valueSpan = document.createElement("span");
        valueSpan.textContent = array[i];

        bar.appendChild(valueSpan);
        barsDiv.appendChild(bar);
    }
}

// Time Complexity descriptions
const complexities = {
    bubbleSort: "Time Complexity: Best: O(n), Average: O(n^2), Worst: O(n^2)",
    selectionSort: "Time Complexity: Best: O(n^2), Average: O(n^2), Worst: O(n^2)",
    insertionSort: "Time Complexity: Best: O(n), Average: O(n^2), Worst: O(n^2)",
    mergeSort: "Time Complexity: Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
    quickSort: "Time Complexity: Best: O(n log n), Average: O(n log n), Worst: O(n^2)",
    heapSort: "Time Complexity: Best: O(n log n), Average: O(n log n), Worst: O(n log n)"
};

// Update time complexity display based on selected algorithm
function updateTimeComplexity() {
    var algorithmSelect = document.getElementById("algorithm");
    var timeComplexitySpan = document.getElementById("timeComplexity");
    var algorithm = algorithmSelect.value;
    
    timeComplexitySpan.textContent = complexities[algorithm];
}





// Bubble Sort
async function bubbleSort(array) {
    for (var i = 0; i < array.length; i++) {
        var swapped = false;

        for (var j = 0; j < array.length - i - 1; j++) {
            if (array[j + 1] < array[j]) {
                // Swap elements
                var temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
                swapped = true;
            }
            // Update visualization
            displayBars(array, [j + 1, j]);
            await sleep(500); // Delay for visualization
        }
        if (!swapped) {
            break;
        }
    }

    // Final visualization with sorted array
    displayBars(array);
}

// Selection Sort
async function selectionSort(array) {
    for (var i = 0; i < array.length; i++) {
        let minIndex = i;
        for (var j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            displayBars(array, [i, j, minIndex]);
            await sleep(500);
        }
        if (minIndex !== i) {
            var temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;
        }
        displayBars(array, [i, minIndex]);
        await sleep(500);
    }

    displayBars(array);
}

// Insertion Sort
async function insertionSort(array) {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j = j - 1;
            displayBars(array, [j + 1, i]);
            await sleep(500);
        }
        array[j + 1] = key;
        displayBars(array, [j + 1, i]);
        await sleep(500);
    }

    displayBars(array);
}

// Merge Sort
async function mergeSort(array) {
    await mergeSortHelper(array, 0, array.length - 1);
}

async function mergeSortHelper(array, left, right) {
    if (left < right) {
        let middle = Math.floor((left + right) / 2);

        await mergeSortHelper(array, left, middle);
        await mergeSortHelper(array, middle + 1, right);
        await merge(array, left, middle, right);
    }
}

async function merge(array, left, middle, right) {
    let n1 = middle - left + 1;
    let n2 = right - middle;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++)
        L[i] = array[left + i];
    for (let j = 0; j < n2; j++)
        R[j] = array[middle + 1 + j];

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            array[k] = L[i];
            i++;
        } else {
            array[k] = R[j];
            j++;
        }
        displayBars(array, [k]);
        await sleep(500);
        k++;
    }

    while (i < n1) {
        array[k] = L[i];
        displayBars(array, [k]);
        await sleep(500);
        i++;
        k++;
    }

    while (j < n2) {
        array[k] = R[j];
        displayBars(array, [k]);
        await sleep(500);
        j++;
        k++;
    }
}

// Quick Sort
async function quickSort(array) {
    await quickSortHelper(array, 0, array.length - 1);
}

async function quickSortHelper(array, low, high) {
    if (low < high) {
        let pi = await partition(array, low, high);

        await quickSortHelper(array, low, pi - 1);
        await quickSortHelper(array, pi + 1, high);
    }
}

async function partition(array, low, high) {
    let pivot = array[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            displayBars(array, [i, j, high]);
            await sleep(500);
        }
    }
    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;
    displayBars(array, [i + 1, high]);
    await sleep(500);
    return (i + 1);
}

// Heap Sort
async function heapSort(array) {
    let n = array.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
        await heapify(array, n, i);

    for (let i = n - 1; i > 0; i--) {
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        displayBars(array, [0, i]);
        await sleep(500);

        await heapify(array, i, 0);
    }
}

async function heapify(array, n, i) {
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest])
        largest = left;

    if (right < n && array[right] > array[largest])
        largest = right;

    if (largest != i) {
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;

        displayBars(array, [i, largest]);
        await sleep(500);

        await heapify(array, n, largest);
    }
}

// Helper function for delaying execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to start the visualization
async function startVisualization(event) {
    event.preventDefault(); // Prevent form submission

    var algorithmSelect = document.getElementById("algorithm");
    var arraySizeInput = document.getElementById("arraySize");
    var arrayElementsInput = document.getElementById("arrayElements");

    var algorithm = algorithmSelect.value;
    var n = parseInt(arraySizeInput.value);
    var array = arrayElementsInput.value
        .split(" ")
        .map(element => parseInt(element));

    switch (algorithm) {
        case 'bubbleSort':
            await bubbleSort(array);
            break;
        case 'selectionSort':
            await selectionSort(array);
            break;
        case 'insertionSort':
            await insertionSort(array);
            break;
        case 'mergeSort':
            await mergeSort(array);
            break;
        case 'quickSort':
            await quickSort(array);
            break;
        case 'heapSort':
            await heapSort(array);
            break;
        default:
            console.log("Invalid algorithm selection");
            break;
    }
}
