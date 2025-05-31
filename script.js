const buttonNumber = document.querySelectorAll('.number')
const buttonOperation = document.querySelectorAll('.operation')
const buttonEqual = document.getElementById('equal')
const buttonDot = document.getElementById('Dot')
const buttonClear = document.getElementById('clear')
const buttonDelete = document.getElementById('delete')

const previousDisplay = document.getElementById('previous-operand')
const currentDisplay = document.getElementById('current-operand')

let currentValue = '';
let previousValue = '';
let operation = null;

// Add Number Button (String)
buttonNumber.forEach(element => {
    element.addEventListener('click',()=>{
        if(currentDisplay.innerText === '0')
            currentDisplay.innerText = ''
        addNumber(element)
    })
})

//Add Operation
buttonOperation.forEach(element=>{
    element.addEventListener('click',()=>{
        addOperation(element)
    })
})

//Add Equal
buttonEqual.addEventListener('click',()=>{
    if(operation !== null && currentValue !== "" && previousValue !== "") 
    {
        console.log('hi')
        calculate();
    }
    else{
        return
    }
})

//Add Dot
buttonDot.addEventListener('click',(event)=>{
    console.log(event.target.innerText)
    addDot(event.target.innerText)
})

//Clear button
buttonClear.addEventListener('click',(event)=>{
    console.log(event.target.innerText)
    previousDisplay.innerText = ''
    currentDisplay.innerText = '0'
    previousValue = ''
    currentValue = ''   
    operation = null
})

// Delete button
buttonDelete.addEventListener('click',(event)=>{
    if(currentValue !== '')
    {
        currentValue = currentValue.slice(0,-1) || '0'
        currentDisplay.innerText = currentValue
    }
    else if(previousValue !== '' && operation !== null){
        previousValue = previousValue.slice(0,-1) || '0'
        previousDisplay.innerText = previousValue
    }
})


function addNumber(element){
    if (currentValue === '0' && element.innerText === '0') return;
    currentValue += element.innerText   
    currentDisplay.innerText += element.innerText;
    console.log(currentDisplay.innerText)
}
function addDot(element)
{   
    if(currentValue === '')
    {
        currentValue = '0.'
        currentDisplay.innerText = currentValue
        return
    }
    if(!currentValue.includes('.'))
    {
        console.log(element)
        currentValue += element // element (.)
        currentDisplay.innerText += element
    }   
}
function addOperation(element){
    if(currentValue === '') return
    operation !== null && calculate() // Short Code (if statements)
    
    operation = element.innerText
    console.log(operation)
    previousValue = currentValue
    previousDisplay.innerText = currentValue + operation
    currentValue = ''
    currentDisplay.innerText = currentValue
}

function calculate() {
    let result;
    let pre = parseFloat(previousValue);
    let cur = parseFloat(currentValue);
    console.log(previousValue);

    if (currentValue === "") return;

    if (previousValue != "") {
        switch (operation) {
            case '+':
                result = pre + cur;
                break;
            case '-':
                result = pre - cur;
                break;
            case '*':
                result = pre * cur;
                break;
            case '/':
                if (cur === 0) {
                    alert("Error: หารด้วยศูนย์ไม่ได้");
                    return;
                }
                result = pre / cur;
                break;
            default:
                break;
        }
    }

    // ✅ ตรวจสอบว่า result ไม่ใช่ NaN หรือ Infinity
    if (isNaN(result) || !isFinite(result)) { 
        alert("ผลลัพธ์ไม่ถูกต้อง");
        previousDisplay.innerText = '';
        currentDisplay.innerText = '0';
        currentValue = '';
        previousValue = '';
        operation = null;
        return;
    }

    console.log(result);
    previousDisplay.innerText = '';
    currentDisplay.innerText = result.toFixed(2);
    previousValue = '';
    currentValue = result.toString();
    console.log(currentValue);
    operation = null;
}

