const numberButtom = document.querySelectorAll('.number');
const operationButtom = document.querySelectorAll('.operation');
let displayPrevious = document.getElementById('previous-operand');
let displayCurrent = document.getElementById('current-operand');
const clearButtom = document.getElementById('clear');
const deleteButtom = document.getElementById('delete');
const dotButtom =  document.getElementById('Dot');
const equalButtom = document.getElementById('equal');

let current = '';
let previous = '';
let operation = null;


numberButtom.forEach(buttom => {
    buttom.addEventListener('click',()=>{
        addNumber(buttom.innerText);
        update();
    })
})
operationButtom.forEach(buttom =>{
    buttom.addEventListener('click',()=>{
        chooseOpeation(buttom.innerText);
        update();
    })
})
clearButtom.addEventListener('click',()=>{
    clearFunc();
})
deleteButtom.addEventListener('click',()=>{
    deleteFunc();
})
equalButtom.addEventListener('click',()=>{
    computation();
})
dotButtom.addEventListener('click',()=>{
    appendDot();
})

function clearFunc(){
    current = '';
    previous = '';
    operation = null;
    displayCurrent.innerText = current;
    displayPrevious.innerText = previous;
}
function deleteFunc(){
    current = current.slice(0,-1);
    displayCurrent.innerText = current; 
}
function addNumber(number){
    if (number === '.' && current.includes('.')) return;
    current = current.toString() + number.toString();
}
function chooseOpeation(operate){
    if(current == '') return;
    if(previous != '')
    {
        computation();  
    }
    operation = operate;
    previous = current;
    current = ''
}
function appendDot() {
    if (current.includes('.')) return; 
    if (current === '') current = '0'; 
    current += '.';
    update();
}
function computation(){
    let result;
    let cur = parseFloat(current);
    let prv = parseFloat(previous);
    if(isNaN(cur) || isNaN(prv)) return;

    switch (operation) {
        case '+':
            result = prv + cur;
            break;
        case '-':
            result = prv - cur;
            break;
        case '*':
            result = prv * cur;
            break;
        case '/':
            if (cur === 0) {
                alert("Cannot divide by zero!");
                return;
            }
            result = prv / cur;
            break;
        default:
            return;
    }

    current = result;
    previous = '';  // ลบ previous หลังจากคำนวณเสร็จ
    operation = null;
    update();  // อัปเดตหน้าจอ
}

function update(){
    displayCurrent.innerText = current;
    displayPrevious.innerText = previous + ' ' + (operation || '');
}