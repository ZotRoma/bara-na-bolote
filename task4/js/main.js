class productData {
    constructor(name,
                image,
                description,
                // id,
                provider){
        this.name = name;
        this.image = image;
        this.description = description;
        // this.id = id;
        this.provider = provider;
    }
}

async function sendForm(form){
    let name = form.name.value;
    let image = form.image.value;
    let description = form.description.value;
    let id = form.code.value;
    let provider = form.provider.value;
    
    product = new productData(name, 
                          image, 
                          description, 
                          //id,
                          provider);


    //Первоначальный вариант - (тут вопрос существует, что лучше использовать)
    //проверка на то существует ли карточка с таким id 
    //если существует удаем ее из DOM
    // if (localStorage.getItem(id) !== null) {
    //     var parent = document.getElementById("cartContainer");
    //     var child = document.getElementById("div"+id);
    //     parent.removeChild(child);
    // }
    // let cCreate = cardCreate(name,image,description,id,provider);
    // document.getElementById('cartContainer').appendChild(cCreate);
    
    //добавляем карточку в localStrorage
    localStorage.setItem(id,JSON.stringify(product));

    //потом подумал что можно отрисовывать все карточки из localStorage
    //но они начали отрисовываться все вместе, так что начал создавать только по 1 карточки
    //далее начал очищать cartContainer
    //если обновлять, то отрисовываются все
    //тут встает вопрос что лучше? удалить элемент и добавить новый
    drawingСards();



}

//функция которая добавляет к HTML элементы все стили из массива
function addClasses(el, styles){
    for(let style in styles){
        el.classList.add(styles[style]);
    }
}

const divPArray = ['form-block_in_card','text__font', 'text__block', 'text_size'];
const divBArray = ['button_gap','text__font', 'text__block', 'text_size'];
const pArray = ['text__font', 'text__block', 'text_size'];
const hArray = ['text__font', 'text__block', 'text_h'];
const bArray = ['button-block','button_gap','text__font', 'text__block', 'text_size'];

const fData = ['form-data'];

const fBICard = ['form-block_in_card'];
const fRBlock = ['form-block-right'];
const fLBlock = ['form-block-left'];

const fImage = ['form-block__img'];




//array1.forEach((element) => console.log(element));



//функция создает карточку и возвращает ее
function cardCreate(  name,
                image,
                description,
                id,
                provider){
    let div_card = document.createElement('div');
    let div_form_block = document.createElement('div');
    let div_description = document.createElement('div');
    let p_description = document.createElement('p');    
    let div_left = document.createElement('div');
    let div_right = document.createElement('div');
    let div_id = document.createElement('div');
    let p_id = document.createElement('p');
    let img_content = document.createElement('img');
    let div_button_group = document.createElement('div');
    let button_redact = document.createElement('button');
    let button_delete = document.createElement('button');
    let div_name = document.createElement('div');
    let p_name = document.createElement('p');
    let div_provider = document.createElement('div');
    let p_provider = document.createElement('p');

    div_card.id = "div"+id;



    p_description.innerHTML = description;
    p_id.innerHTML = id;
    img_content.src = image;
    p_name.innerHTML = name;
    p_provider.innerHTML = provider;

    addClasses(div_card,fData);
    addClasses(div_form_block,fBICard);
    addClasses(div_left,fLBlock);
    addClasses(div_right,fRBlock);

    // div_card.classList.add('form-data');
    // div_form_block.classList.add('form-block_in_card');
    // div_left.classList.add('form-block-left');
    // div_right.classList.add('form-block-right');

    addClasses(div_id,divPArray);
    addClasses(div_description,divPArray);

    
    addClasses(p_id,pArray);
    addClasses(p_description,pArray);//hArray
    addClasses(p_name,hArray);
    addClasses(p_provider,hArray);

    addClasses(button_delete,bArray);
    addClasses(button_redact,bArray);

    addClasses(div_button_group,divBArray);

    addClasses(img_content,fImage);
    

    img_content.classList.add();
    img_content.alt= "тут может быть ваша реклама";


    div_id.innerHTML="ID: ";
    div_description.innerHTML="Описание: ";
    div_id.append(p_id);
    

    // div_right.append(div_button_group);
    div_left.append(div_name);
    div_left.append(div_provider);

    div_name.append(p_name);
    div_provider.append(p_provider);

    div_left.append(div_id);
    div_right.append(img_content);

    div_button_group.append(button_redact);
    div_button_group.append(button_delete);

    button_redact.innerHTML="Редактировать";
    button_delete.innerHTML="Удалить";

    button_redact.id = id;
    button_delete.id = id;

    button_redact.onclick = ()=>{updateCard();};
    button_delete.onclick = ()=>{deleteCard();};

    div_form_block.append(div_left);
    div_form_block.append(div_right);

    div_card.append(div_button_group);
    div_card.append(div_form_block);
    div_card.append(div_description);
    div_description.append(p_description);



    return div_card;
}

