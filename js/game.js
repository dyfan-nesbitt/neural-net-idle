const dataElement = document.getElementById("dataCount");
const dataButton = document.getElementById("dataButton");
const totalDataGeneratedElement = document.getElementById("totalDataGenerated");
const dataPerSecElement = document.getElementById("dataPerSecond");
// click pwr
const clickPowerElement = document.getElementById("clickPower");
const clickPowerButton = document.getElementById("buyClickPower");
// perceptron
const perceptronElement = document.getElementById("perceptronCount");
const perceptronButton = document.getElementById("buyPerceptron");
// gpu
const gpuElement = document.getElementById("gpuCount");
const gpuButton = document.getElementById("buyGpu");
// mlp
const mlpElement = document.getElementById("mlpCount");
const mlpButton = document.getElementById("buyMlp");

let currentData = 0;
let totalDataGenerated = 0;
const dataProduction = 1;
let dataGenPerSec = dataProduction;

let clickPower = 1;
let clickUpgradeCost = 50;
const clickUpgradeMultiplier = 2.5;

// -- Buildings --

// Perceptron building
let perceptronCount = 0;
let perceptronCost = 10;
const perceptronMultiplier = 1.15;
const perceptronProduction = 1;

// GPU building
let gpuCount = 0;
let gpuCost = 500;
const gpuMultiplier = 1.15;
const gpuProduction = 10;

// MLP building
let mlpCount = 0;
let mlpCost = 5000;
const mlpMultiplier = 1.15;
const mlpProduction = 50;

function increaseData() {
    let dataGain = dataGenPerSec;
    currentData += dataGain;
    totalDataGenerated += dataGain;

    updateButtonStates();
    updateDataElements();

    totalDataGeneratedElement.textContent = `Total Data Generated: ${formatNumber(totalDataGenerated)}`;
}

dataButton.addEventListener('click', () => {
    currentData += clickPower;
    totalDataGenerated += clickPower;

    updateButtonStates();
    updateDataElements();

    totalDataGeneratedElement.textContent = `Total Data Generated: ${formatNumber(totalDataGenerated)}`;
});

function buyClickPower() {
    if (currentData >= clickUpgradeCost) {
        currentData -= clickUpgradeCost;
        clickPower++;
        clickUpgradeCost = Math.floor(clickUpgradeCost * clickUpgradeMultiplier);

        updateButtonStates();

        updateDataElements();
        dataButton.textContent = `+${formatNumber(clickPower)} Data`;
        clickPowerElement.textContent = `${clickPower}`;
        clickPowerButton.textContent = `+1 Click Power (${formatNumber(clickUpgradeCost)} Data)`
    }
}

function buyPerceptron() {
    if (currentData >= perceptronCost) {
        currentData -= perceptronCost;
        perceptronCount++;
        perceptronCost = Math.floor(perceptronCost * perceptronMultiplier);

        dataGenPerSec += perceptronProduction;
        
        updateButtonStates();

        perceptronElement.textContent = `${formatNumber(perceptronCount)} perceptrons | ${perceptronProduction}/s`;
        perceptronButton.textContent = `Buy Perceptron (Cost ${formatNumber(perceptronCost)} Data)`;
        updateDataElements();
    }
}

function buyGPU() {
    if (currentData >= gpuCost) {
        currentData -= gpuCost;
        gpuCount++;
        gpuCost = Math.floor(gpuCost * gpuMultiplier);
        
        dataGenPerSec += gpuProduction;

        updateButtonStates();

        gpuElement.textContent = `${formatNumber(gpuCount)} GPUs | ${gpuProduction}/s`;
        gpuButton.textContent = `Buy GPU (Cost ${formatNumber(gpuCost)} Data)`;
        updateDataElements();
    }
}

function buyMLP() {
    if (currentData >= mlpCost) {
        currentData -= mlpCost;
        mlpCount++;
        mlpCost = Math.floor(mlpCost * mlpMultiplier);

        dataGenPerSec += mlpProduction;

        updateButtonStates();

        mlpElement.textContent = `${formatNumber(mlpCount)} MLPs | ${mlpProduction}/s`;
        mlpButton.textContent = `Buy MLP (Cost ${formatNumber(mlpCost)} Data)`;
        updateDataElements();
    }
}

clickPowerButton.addEventListener('click', buyClickPower);

perceptronButton.addEventListener('click', buyPerceptron);
gpuButton.addEventListener('click', buyGPU);
mlpButton.addEventListener('click', buyMLP);

// -- UI --
function updateDataElements() {
    dataElement.textContent = `${formatNumber(currentData)} Data`;
    dataPerSecElement.textContent = `${formatNumber(dataGenPerSec)} Data/s`;
}

function updateUIOnStartUp() {
    updateButtonStates();
    updateDataElements();
    totalDataGeneratedElement.textContent = `Total Data Generated: ${formatNumber(totalDataGenerated)}`;

    perceptronElement.textContent = `${formatNumber(perceptronCount)} perceptrons | ${perceptronProduction}/s`;
    perceptronButton.textContent = `Buy Perceptron (Cost ${formatNumber(perceptronCost)} Data)`;

    gpuElement.textContent = `${formatNumber(gpuCount)} GPUs | ${gpuProduction}/s`;
    gpuButton.textContent = `Buy GPU (Cost ${formatNumber(gpuCost)} Data)`;

    mlpElement.textContent = `${formatNumber(mlpCount)} MLPs | ${mlpProduction}/s`;
    mlpButton.textContent = `Buy MLP (Cost ${formatNumber(mlpCost)} Data)`;
}

function updateButtonStates() {
    clickPowerButton.disabled = (currentData < clickUpgradeCost);
    perceptronButton.disabled = (currentData < perceptronCost);
    gpuButton.disabled = (currentData < gpuCost);
    mlpButton.disabled = (currentData < mlpCost);
}

// -- Helper Functions --
function formatNumber(num) {
    if (num >= 10**9) {
        return `${(num / 10**9).toFixed(2)}B`;
    } else if (num >= 10**6) {
        return `${(num / 10**6).toFixed(2)}M`;
    } else if (num >= 10**3) {
        return `${(num / 10**3).toFixed(2)}K`;
    } else {
        return num;
    }
}

// Start up
updateUIOnStartUp();

setInterval(increaseData, 1000)