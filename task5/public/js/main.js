class productData {
    constructor(name,
                image,
                description,
                id,
                provider){
        this.name = name;
        this.image = image;
        this.description = description;
        this.id = id;
        this.provider = provider;
    }
};

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

function cardCreate(cardData){
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

    div_card.id = "div"+cardData.id;


   //    console.log(cardData);

    p_description.innerHTML = cardData.description;
    p_id.innerHTML = cardData.id;
    img_content.src = '/assets/' +  cardData.image;
    p_name.innerHTML = cardData.name;
    p_provider.innerHTML = cardData.provider;

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

    button_redact.id = 'button_update_' + cardData.id;
    button_delete.id = 'button_delete_' + cardData.id;

    button_redact.onclick = ()=>{updateCard(button_redact);};
    button_delete.onclick = ()=>{deleteCard(button_delete);};

    div_form_block.append(div_left);
    div_form_block.append(div_right);

    div_card.append(div_button_group);
    div_card.append(div_form_block);
    div_card.append(div_description);
    div_description.append(p_description);



    return div_card;
};

function addClasses(el, styles){
    for(let style in styles){
        el.classList.add(styles[style]);
    }
};

const creatorInfoUrl = 'http://localhost:3000/creatorInfo';
const creatorItemsUrl = 'http://localhost:3000/items';

fetch(creatorInfoUrl)
            .then(response => response.json())
            .then(data => {
                // Выводим данные на странице
                const dataContainer = document.getElementById('creatorMan');
                dataContainer.innerHTML = data.group + " " + data.name;// JSON.stringify(data, null, 2);
            })
            .catch(error => console.error('Error:', error));


fetch(creatorItemsUrl)
            .then(response => response.json())
            .then(data => {
                document.getElementById('preloader').style.display = 'hidden';
                //console.log(data);
                // Выводим данные на странице
                setTimeout( () =>{
                    //console.log(data);
                    const dataContainer = document.getElementById('cartContainer');
                    for(let i = 0; i<data.length; i++){
                        //console.log(data[i]);
                        dataContainer.appendChild(cardCreate(data[i]));
                    }// JSON.stringify(data, null, 2);
                    document.getElementById('preloader').style.display = 'none';
                },
                1000);
                

                
            })
            .catch(error => console.error('Error:', error));


function reworkingСards(url){
    return fetch(creatorItemsUrl)
            .then(response => response.json())
            .then(data => {
               // console.log(data);
                const dataContainer = document.getElementById('cartContainer');

                let preloader = document.createElement('div');
                let preloaderColeso = document.createElement('div');

                preloader.id = "preloader";
                preloaderColeso.classList.add("spinner");

                preloader.appendChild(preloaderColeso);

                preloader.style.display = "hidden"
                dataContainer.innerHTML = "";
                dataContainer.appendChild(preloader);


                //console.log(data);
                // Выводим данные на странице
                setTimeout( () =>{
                    //console.log(data);
                    
                    dataContainer.innerHTML="";
                   // console.log(data);
                    for(let i = 0; i<data.length; i++){
                        //console.log(data[i]);
                        dataContainer.appendChild(cardCreate(data[i]));
                    }// JSON.stringify(data, null, 2);
                    //document.getElementById('preloader').style.display = 'none';
                },
                1000);
            })
            .catch(error => console.error('Error:', error));
}

// Функция для отправки POST запроса
function postData(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}     

function putData(url, data) {
    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(error => console.error('Error:', error));
}   

function deleteData(url) {
    return fetch(url, {
        method: 'DELETE',
    })
    .catch(error => console.error('Error:', error));
}  


async function deleteCard(button) {
    //удаление по одной карте
    // var parent = document.getElementById("cartContainer");
    // var child = document.getElementById("div"+target.id);
    // parent.removeChild(child);
    // localStorage.removeItem(target.id);
    //а это если удалить из localStorage
    //и потом заново все отрисовать
    //drawingСards();

    // читатель, я понимаю, что тут делаю что то не так, но я крайне не понимаю как это пофиксить
    // если есть достаточно легкий для понимаю способ сделать по другому
    // прошу приложить ссылочку на место где можно прочитать
    // P.S. когда я говорю про достаточно легкий - я имею ввиду что даже ребенок поймет
    // как было:
    // let urlDelete = creatorItemsUrl+'/'+ event.target.id;
    // P.S.S. уже не надо, просто оказывается можно кнопку передать, ну и ладно, ну и пожалуйста

    // P.S.S.S. кстати избавился от того, что у меня сразу несколько одинаковых id
    
    let urlDelete = creatorItemsUrl+'/'+ button.id.substr(14);;
    //console.log(urlDelete);
    await deleteData(urlDelete);
    const rerun = await reworkingСards(creatorItemsUrl);

    //reworkingСards(creatorItemsUrl);
}

function preLoad() {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'hidden';
};

function getCard(url){
    return fetch(url)
        .then(response => {return response.json();})
        .catch(error => {
            console.error("Объект не найден:", error.message);
        });
     //response.body;
}


async function defaultOnClick(){
    let cCreate1 = new productData('Яблоко',"YM-2D_KV2rs.jpg",'сочный плод яблони, который употребляется в пищу в свежем и запеченном виде',1,'Качественный');
    let cCreate2 = new productData('Арбуз',"images.jpg",'однолетнее травянистое растение семейства тыквенные',2,'Не кач');
    let cCreate3 = new productData('Апельсин',"надоедливый-апельсин.jpg",'оранжевый',3,'Красивый');


    await postData(creatorItemsUrl, cCreate1);
    await postData(creatorItemsUrl, cCreate2);
    await postData(creatorItemsUrl, cCreate3);
    
    reworkingСards(creatorItemsUrl);
}

async function updateCard(button){
    let urlUpdate = creatorItemsUrl+'/'+ button.id.substr(14);;
    console.log(urlUpdate);
    //await deleteData(urlDelete);


    let name = document.getElementById('name');
    let image = document.getElementById('image');
    let description = document.getElementById('description');
    let id = document.getElementById('code');
    let provider = document.getElementById('provider');

    // console.log(event.target.id)
    // localStorage.removeItem(event.target.id);






    const data = await getCard(urlUpdate);

    name.value = data.name;
    image.value = data.image;
    description.value = data.description;
    id.value = data.id;
    provider.value = data.provider;



   // const rerun = await reworkingСards(creatorItemsUrl);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    //console.log(event.target);
    let name = event.target.name.value;
    let image = event.target.image.value;
    let description = event.target.description.value;
    let id = event.target.code.value;
    let provider = event.target.provider.value;

    let data = new productData(name, 
        image, 
        description, 
        id,
        provider);
    // console.log(data);

    //console.log(    getStatusCard(creatorItemsUrl+"/"+id));
    //console.log();
    let idCard = creatorItemsUrl+"/"+id;
    const getitem = await fetch(idCard);

    //console.log(getitem)
    if(getitem.ok){const response = await putData(idCard, data);}
    else {const response = await postData(creatorItemsUrl, data);}
    //if(!getStatusCard(creatorItemsUrl+"/"+id).ok) 
   // else 
    
    

    const rerun = await reworkingСards(creatorItemsUrl);
}

const applicantForm = document.getElementById('card-block');
applicantForm.addEventListener('submit', handleFormSubmit);