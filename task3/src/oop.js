/**
 * Напишите класс геометрической точки, принимающей в конструкторе координаты X и Y
 * Если координаты не переданы - 0,0; Аналогично если только 1 координата.
 * Со звездочкой: реализовать метод, который возвращает расстояние от точки до центра координат (0, 0)
 */
class Point {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }
    
    distanseToZero() {
        return Math.sqrt(this.x**2+this.y**2);
    }

}

/**
 * Напишите класс геометрической точки в трехмерном пространстве (x, y, z),
 * который будет наследоваться от точки в двумерном пространстве.
 * Реализовать статический метод, который возвращает расстояние между Point3D.
 */
class Point3D extends Point {
    constructor(x = 0, y = 0, z = 0){
        super(x,y);
        this.z = z;
    }
    static vectorLength(a, b) {
        return Math.sqrt((a.x-b.x)**2+(a.y-b.y)**2+(a.z-b.z)**2)
    }
}

/**
 * Напишите класс "очередь", в котором можно добавить элемент в конец и получить из начала.
 * Предусмотреть 2 варианта инициализации - массивом в конструкторе (из него создается очередь) и без параметров.
 * Со звездочкой: написать тесты методы класса (oop.spec.js)
 */

class Queue {
    constructor(arr=[]){
        this.queue = arr;
        if(arr.length === undefined){
            this.size = 0;
        }else{
            this.size = arr.length;
        }
    }

    push(...elems){
        //this.queue.push(elem);
        Array.prototype.push.apply(this.queue, elems);
        
        this.size=this.queue.length;
        //console.log(this.size);
    }

    pop(){
        if(this.size > 0){
            this.size--;
        }
        return this.queue.shift();
    }
    clear(){
        this.size = 0;
        this.queue.length = 0;
       // console.log(this.queue);
    }
    equals(queue){
        if(this.size===queue.size){
            for(let i = 0; i<this.size; i++){
                if(this.queue[i]!=queue.queue[i]){ return false;}
            }
            return true
        }else{
            return false
        }
    }
    toString(){
        return this.queue.join(' ');
    }

}
/*
// хотелось сделалть без метода shift
class Queue {
    constructor(arr=[]){
        this.queue = arr;
        this.first = 0;
        if(arr.length!==0){
            this.last = arr.length-1;
        }else{
            this.last = 0;
        }
    }

    add(elem){
        this.queue.push(elem);
        this.last++;
    }

    get(){
        this.first++;
        return this.queue[this.first-1];
    }

    size(){
        return this.queue.length;
    }
}*/



module.exports = {
    Point,
    Point3D,
    Queue,
};
