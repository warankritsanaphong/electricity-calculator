* {
    box-sizing: border-box;
}

body {
    margin: 0;
    min-height: 100vh;

    font-family:
        Arial,
        "Noto Sans Thai",
        sans-serif;

    background:
        linear-gradient(
            135deg,
            #00c6ff,
            #0072ff
        );

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
}

.container {
    width: 100%;
    max-width: 520px;
}

.calculator {
    background: white;

    border-radius: 20px;

    padding: 35px;

    box-shadow:
        0 15px 40px rgba(0, 0, 0, 0.2);
}

h1 {
    margin: 0;

    text-align: center;

    color: #0072ff;

    font-size: 30px;
}

.subtitle {
    text-align: center;

    color: #777;

    margin-top: 10px;
    margin-bottom: 25px;
}

/* =========================
   TABS
========================= */

.tabs {
    display: flex;

    gap: 10px;

    margin-bottom: 25px;

    background: #f1f5f9;

    padding: 5px;

    border-radius: 12px;
}

.tab {
    flex: 1;

    border: none;

    padding: 12px;

    border-radius: 9px;

    background: transparent;

    color: #555;

    font-size: 15px;

    cursor: pointer;

    transition: 0.2s;
}

.tab:hover {
    background: #e2e8f0;
}

.tab.active {
    background: #0072ff;

    color: white;
}

/* =========================
   FORM
========================= */

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;

    margin-bottom: 8px;

    font-weight: bold;

    color: #333;
}

input {
    width: 100%;

    padding: 14px;

    border: 2px solid #ddd;

    border-radius: 10px;

    font-size: 16px;

    outline: none;

    transition: 0.2s;
}

input:focus {
    border-color: #0072ff;

    box-shadow:
        0 0 0 3px rgba(0, 114, 255, 0.1);
}

.error {
    display: block;

    color: #e53935;

    margin-top: 7px;

    min-height: 18px;
}

/* =========================
   BUTTONS
========================= */

.button-group {
    display: flex;

    gap: 10px;
}

button {
    font-family: inherit;
}

.calculate-btn,
.reset-btn {
    flex: 1;

    padding: 14px;

    border: none;

    border-radius: 10px;

    font-size: 16px;

    font-weight: bold;

    cursor: pointer;

    transition: 0.2s;
}

.calculate-btn {
    background: #0072ff;

    color: white;
}

.calculate-btn:hover {
    background: #005edb;

    transform: translateY(-1px);
}

.reset-btn {
    background: #e9ecef;

    color: #333;
}

.reset-btn:hover {
    background: #dfe3e6;
}

/* =========================
   RESULT
========================= */

.result {
    margin-top: 25px;

    padding: 20px;

    background: #f8fbff;

    border: 1px solid #dbeafe;

    border-radius: 15px;
}

.result h2 {
    margin-top: 0;

    color: #0072ff;

    font-size: 21px;
}

.result-row {
    display: flex;

    justify-content: space-between;

    align-items: center;

    padding: 10px 0;

    border-bottom: 1px solid #eee;

    gap: 10px;
}

.result-row strong {
    text-align: right;
}

.total {
    margin-top: 15px;

    padding: 15px;

    background: #0072ff;

    color: white;

    border-radius: 10px;

    display: flex;

    justify-content: space-between;

    gap: 10px;
}

.total strong {
    text-align: right;
}

/* =========================
   INFO
========================= */

.info {
    margin-top: 20px;

    padding: 15px;

    background: #fff8e1;

    border-radius: 10px;

    color: #795548;

    font-size: 14px;

    line-height: 1.6;
}

/* =========================
   HISTORY
========================= */

.history-header {
    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 10px;

    margin-bottom: 20px;
}

.history-header h2 {
    margin: 0;

    color: #0072ff;

    font-size: 21px;
}

.trash-btn {
    border: none;

    background: #f1f5f9;

    color: #333;

    padding: 9px 12px;

    border-radius: 8px;

    cursor: pointer;
}

.trash-btn:hover {
    background: #e2e8f0;
}

/* รายการประวัติ */

.history-item {
    border: 1px solid #e2e8f0;

    border-radius: 12px;

    padding: 15px;

    margin-bottom: 12px;

    background: #fafafa;
}

.history-main {
    display: flex;

    justify-content: space-between;

    align-items: center;

    gap: 10px;
}

.history-units {
    font-weight: bold;

    color: #333;
}

.history-total {
    color: #0072ff;

    font-weight: bold;

    text-align: right;
}

.history-date {
    margin-top: 7px;

    color: #888;

    font-size: 12px;
}

.history-actions {
    display: flex;

    gap: 8px;

    margin-top: 12px;
}

.history-actions button {
    flex: 1;

    padding: 8px;

    border: none;

    border-radius: 8px;

    cursor: pointer;

    font-size: 13px;
}

.view-btn {
    background: #e0f2fe;

    color: #0369a1;
}

.delete-btn {
    background: #fee2e2;

    color: #b91c1c;
}

.restore-btn {
    background: #dcfce7;

    color: #15803d;
}

.permanent-delete-btn {
    background: #fee2e2;

    color: #b91c1c;
}

/* ว่าง */

.empty-history {
    text-align: center;

    color: #888;

    padding: 35px 10px;
}

/* =========================
   HIDDEN
========================= */

.hidden {
    display: none !important;
}

/* =========================
   MOBILE
========================= */

@media (max-width: 600px) {

    body {
        padding: 10px;
    }

    .calculator {
        padding: 25px 20px;
    }

    h1 {
        font-size: 25px;
    }

    .total {
        flex-direction: column;
    }

    .total strong {
        text-align: left;
    }

    .history-main {
        flex-direction: column;

        align-items: flex-start;
    }

    .history-total {
        text-align: left;
    }
}