//функция которя не используется 
//существует неведомая мне ошибка которая не дает
//удалить дочерний элемент из родительского
//скорее всего это потому что бывает такой момент
//когда не существует дочернего элемента и тут возникает ошибка
function deleteEl(id) {
    var parent = document.getElementById("cartContainer");
    var child = document.getElementById("div"+id);
    parent.removeChild(child);
}

//удаление карточки по нажатию кнопки в карте
function deleteCard() {
    //удаление по одной карте
    var parent = document.getElementById("cartContainer");
    var child = document.getElementById("div"+event.target.id);
    parent.removeChild(child);
    localStorage.removeItem(event.target.id);
    //а это если удалить из localStorage
    //и потом заново все отрисовать
    //drawingСards();
}

//обновление карты по нажатию кнопки в карте
//берем из карточки данные и вставляем в форму
function updateCard() {
    //console.log(event.target.id);

    let name = document.getElementById('name');
    let image = document.getElementById('image');
    let description = document.getElementById('description');
    let id = document.getElementById('code');
    let provider = document.getElementById('provider');

    // console.log(event.target.id)
    // localStorage.removeItem(event.target.id);

    let content = JSON.parse(localStorage.getItem(event.target.id));

    console.log(content);


    name.value = content.name;
    image.value = content.image;
    description.value = content.description;
    id.value = event.target.id;
    provider.value = content.provider;

   //    drawingСards();
}

//снова попытки очистить карточки
//неудачная попытка
async function elementUpdate() {
    var parent = document.getElementById("cartContainer");
    parent.innerHTML='';
}

//создание карточки асинхроное
//посмотрел с доки
async function handleFormSubmit(event) {
    event.preventDefault();
    //console.log(event.target);

    // console.log(data);
    const response = await sendForm(event.target);
}

//навесить на submit событие
const applicantForm = document.getElementById('card-block');
applicantForm.addEventListener('submit', handleFormSubmit);


// name, 
// image, 
// description, 
// //id,
// provider


//перерисовка всех карточек
//сначала отчищаем контейнер карточек
//после отрисовываем все карточки с localStorage
function drawingСards(){
    var parent = document.getElementById("cartContainer");
    parent.innerHTML='';
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let content = JSON.parse(localStorage.getItem(key));
        // console.log(content.hasOwnProperty('name'));
        if (!content.hasOwnProperty('name')&&
            !content.hasOwnProperty('image')&&
            !content.hasOwnProperty('description')&&
            !content.hasOwnProperty('provider')) {continue;}
        
        let card = cardCreate(content.name,content.image,content.description,key,content.provider);
        document.getElementById('cartContainer').appendChild(card);
    }


    //Если кто то читает - то возник вопрос
    //почему последний элемент которого как бы нет === null
    //проходит проверку на null и его никак не поправить
    // for(let key in localStorage) {
    //     if(key == null) console.log(1);
    //     let content = JSON.parse(localStorage.getItem(key));
    //     console.log(content.hasOwnProperty('name'));
    //     // if (typeof content['name'] === "undefined"||
    //     //     typeof content['image'] === "undefined"||
    //     //     typeof content['description'] === "undefined"||
    //     //     typeof content['provider'] === "undefined") {
    //     //   continue; 
    //     // }
    //     // cardCreate(content['name'],content['image'],content['description'],key,content['provider']);
    // }
}

//на обновление страницы реагируем отрисовкой карточек
window.onload = function (){ 
    drawingСards();

}

function defaultOnClick(){
    localStorage.clear();

    product = new productData(name, 
        image, 
        description, 
        //id,
        provider);


    let cCreate1 = new productData('Яблоко',"./assets/YM-2D_KV2rs.jpg",'сочный плод яблони, который употребляется в пищу в свежем и запеченном виде','Качественный');
    let cCreate2 = new productData('Арбуз',"./assets/images.jpg",'однолетнее травянистое растение семейства тыквенные','Не кач');
    let cCreate3 = new productData('Апельсин',"./assets/надоедливый-апельсин.jpg",'оранжевый','Красивый');

    localStorage.setItem(1,JSON.stringify(cCreate1));
    localStorage.setItem(2,JSON.stringify(cCreate2));
    localStorage.setItem(3,JSON.stringify(cCreate3));


    drawingСards();


    // Можно не читать так как баг пофиксил тем что очищаю cartContainer
    // но все равно было непонятно, почему карточки отрисовывались снова
    // при повторном нажатии
    // и удалить карточки я не мог
    // // приходиться обновлять потому что не понимаю 
    // // как можно удалить элемент див
    // // вроде можно взять родителя и ребенка
    // // и из родителя убрать ребенка
    // // но при этом не получается так сделать  - выводит ошибку
    // // такое кстати применяется при удалении карточки я ее удаляю из html и из localStorage
    
    //location.reload();
}


