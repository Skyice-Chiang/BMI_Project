//BMI計算
//button狀態改變
//留下紀錄
//儲存到localstorage
//防呆機制
//刪除bmi

/* 定義 */
let inputHeight = document.querySelector("#height");
let inputWeight = document.querySelector("#weight");
let send = document.querySelector(".result");
let btnReset = document.querySelector(".btnresult");
let bmiList = document.querySelector(".list");
let allClear = document.querySelector(".allclear");
let bmiData = JSON.parse(localStorage.getItem("userData")) || [];
let body = document.body;
let btnStr = "";
let bmiInfo = {
    "overthin": {
        listclass: "blueside",
        btnclass: "bluestyle",
        iconstyle: "blueicon",
        nameStatus: "過輕"
    },
    "normal": {
        listclass: "greenside",
        btnclass: "greenstyle",
        iconstyle: "greenicon",
        nameStatus: "理想"
    },
    "overHeavy": {
        listclass: "yellowside",
        btnclass: "yellowstyle",
        iconstyle: "yellowicon",
        nameStatus: "過重"
    },
    "littleFat": {
        listclass: "orangeside",
        btnclass: "orangestyle",
        iconstyle: "orangeicon",
        nameStatus: "輕度肥胖"
    },
    "mediumFat": {
        listclass: "orangeside",
        btnclass: "orangestyle",
        iconstyle: "orangeicon",
        nameStatus: "中度肥胖"
    },
    "superFat": {
        listclass: "redside",
        btnclass: "redstyle",
        iconstyle: "redicon",
        nameStatus: "重度肥胖"
    },
};
renderBmi();

/*監聽*/
send.addEventListener("click", caculatorBmi);
btnReset.addEventListener("click", bmiReset);
bmiList.addEventListener("click", deletBmi);
allClear.addEventListener("click", reset);
body.addEventListener("keydown", function (e) {
    let key = e.key;
    // switch (key) {
    //     case "Enter":
    //         caculatorBmi();
    //         break;
    // }
    if (key == "Enter") {
        caculatorBmi();
    };
});

/*渲染畫面*/
function renderBmi() {
    localIn();
    let str = "";
    bmiData.forEach(function (item, index) {
        //渲染bmiList
        str += `<li class="${item.bmiStatus.listclass} record">
        <h3>${item.bmiStatus.nameStatus}</h3>
        <p><span>BMI</span> ${item.bmi}</p>
        <p><span>weight</span> ${item.weight}kg</p>
        <p><span>height</span> ${item.height}cm</p>
        <input type="button" value="Delet" class="deletstyle" data-num="${index}">
        </li>`;
    });
    bmiList.innerHTML = str;

    //按鈕顯示狀態
    if (inputHeight.value !== "" && inputWeight.value !== "") {
        let resultStr = `<div class="${bmiData[0].bmiStatus.btnclass} btnstatus">
        <p class="${bmiData[0].bmiStatus.btnclass}">${bmiData[0].bmi}<br><span>BMI</span></p>
        <img class="${bmiData[0].bmiStatus.iconstyle}" src="IMG/icons_loop.png" alt="重新整理">
        </div>
        <p class="${bmiData[0].bmiStatus.btnclass}">${bmiData[0].bmiStatus.nameStatus}</p>`
        btnStr = resultStr;
    }
};


/*按鈕內容與輸入內容重置*/
function bmiReset() {
    send.style.display = "block";
    btnReset.innerHTML = "";
    inputHeight.value = "";
    inputWeight.value = "";
};

/*處理資料*/
function caculatorBmi() {
    let heightNum = parseInt(inputHeight.value);
    let WeightNum = parseInt(inputWeight.value);
    let bmiNum = (WeightNum / (heightNum / 100 * heightNum / 100)).toFixed(2);
    let putData = {
        height: "",
        weight: "",
        bmi: "",
        bmiStatus: ""
    };
    //防呆機制
    if (inputHeight.value === "" || inputWeight.value === "") {
        alert("請輸入數值");
        inputHeight.value = "";
        inputWeight.value = "";
    } else if (heightNum == 0 || WeightNum == 0) {
        alert("請輸入正確的數值")
        inputHeight.value = "";
        inputWeight.value = "";
    } else {
        putData.height = heightNum;
        putData.weight = WeightNum;
        putData.bmi = bmiNum;
        send.style.display = "none";
    };
    //BMI狀態判別
    if (bmiNum < 18.5) {
        putData.bmiStatus = bmiInfo["overthin"];
    } else if (bmiNum > 18.5 && bmiNum < 24) {
        putData.bmiStatus = bmiInfo["normal"];
    } else if (bmiNum > 24 && bmiNum < 27) {
        putData.bmiStatus = bmiInfo["overHeavy"];
    } else if (bmiNum > 27 && bmiNum < 30) {
        putData.bmiStatus = bmiInfo["littleFat"];
    } else if (bmiNum > 30 && bmiNum < 35) {
        putData.bmiStatus = bmiInfo["mediumFat"];
    } else if (bmiNum > 35) {
        putData.bmiStatus = bmiInfo["superFat"];
    } else {
        return;
    };
    //存入資料
    bmiData.unshift(putData);
    //執行渲染bmiList畫面
    renderBmi();
    //渲染出按鈕狀態
    if (send.style.display == "none" || e.target.defaultValue !== "Delet") {
        btnReset.innerHTML = btnStr;
    };
};

/*刪除資料*/
function deletBmi(e) {
    e.preventDefault();
    let deletItem = e.target.dataset.num;
    if (e.target.defaultValue !== "Delet") { return }
    bmiData.splice(deletItem, 1);
    renderBmi();
};
//全部清除
function reset() {
    bmiData = [];
    renderBmi();
}


/*存進localStorage */
function localIn() {
    localStorage.setItem("userData", JSON.stringify(bmiData));
};
