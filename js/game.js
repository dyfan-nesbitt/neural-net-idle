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

// cnn
const cnnElement = document.getElementById("cnnCount");
const cnnButton = document.getElementById("buyCnn");

// rnn
const rnnElement = document.getElementById("rnnCount");
const rnnButton = document.getElementById("buyRnn");

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

// CNN building
let cnnCount = 0;
let cnnCost = 50000;
const cnnMultiplier = 1.15;
const cnnProduction = 250;

// RNN building
let rnnCount = 0;
let rnnCost = 500000;
const rnnMultiplier = 1.15;
const rnnProduction = 1000;

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

// -- Button functions --
function buyClickPower() {
    if (currentData >= clickUpgradeCost) {
        currentData -= clickUpgradeCost;
        clickPower++;
        clickUpgradeCost = Math.floor(clickUpgradeCost * clickUpgradeMultiplier);

        updateButtonStates();

        updateDataElements();
        dataButton.textContent = `+${formatNumber(clickPower)} Data`;
        clickPowerElement.textContent = `${clickPower}`;
        clickPowerButton.textContent = `+1 Click Power (${formatNumber(clickUpgradeCost)} Data)`;
        saveGame();
    }
}

function buyPerceptron() {
    if (currentData >= perceptronCost) {
        currentData -= perceptronCost;
        perceptronCount++;
        perceptronCost = Math.floor(perceptronCost * perceptronMultiplier);

        dataGenPerSec += perceptronProduction;
        
        updateButtonStates();

        perceptronElement.textContent = `${formatNumber(perceptronCount)} perceptrons | ${formatNumber(perceptronProduction)}/s`;
        perceptronButton.textContent = `Buy Perceptron (Cost ${formatNumber(perceptronCost)} Data)`;
        updateDataElements();
        saveGame();
    }
}

function buyGPU() {
    if (currentData >= gpuCost) {
        currentData -= gpuCost;
        gpuCount++;
        gpuCost = Math.floor(gpuCost * gpuMultiplier);
        
        dataGenPerSec += gpuProduction;

        updateButtonStates();

        gpuElement.textContent = `${formatNumber(gpuCount)} GPUs | ${formatNumber(gpuProduction)}/s`;
        gpuButton.textContent = `Buy GPU (Cost ${formatNumber(gpuCost)} Data)`;
        updateDataElements();
        saveGame();
    }
}

function buyMLP() {
    if (currentData >= mlpCost) {
        currentData -= mlpCost;
        mlpCount++;
        mlpCost = Math.floor(mlpCost * mlpMultiplier);

        dataGenPerSec += mlpProduction;

        updateButtonStates();

        mlpElement.textContent = `${formatNumber(mlpCount)} MLPs | ${formatNumber(mlpProduction)}/s`;
        mlpButton.textContent = `Buy MLP (Cost ${formatNumber(mlpCost)} Data)`;
        updateDataElements();
        saveGame();
    }
}

function buyCNN() {
    if (currentData >= cnnCost) {
        currentData -= cnnCost;
        cnnCount++;
        cnnCost = Math.floor(cnnCost * cnnMultiplier);

        dataGenPerSec += cnnProduction;

        updateButtonStates();

        cnnElement.textContent = `${formatNumber(cnnCount)} CNNs | ${formatNumber(cnnProduction)}/s`;
        cnnButton.textContent = `Buy CNN (Cost ${formatNumber(cnnCost)} Data)`;
        updateDataElements();
        saveGame();
    }
}

function buyRNN() {
    if (currentData >= rnnCost) {
        currentData -= rnnCost;
        rnnCount++;
        rnnCost = Math.floor(rnnCost * rnnMultiplier);

        dataGenPerSec += rnnProduction;

        updateButtonStates();

        rnnElement.textContent = `${formatNumber(rnnCount)} RNNs | ${formatNumber(rnnProduction)}/s`;
        rnnButton.textContent = `Buy RNN (Cost ${formatNumber(rnnCost)} Data)`;
        updateDataElements();
        saveGame();
    }
}



clickPowerButton.addEventListener('click', buyClickPower);

