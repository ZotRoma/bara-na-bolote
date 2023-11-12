const assert = require('assert');
const core = require('./es6');

describe('es6', () => {
    describe('#fioToName', () => {
        it('ФИО в Имя Фамилия корректно', () => {
            assert.strictEqual(core.fioToName('Иванов Иван Иванович'), 'Иван Иванов');
        });

        it('ФИ в Имя Фамилия', () => {
            assert.strictEqual(core.fioToName('Петров Петр'), 'Петр Петров');
        });
    });

    describe('#filterUnique', () => {
        it('массив с уникальными равен сам себе', () => {
            assert.deepStrictEqual(core.filterUnique([1, 2, 3]), [1, 2, 3]);
        });

        it('массив с неуникальными отфильтрован', () => {
            assert.deepStrictEqual(core.filterUnique([1, 1, 1, 1]), [1]);
        });

        it('пустой массив', () => {
            assert.deepStrictEqual(core.filterUnique([]), []);
        });
    });

    describe('#calculateSalaryDifference', () => {
        it('считает разницу корректно', () => {
            assert.strictEqual(core.calculateSalaryDifference([1, 2, 3]), 3);
        });

        it('на пустой массив возвращается falsy значение', () => {
            assert.strictEqual(!!core.calculateSalaryDifference([]), false);
        });
    });

    describe('#Dictionary', () => {
        it('экземпляр класса создается', () => {
            const dic = new core.Dictionary();
            
            // TODO
            assert.strictEqual(!!dic, true);
        });
        
        it('добавление слова в словарь', () => {
            const dic = new core.Dictionary();
            
            dic.addWord("roma","name creator this programm");
            dic.addWord("teacher","the person who will check this work");
            // TODO
            assert.strictEqual(dic.getMeaning("roma"), "name creator this programm");
            assert.strictEqual(dic.getMeaning("teacher"), "the person who will check this work");
        });
        it('слово не найдено в словаре', () => {
            const dic = new core.Dictionary();
            
            // TODO
            assert.strictEqual(dic.getMeaning("roma"), "Слово не найдено");
            assert.strictEqual(dic.getMeaning("teacher"), "Слово не найдено");
            assert.strictEqual(dic.getMeaning("first"), "Слово не найдено");
            assert.strictEqual(dic.getMeaning("secon"), "Слово не найдено");
        });
        it('удаление слова из словаря словаре', () => {
            const dic = new core.Dictionary();
            
            dic.addWord("roma","name creator this programm");
            dic.addWord("teacher","the person who will check this work");

            // TODO
            assert.strictEqual(dic.getMeaning("roma"), "name creator this programm");
            assert.strictEqual(dic.getMeaning("teacher"), "the person who will check this work");

            dic.deleteWord("roma");
            dic.deleteWord("teacher");

            assert.strictEqual(dic.getMeaning("roma"), "Слово не найдено");
            assert.strictEqual(dic.getMeaning("teacher"), "Слово не найдено");
        });
        it('изменение описания из словаря словаре', () => {
            const dic = new core.Dictionary();
            
            dic.addWord("roma","name creator this programm");
            dic.addWord("teacher","the person who will check this work");

            // TODO
            assert.strictEqual(dic.getMeaning("roma"), "name creator this programm");
            assert.strictEqual(dic.getMeaning("teacher"), "the person who will check this work");

            dic.changeMeaning("roma", "genius");
            dic.changeMeaning("teacher", "good man");

            assert.strictEqual(dic.getMeaning("roma"), "genius");
            assert.strictEqual(dic.getMeaning("teacher"), "good man");
        });
        it('размер словаря', () => {
            const dic = new core.Dictionary();
            assert.strictEqual(dic.sizeWordbook(), 0);
            dic.addWord("roma","name creator this programm");
            dic.addWord("teacher","the person who will check this work");

            // TODO
            assert.strictEqual(dic.sizeWordbook(), 2);
            
        });
        it('существование слова в словаре', () => {
            const dic = new core.Dictionary();
            
            dic.addWord("roma","name creator this programm");
            dic.addWord("teacher","the person who will check this work");

            // TODO
            assert.strictEqual(dic.hasWord("roma"), true);
            assert.strictEqual(dic.hasWord("teacher"), true);
            
        });
    });
});