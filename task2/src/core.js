//Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
function isInteger(n) {
    return n===(n>>0)
}

//Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
function even() {
    const array =[];
    for(let i = 2; i<21; i++){
        if(i%2===0) array.push(i);
    }
    return array;
}

//Напишите функцию, считающую сумму чисел до заданного используя цикл
//Работает и для отрицательных и для положительных (сумму считаю от 0)
function sumTo(n) {
    let sum = 0;
    if(n>=0){
        for(let i =1; i<=n; i++){
            sum+=i;
        }
        return sum;
    }else{
        for(let i =-1; i>=n; i--){
            sum+=i;
        }
        return sum;
    }
}

//Напишите функцию, считающую сумму чисел до заданного используя рекурсию
//Работает только для положительных
function recSumTo(n) {
    if(n===0){
        return 0;
    }
    if(n!=1){
        return recSumTo(n-1) + n;
    }
    else{
        return 1;
    }
}

//Напишите функцию, считающую факториал заданного числа
function factorial(n) {
    let fact = 1;
    for(let i = 2; i<=n; i++){
        fact = fact*i;
    }
    return fact;
}

//Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
//Работает только для целых чисел
function isBinary(n) {
    if(n<=0) return false;
    while(n!=1){
        if(n%2!=0){
            return false;
        }
        n/=2;
    }
    return true;
}

//Напишите функцию, которая находит N-е число Фибоначчи
function fibonacci(n) {
    const fib =[0,1];
    for(let i =2; i<=n; i++){
        fib.push(fib[i-2]+fib[i-1])
    }
    return fib[n];
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    if(operatorFn===undefined){
        return (operationValue) => initialValue;
    }
    return  (operationValue) =>{
        initialValue = operatorFn(initialValue,operationValue)
        return initialValue;
    }
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start, step) {
    if(start===undefined) start = 0;
    if(step===undefined) step = 1;
    return function generator(){
        start+=step;
        return start-step;
    }
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp итп) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    if(firstObject===secondObject){
        return true;
    }

    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }
    if(typeof firstObject!='object'|| typeof secondObject!='object' || firstObject===null ||secondObject===null) {return false;}

    // вера в то что отсортируется устойчиво
    /*const entriesFirst = Object.entries(firstObject);
    const entriesSecond = Object.entries(secondObject);
    entriesFirst.sort();
    entriesSecond.sort();
    if( entriesFirst.length!==entriesSecond.length) {return false;}
    for(let i = 0; i<entriesFirst.length; i++){
        if(entriesFirst[i][0]!=entriesSecond[i][0]||!deepEqual(entriesFirst[i][1],entriesSecond[i][1])) {return false;}
    } 
    */
   

    // тут без веры
    const keysFirst = Object.keys(firstObject);
    const keysSecond = Object.keys(secondObject);
    if(keysFirst.length!==keysSecond.length) {return false;}
    for(let key in firstObject){
        if(!(key in secondObject) || !deepEqual(firstObject[key],secondObject[key])) {return false;}
    } 


    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