perceptronButton.addEventListener('click', buyPerceptron);
gpuButton.addEventListener('click', buyGPU);
mlpButton.addEventListener('click', buyMLP);
cnnButton.addEventListener('click', buyCNN);
rnnButton.addEventListener('click', buyRNN);

// -- UI --
function updateDataElements() {
    dataElement.textContent = `${formatNumber(currentData)} Data`;
    dataPerSecElement.textContent = `${formatNumber(dataGenPerSec)} Data/s`;
}

function updateUIOnStartUp() {
    updateButtonStates();
    updateDataElements();
    totalDataGeneratedElement.textContent = `Total Data Generated: ${formatNumber(totalDataGenerated)}`;

    perceptronElement.textContent = `${formatNumber(perceptronCount)} perceptrons | ${formatNumber(perceptronProduction)}/s`;
    perceptronButton.textContent = `Buy Perceptron (Cost ${formatNumber(perceptronCost)} Data)`;

    gpuElement.textContent = `${formatNumber(gpuCount)} GPUs | ${formatNumber(gpuProduction)}/s`;
    gpuButton.textContent = `Buy GPU (Cost ${formatNumber(gpuCost)} Data)`;

    mlpElement.textContent = `${formatNumber(mlpCount)} MLPs | ${formatNumber(mlpProduction)}/s`;
    mlpButton.textContent = `Buy MLP (Cost ${formatNumber(mlpCost)} Data)`;

    cnnElement.textContent = `${formatNumber(cnnCount)} CNNs | ${formatNumber(cnnProduction)}/s`;
    cnnButton.textContent = `Buy CNN (Cost ${formatNumber(cnnCost)} Data)`;

    rnnElement.textContent = `${formatNumber(rnnCount)} RNNs | ${formatNumber(rnnProduction)}/s`;
    rnnButton.textContent = `Buy RNN (Cost ${formatNumber(rnnCost)} Data)`;
}

function updateButtonStates() {
    clickPowerButton.disabled = (currentData < clickUpgradeCost);
    perceptronButton.disabled = (currentData < perceptronCost);
    gpuButton.disabled = (currentData < gpuCost);
    mlpButton.disabled = (currentData < mlpCost);
    cnnButton.disabled = (currentData < cnnCost);
    rnnButton.disabled = (currentData < rnnCost);
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

// Saving / Loading
function saveGame() {
    const saveData = {
        currentData: currentData,
        totalDataGenerated: totalDataGenerated,
        dataGenPerSec: dataGenPerSec,
        clickPower: clickPower,
        clickUpgradeCost: clickUpgradeCost,
        perceptronCount: perceptronCount,
        perceptronCost: perceptronCost,
        gpuCount: gpuCount,
        gpuCost: gpuCost,
        mlpCount: mlpCount,
        mlpCost: mlpCost,
        cnnCount: cnnCount,
        cnnCost: cnnCost,
        rnnCount: rnnCount, 
        rnnCost: rnnCost
    };
    localStorage.setItem('neuralNetSave', JSON.stringify(saveData));
}

function loadGame() {
    const saveString = localStorage.getItem('neuralNetSave');

    if (saveString) {
        const saveData = JSON.parse(saveString);

        currentData = saveData.currentData;
        totalDataGenerated = saveData.totalDataGenerated;
        dataGenPerSec = saveData.dataGenPerSec;
        clickPower = saveData.clickPower;
        clickUpgradeCost = saveData.clickUpgradeCost;
        perceptronCount = saveData.perceptronCount;
        perceptronCost = saveData.perceptronCost;
        gpuCount = saveData.gpuCount;
        gpuCost = saveData.gpuCost;
        mlpCount = saveData.mlpCount;
        mlpCost = saveData.mlpCost;
        cnnCount = saveData.cnnCount; 
        cnnCost = saveData.cnnCost;
        rnnCount = saveData.rnnCount;
        rnnCost = saveData.rnnCost;
    }
}

// Start up
loadGame();

updateUIOnStartUp();

setInterval(increaseData, 1000);
setInterval(saveGame, 10000);