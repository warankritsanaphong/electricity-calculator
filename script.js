// ================================
// ตั้งค่าอัตราค่าไฟ
// ================================

// ค่า Ft ตัวอย่าง: บาท/หน่วย
const FT_RATE = 0.3972;

// VAT
const VAT_RATE = 0.07;


// ================================
// ฟังก์ชันคำนวณค่าไฟฐาน
// ================================

function calculateBaseCost(units) {

    let cost = 0;

    /*
        ตัวอย่างอัตราค่าไฟแบบขั้นบันได

        0 - 15 หน่วย       = 2.3488 บาท/หน่วย
        16 - 25 หน่วย      = 2.9882 บาท/หน่วย
        26 - 35 หน่วย      = 3.2405 บาท/หน่วย
        36 - 100 หน่วย     = 3.6237 บาท/หน่วย
        101 - 150 หน่วย    = 3.7171 บาท/หน่วย
        151 - 400 หน่วย    = 4.2218 บาท/หน่วย
        มากกว่า 400 หน่วย  = 4.4217 บาท/หน่วย
    */

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

        const availableUnits = step.max === Infinity
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
// คำนวณค่าไฟ
// ================================

function calculateElectricity() {

    const unitsInput = document.getElementById("units");
    const error = document.getElementById("error");
    const result = document.getElementById("result");

    const units = parseFloat(unitsInput.value);

    // ตรวจสอบข้อมูล
    if (unitsInput.value.trim() === "") {
        error.textContent = "กรุณากรอกจำนวนหน่วยไฟฟ้า";
        result.classList.add("hidden");
        return;
    }

    if (isNaN(units)) {
        error.textContent = "กรุณากรอกตัวเลขเท่านั้น";
        result.classList.add("hidden");
        return;
    }

    if (units < 0) {
        error.textContent = "จำนวนหน่วยไฟฟ้าต้องไม่ติดลบ";
        result.classList.add("hidden");
        return;
    }

    error.textContent = "";

    // ค่าไฟฐาน
    const baseCost = calculateBaseCost(units);

    // ค่า Ft
    const ftCost = units * FT_RATE;

    // รวมก่อน VAT
    const beforeVat = baseCost + ftCost;

    // VAT
    const vatCost = beforeVat * VAT_RATE;

    // ยอดรวม
    const totalCost = beforeVat + vatCost;


    // แสดงผล
    document.getElementById("baseCost").textContent =
        `${baseCost.toFixed(2)} บาท`;

    document.getElementById("ftCost").textContent =
        `${ftCost.toFixed(2)} บาท`;

    document.getElementById("beforeVat").textContent =
        `${beforeVat.toFixed(2)} บาท`;

    document.getElementById("vatCost").textContent =
        `${vatCost.toFixed(2)} บาท`;

    document.getElementById("totalCost").textContent =
        `${totalCost.toFixed(2)} บาท`;

    result.classList.remove("hidden");
}


// ================================
// ฟังก์ชันรีเซ็ต
// ================================

function resetCalculator() {

    document.getElementById("units").value = "";

    document.getElementById("error").textContent = "";

    document.getElementById("result").classList.add("hidden");

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
// ปุ่มต่าง ๆ
// ================================

document
    .getElementById("calculateBtn")
    .addEventListener("click", calculateElectricity);

document
    .getElementById("resetBtn")
    .addEventListener("click", resetCalculator);


// กด Enter เพื่อคำนวณ
document
    .getElementById("units")
    .addEventListener("keydown", function(event) {

        if (event.key === "Enter") {
            calculateElectricity();
        }

    });
