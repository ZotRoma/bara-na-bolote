function fioToName(fio) {
    const words = fio.split(' ');
    if(words.length>=2){
        return words[1]+" "+words[0];
    }else{
        return "Неправильный формат ввода";
    }
}

console.log(fioToName("Зотов Роман Алексеевич"));