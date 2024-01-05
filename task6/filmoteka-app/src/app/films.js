import styles from './ui/home.module.css';
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { MyContext } from './';


const Film = (props) => {
    const {filmName, filmYear, filmTags, filmId, onUpdateParentVariable, typeRabFilm, onUpdateParentVariableBase, typeRabFilmBase,typeInFilm,typeSetInFulm}  =  props;
    //onUpdateParentVariableBase ={pokraska} 
    //typeRabFilmBase={typeRabFilmBase}
    // onUpdateParentVariableBase ={pokraska} 
    // typeRabFilmBase={typeRabFilmBase}
    // typeInFilm = {inFilm}
    // typeSetInFulm = {trueInFilm}
    let id = 1;
    const updateVariableAndCallParentFunction  = () => {
        // Инвертируем значение состояния при каждом нажатии
        onUpdateParentVariable(filmId-1);
        // document.getElementById(filmId-1).style = 'main_container__left_film_block_grey';

        typeSetInFulm((filmId-1!== typeRabFilm) )

        const elementId = filmId;
        if(document.getElementById(typeRabFilm+1)){
        document.getElementById(typeRabFilm+1).className = styles.main_container__left_film_block;}
        //onUpdateParentVariableBase(parentVariable);
        // Получение ссылки на элемент по ID
        const element = document.getElementById(elementId);
        if (element&&(filmId-1!== typeRabFilm) ) {
            element.className = styles.main_container__left_film_block_grey;
        }
      };

    let link = "/about"+filmId;
    return (
        
            <div id={filmId} onClick = {updateVariableAndCallParentFunction } className={styles.main_container__left_film_block}>
                <div className={styles.main_container__film}>
                <div className={styles.film_name}>
                    <p>{filmName}</p>
                </div>
                <div className={styles.film_teg}>
                    <div className={styles.film_year}>
                    <p>{filmYear}</p>
                    </div>
                    <div>|</div>
                    <div className={styles.film_tegs}>
                    <p>{filmTags}</p>
                    </div>
                </div>
                </div>
            </div>

    );
}

export default Film;