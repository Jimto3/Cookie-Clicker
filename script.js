const allUpgrades = [`cookie`, `grandpa`, `barn`, `mine`, `factory`];
const value = [1, 5, 50, 250, 1500];
const cost = [];
const counter = document.getElementById("counter");
let statistics = { cursorAmount: 0, cps: 0 };
statistics.upgrades = {};
statistics.cost = [];
let cursor = document.getElementById("cursor");
let cursorAmount = 0;
let cursorsPerSecond = 0;
let click_value = 1;
let click_multiplyer = 1;
let cps = document.getElementById("cps");

for (let i = 0; i < allUpgrades.length; i++) {
  statistics.upgrades[allUpgrades[i]] = 0;
  cost[i] = Math.round(10 ** (i + 1));
  statistics.cost[i] = cost[i];
  let upgradePrice = document.getElementById(`${allUpgrades[i]}Price`);
  upgradePrice.textContent = `${cost[i]} Cursors`;
}

cursor.addEventListener("mousedown", function () {
  cursor.style.scale = "0.8";
  cursorAmount += click_multiplyer * click_value;
  counter.textContent = `${cursorAmount} Cursors`;
  statistics.cursorAmount = cursorAmount;
});

cursor.addEventListener("mouseup", function () {
  cursor.style.scale = "1";
});

function updateShop(type) {
  console.log(type);
  let cursorsPerSecond = 0;
  for (let i = 0; i < allUpgrades.length; i++) {
    cursorsPerSecond += value[i] * statistics.upgrades[allUpgrades[i]];
    if (type == allUpgrades[i] && cursorAmount >= cost[i]) {
      cursorAmount -= Math.round(cost[i]);
      cost[i] = Math.round(cost[i] * 1.4);
      statistics.cost[i] = cost[i];
      counter.textContent = `${cursorAmount} Cursors`;
      statistics.upgrades[type]++; //increase upgrade count
      document.getElementById(type).textContent = statistics.upgrades[type]; //update upgrade count
      cursorsPerSecond = 0;
      for (let i = 0; i < allUpgrades.length; i++) {
        cursorsPerSecond += value[i] * statistics.upgrades[allUpgrades[i]];
      }
      cps.textContent = `${cursorsPerSecond} CPS`; //update cps count
      let upgradePrice = document.getElementById(`${allUpgrades[i]}Price`);
      upgradePrice.textContent = `${cost[i]} Cursors`; //update price onscreen
    }
  }
}

function resetData() {
  localStorage.clear();
  location.reload();
}

setInterval(() => {
  //every second updates cps and localstorage
  let cursorsPerSecond = 0;
  localStorage.setItem("statistics", JSON.stringify(statistics)); //any data in statistics is saved
  for (let i = 0; i < allUpgrades.length; i++) {
    cursorsPerSecond += value[i] * statistics.upgrades[allUpgrades[i]]; //update cps
    let price = document.getElementById(`${allUpgrades[i]}Price`);
    if (cost[i] > cursorAmount) {
      // if you cant afford upgrade :
      price.classList.remove(`afford`);
      price.classList.add(`notAfford`);
    } else {
      price.classList.add(`afford`);
      price.classList.remove(`notAfford`);
    }
  }
  cursorAmount += cursorsPerSecond;
  statistics.cursorAmount = cursorAmount;
  statistics.cps = cursorsPerSecond;
  counter.textContent = `${cursorAmount} Cursors`;
  cps.textContent = `${cursorsPerSecond} CPS`;
}, 500);

// set all values on reload
if (localStorage.getItem("statistics")) {
  //if there is localStorage
  statistics = JSON.parse(localStorage.getItem("statistics"));
  cursorAmount = statistics.cursorAmount;
  cursorsPerSecond = statistics.cps;
  counter.textContent = `${cursorAmount} Cursors`;
  for (let i = 0; i < allUpgrades.length; i++) {
    if (statistics.cost) {
      cost[i] = statistics.cost[i];
    } else {
      statistics.cost = [];
    }
    document.getElementById(allUpgrades[i]).textContent =
      statistics.upgrades[allUpgrades[i]];
  }
}
for (let i = 0; i < allUpgrades.length; i++) {
  let upgradePrice = document.getElementById(`${allUpgrades[i]}Price`);
  upgradePrice.textContent = `${cost[i]} Cursors`;
}
