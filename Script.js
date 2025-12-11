let money = 100;
let guards = 1;
let warehouse = { wood: 0, food: 0 };
let prices = { wood: 10, food: 6 };
let currentCity = "A";
let autoBattle = false;

function log(msg) {
    let box = document.getElementById("logBox");
    box.innerHTML += msg + "<br>";
    box.scrollTop = box.scrollHeight;
}

function refreshUI() {
    document.getElementById("money").innerText = money;
    document.getElementById("guards").innerText = guards;
    document.getElementById("currentCity").innerText = currentCity;
    document.getElementById("woodPrice").innerText = prices.wood;
    document.getElementById("foodPrice").innerText = prices.food;
}
refreshUI();

function openTrade() {
    document.getElementById("tradeWindow").classList.remove("hidden");
}
function closeTrade() {
    document.getElementById("tradeWindow").classList.add("hidden");
}

function buy(item) {
    if (money >= prices[item]) {
        warehouse[item]++;
        money -= prices[item];
        log("買入：" + item);
    }
    refreshUI();
}

function sell(item) {
    if (warehouse[item] > 0) {
        warehouse[item]--;
        money += prices[item];
        log("賣出：" + item);
    }
    refreshUI();
}

function openWarehouse() {
    let box = document.getElementById("warehouseList");
    box.innerHTML = `
        木材：${warehouse.wood}<br>
        食物：${warehouse.food}<br>
    `;
    document.getElementById("warehouseWindow").classList.remove("hidden");
}

function closeWarehouse() {
    document.getElementById("warehouseWindow").classList.add("hidden");
}

function hireGuard() {
    if (money >= 30) {
        guards++;
        money -= 30;
        log("雇用了護衛！");
    } else {
        log("金錢不足！");
    }
    refreshUI();
}

function travelToB() {
    if (currentCity === "B") {
        log("你已經在 B 城！");
        return;
    }
    log("商隊出發前往 B 城...");
    moveCaravan();
}

function moveCaravan() {
    let caravan = document.getElementById("caravan");
    let x = 20;
    let interval = setInterval(() => {
        x += 3;
        caravan.style.left = x + "px";

        if (Math.random() < 0.02) {
            clearInterval(interval);
            startBattle();
        }

        if (x > 250) {
            clearInterval(interval);
            currentCity = "B";
            log("抵達 B 城！");
            refreshUI();
        }
    }, 50);
}

function startBattle() {
    document.getElementById("battleWindow").classList.remove("hidden");
    document.getElementById("battleInfo").innerText = "遭遇山賊！";
}

function closeBattle() {
    document.getElementById("battleWindow").classList.add("hidden");
}

function battleAttack() {
    let dmg = Math.floor(Math.random() * 10) + 5;
    log("你攻擊造成：" + dmg);
    finishBattle();
}

function battleAuto() {
    log("自動戰鬥中...");
    battleAttack();
}

function battleFlee() {
    log("你逃跑了！");
    finishBattle();
}

function finishBattle() {
    closeBattle();
    log("戰鬥結束！");
}
