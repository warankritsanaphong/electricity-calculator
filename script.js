```javascript
// ================================
// ตั้งค่าอัตราค่าไฟ
// ================================

const FT_RATE = 0.3972;
const VAT_RATE = 0.07;


// ================================
// ชื่อที่ใช้เก็บข้อมูลในเครื่อง
// ================================

const HISTORY_KEY = "electricityCalculatorHistory";
const TRASH_KEY = "electricityCalculatorTrash";


// ================================
// โหลดข้อมูลจาก LocalStorage
// ================================

function loadHistory() {

    try {
        return JSON.parse(
            localStorage.getItem(HISTORY_KEY)
        ) || [];
    } catch (error) {
        return [];
    }

}

function loadTrash() {

    try {
        return JSON.parse(
            localStorage.getItem(TRASH_KEY)
        ) || [];
    } catch (error) {
        return [];
    }

}


// ================================
// บันทึกข้อมูลลง LocalStorage
// ================================

function saveHistory(history) {

    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(history)
    );

}

function saveTrash(trash) {

    localStorage.setItem(
        TRASH_KEY,
        JSON.stringify(trash)
    );

}


// ================================
// คำนวณค่าไฟฐาน
// ================================

function calculateBaseCost(units) {

    let cost = 0;

    const steps = [
        { max: 15, rate: 2.3488 },
        { max: 25, rate: 2.9882 },
        { max: 35, rate: 3.2405 },
        { max: 100, rate: 3.6237 },
        { max: 150, rate: 3.7171 },
        { max: 400, rate: 4.2218 },
        { max: Infinity, rate: 4.4217 }
    ];

    let previousMax = 0;
    let remainingUnits = units;

    for (const step of steps) {

        if (remainingUnits <= 0) {
            break;
        }

        const availableUnits =
            step.max === Infinity
                ? remainingUnits
                : step.max - previousMax;

        const usedUnits = Math.min(
            remainingUnits,
            availableUnits
        );

        cost += usedUnits * step.rate;

        remainingUnits -= usedUnits;

        if (step.max !== Infinity) {
            previousMax = step.max;
        }
    }

    return cost;
}


// ================================
// สร้างผลการคำนวณ
// ================================

function calculateValues(units) {

    const baseCost = calculateBaseCost(units);

    const ftCost = units * FT_RATE;

    const beforeVat = baseCost + ftCost;

    const vatCost = beforeVat * VAT_RATE;

    const totalCost = beforeVat + vatCost;

    return {
        units,
        baseCost,
        ftCost,
        beforeVat,
        vatCost,
        totalCost
    };

}


// ================================
// สร้าง ID
// ================================

function createId() {

    return Date.now().toString() +
        Math.random().toString(36).substring(2, 8);

}


// ================================
// บันทึกประวัติ
// ================================

function addHistory(data) {

    const history = loadHistory();

    const item = {
        id: createId(),
        date: new Date().toISOString(),
        units: data.units,
        baseCost: data.baseCost,
        ftCost: data.ftCost,
        beforeVat: data.beforeVat,
        vatCost: data.vatCost,
        totalCost: data.totalCost
    };

    history.unshift(item);

    saveHistory(history);

    renderHistory();
}


// ================================
// แสดงผลการคำนวณ
// ================================

function displayResult(data) {

    document.getElementById("baseCost").textContent =
        `${data.baseCost.toFixed(2)} บาท`;

    document.getElementById("ftCost").textContent =
        `${data.ftCost.toFixed(2)} บาท`;

    document.getElementById("beforeVat").textContent =
        `${data.beforeVat.toFixed(2)} บาท`;

    document.getElementById("vatCost").textContent =
        `${data.vatCost.toFixed(2)} บาท`;

    document.getElementById("totalCost").textContent =
        `${data.totalCost.toFixed(2)} บาท`;

    document.getElementById("result")
        .classList.remove("hidden");

}


// ================================
// คำนวณค่าไฟ
// ================================

function calculateElectricity() {

    const unitsInput =
        document.getElementById("units");

    const error =
        document.getElementById("error");

    const unitsText =
        unitsInput.value.trim();

    if (unitsText === "") {

        error.textContent =
            "กรุณากรอกจำนวนหน่วยไฟฟ้า";

        document.getElementById("result")
            .classList.add("hidden");

        return;
    }

    const units = parseFloat(unitsText);

    if (isNaN(units)) {

        error.textContent =
            "กรุณากรอกตัวเลขเท่านั้น";

        document.getElementById("result")
            .classList.add("hidden");

        return;
    }

    if (!Number.isFinite(units)) {

        error.textContent =
            "กรุณากรอกจำนวนหน่วยที่ถูกต้อง";

        return;
    }

    if (units < 0) {

        error.textContent =
            "จำนวนหน่วยไฟฟ้าต้องไม่ติดลบ";

        document.getElementById("result")
            .classList.add("hidden");

        return;
    }

    error.textContent = "";

    const data = calculateValues(units);

    displayResult(data);

    // บันทึกประวัติทันที
    addHistory(data);

}


// ================================
// รีเซ็ตเครื่องคำนวณ
// ================================

function resetCalculator() {

    document.getElementById("units").value = "";

    document.getElementById("error").textContent = "";

    document.getElementById("result")
        .classList.add("hidden");

    document.getElementById("baseCost").textContent =
        "0.00 บาท";

    document.getElementById("ftCost").textContent =
        "0.00 บาท";

    document.getElementById("beforeVat").textContent =
        "0.00 บาท";

    document.getElementById("vatCost").textContent =
        "0.00 บาท";

    document.getElementById("totalCost").textContent =
        "0.00 บาท";

}


// ================================
// แปลงวันที่
// ================================

function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleString("th-TH", {
        dateStyle: "medium",
        timeStyle: "short"
    });

}


// ================================
// แสดงประวัติ
// ================================

function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    const history = loadHistory();

    historyList.innerHTML = "";

    if (history.length === 0) {

        historyList.innerHTML = `
            <div class="empty-history">
                <div class="empty-icon">📋</div>
                <p>ยังไม่มีประวัติการคำนวณ</p>
            </div>
        `;

        return;
    }

    history.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "history-item";

        element.innerHTML = `
            <div class="history-top">

                <div>
                    <div class="history-date">
                        ${formatDate(item.date)}
                    </div>

                    <div class="history-units">
                        ⚡ ${item.units} kWh
                    </div>
                </div>

                <div class="history-total">
                    ${item.totalCost.toFixed(2)} บาท
                </div>

            </div>

            <div class="history-actions">

                <button
                    class="calculate-btn"
                    data-view-id="${item.id}"
                >
                    ดูรายละเอียด
                </button>

                <button
                    class="delete-btn"
                    data-delete-id="${item.id}"
                >
                    🗑️ ลบ
                </button>

            </div>
        `;

        historyList.appendChild(element);

    });

}


// ================================
// ดูรายละเอียดประวัติ
// ================================

function viewHistory(id) {

    const history = loadHistory();

    const item = history.find(
        record => record.id === id
    );

    if (!item) {
        return;
    }

    document.getElementById("units").value =
        item.units;

    displayResult(item);

    showCalculator();

}


// ================================
// ย้ายประวัติไปถังขยะ
// ================================

function deleteHistory(id) {

    const history = loadHistory();

    const item = history.find(
        record => record.id === id
    );

    if (!item) {
        return;
    }

    const newHistory = history.filter(
        record => record.id !== id
    );

    const trash = loadTrash();

    trash.unshift({
        ...item,
        deletedAt: new Date().toISOString()
    });

    saveHistory(newHistory);

    saveTrash(trash);

    renderHistory();
    renderTrash();

}


// ================================
// แสดงถังขยะ
// ================================

function renderTrash() {

    const trashList =
        document.getElementById("trashList");

    const trash = loadTrash();

    trashList.innerHTML = "";

    if (trash.length === 0) {

        trashList.innerHTML = `
            <div class="empty-history">
                <div class="empty-icon">🗑️</div>
                <p>ถังขยะว่างเปล่า</p>
            </div>
        `;

        return;
    }

    trash.forEach(item => {

        const element =
            document.createElement("div");

        element.className = "history-item";

        element.innerHTML = `
            <div class="history-top">

                <div>
                    <div class="history-date">
                        คำนวณเมื่อ ${formatDate(item.date)}
                    </div>

                    <div class="history-units">
                        ⚡ ${item.units} kWh
                    </div>
                </div>

                <div class="history-total">
                    ${item.totalCost.toFixed(2)} บาท
                </div>

            </div>

            <div class="history-actions">

                <button
                    class="restore-btn"
                    data-restore-id="${item.id}"
                >
                    ♻️ กู้คืน
                </button>

                <button
                    class="delete-btn"
                    data-permanent-id="${item.id}"
                >
                    ลบถาวร
                </button>

            </div>
        `;

        trashList.appendChild(element);

    });

}


// ================================
// กู้คืนประวัติ
// ================================

function restoreHistory(id) {

    const trash = loadTrash();

    const item = trash.find(
        record => record.id === id
    );

    if (!item) {
        return;
    }

    const newTrash = trash.filter(
        record => record.id !== id
    );

    delete item.deletedAt;

    const history = loadHistory();

    history.unshift(item);

    saveHistory(history);

    saveTrash(newTrash);

    renderHistory();
    renderTrash();

}


// ================================
// ลบถาวร
// ================================

function permanentlyDelete(id) {

    const confirmed = confirm(
        "ต้องการลบประวัตินี้ถาวรใช่หรือไม่?\n\nหลังจากลบแล้วจะไม่สามารถกู้คืนได้"
    );

    if (!confirmed) {
        return;
    }

    const trash = loadTrash();

    const newTrash = trash.filter(
        record => record.id !== id
    );

    saveTrash(newTrash);

    renderTrash();

}


// ================================
// เปลี่ยนหน้า
// ================================

function showCalculator() {

    document.getElementById("calculatorPage")
        .classList.remove("hidden");

    document.getElementById("historyPage")
        .classList.add("hidden");

    document.getElementById("trashPage")
        .classList.add("hidden");

    document.getElementById("calculatorTab")
        .classList.add("active");

    document.getElementById("historyTab")
        .classList.remove("active");

}


function showHistory() {

    renderHistory();

    document.getElementById("calculatorPage")
        .classList.add("hidden");

    document.getElementById("historyPage")
        .classList.remove("hidden");

    document.getElementById("trashPage")
        .classList.add("hidden");

    document.getElementById("calculatorTab")
        .classList.remove("active");

    document.getElementById("historyTab")
        .classList.add("active");

}


function showTrash() {

    renderTrash();

    document.getElementById("calculatorPage")
        .classList.add("hidden");

    document.getElementById("historyPage")
        .classList.add("hidden");

    document.getElementById("trashPage")
        .classList.remove("hidden");

}


// ================================
// Event Listeners
// ================================

document
    .getElementById("calculateBtn")
    .addEventListener(
        "click",
        calculateElectricity
    );


document
    .getElementById("resetBtn")
    .addEventListener(
        "click",
        resetCalculator
    );


document
    .getElementById("calculatorTab")
    .addEventListener(
        "click",
        showCalculator
    );


document
    .getElementById("historyTab")
    .addEventListener(
        "click",
        showHistory
    );


document
    .getElementById("trashBtn")
    .addEventListener(
        "click",
        showTrash
    );


document
    .getElementById("backHistoryBtn")
    .addEventListener(
        "click",
        showHistory
    );


// ================================
// Event ของรายการประวัติ
// ================================

document
    .getElementById("historyList")
    .addEventListener("click", function(event) {

        const viewButton =
            event.target.closest("[data-view-id]");

        const deleteButton =
            event.target.closest("[data-delete-id]");


        if (viewButton) {

            viewHistory(
                viewButton.dataset.viewId
            );

            return;
        }


        if (deleteButton) {

            deleteHistory(
                deleteButton.dataset.deleteId
            );

        }

    });


// ================================
// Event ของถังขยะ
// ================================

document
    .getElementById("trashList")
    .addEventListener("click", function(event) {

        const restoreButton =
            event.target.closest("[data-restore-id]");

        const permanentButton =
            event.target.closest("[data-permanent-id]");


        if (restoreButton) {

            restoreHistory(
                restoreButton.dataset.restoreId
            );

            return;
        }


        if (permanentButton) {

            permanentlyDelete(
                permanentButton.dataset.permanentId
            );

        }

    });


// ================================
// กด Enter เพื่อคำนวณ
// ================================

document
    .getElementById("units")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                calculateElectricity();
            }

        }
    );


// ================================
// โหลดประวัติเมื่อเปิดเว็บ
// ================================

renderHistory();
renderTrash();
```
