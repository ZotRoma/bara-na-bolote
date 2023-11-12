"use strict";
// в данных задачах нужно использовать возможности es6
// ко всем заданиям можно дописать свои тесты в файле es6.spec.js
// Можно менять параметры функций (например сделать им значения по умолчанию)

// Напишите функцию, которая принимает ФИО пользователя и возвращает
// строку формата Имя Фамилия
function fioToName(fio) {
    const words = fio.split(' ');
    if(words.length>=2){
        return words[1]+" "+words[0];
    }else{
        return "Неправильный формат ввода";
    }
}

console.log(fioToName("Зотов Роман Алексеевич"));

// преобразуйте массив чисел так, чтобы в нем остались только
// уникальные элементы
// присмотритесь к коллекции "Set"
function filterUnique(array) {
    return Array.from(new Set(array));
}

//console.log(filterUnique([1,1,1,2,3,3,4,5,42,34,2]))

// Задача: разница зарплат
// в функцию приходит массив из n зарплат сотрудников фирмы
// ваша задача определить, во сколько раз зарплата самого высокооплачиваемого
// сотрудника превышает зарплату самого низкооплачиваемого
// присмотритесь к методу .reduce
function calculateSalaryDifference(array) {
    if(array.length==0) return false;
    //через сортировку 
    // array.sort((a, b) => a - b);
    // return array[array.length-1]/array[0];
    //через reduce
    let max = array.reduce(function(max,currentItem){return currentItem>max ? currentItem :max;},array[0]);
    let min = array.reduce(function(min,currentItem){return currentItem<min ? currentItem :min;},array[0]);
    return max/min;
}

//console.log(calculateSalaryDifference([21342,2,3,4,4,5,6,7,8,9,11,14,5235,234234,4]))
// Реализуйте класс "словарь слов" (как толковый словарь)
// класс должен быть безопасным и работать только со словами
// присмотритесь к коллекции "Map"
// Словарь - (string, string), и все это не null и не undefined
// * покройте класс тестами
class Dictionary {
    constructor (){
        this.wordbook = new Map();
    }
    addWord(word, meaning){
        if(typeof word ==='string'
            && typeof meaning === 'string' 
            && (word!==""&&word!==null&&word!==undefined)
            && (meaning!==""&&meaning!==null&&meaning!==undefined)){
                if(this.wordbook.has(word)){
                    return new Error('Слово уже создано, если хотите переопределить используйте метод changeMeaning');
                }else{
                    this.wordbook.set(word,meaning);
                }
                
            }
        else{
            return new Error('Неправильный формат ввода');
        }

    }
    getMeaning(word){
        if(typeof word ==="string"&&word!==""){
            if(this.wordbook.has(word)){
                return this.wordbook.get(word);
            }else{
                return "Слово не найдено";
            }
        }else{
            return new Error('Неправильный формат ввода слова');
        }
    }
    deleteWord(word){
        if(typeof word ==="string"&&word!==""){

            if(this.wordbook.has(word)){
                return this.wordbook.delete(word);
            }else{
                return "Слово не найдено";
            }
        }else{
            return new Error('Неправильный формат ввода слова');
        }
    }
    changeMeaning(word,meaning){
        this.deleteWord(word);
        this.addWord(word,meaning);
    }
    hasWord(word){
        return this.wordbook.has(word);
    }
    sizeWordbook(){
        return this.wordbook.size;
    }
}

module.exports = {
    fioToName,
    filterUnique,
    Dictionary,
    calculateSalaryDifference
};