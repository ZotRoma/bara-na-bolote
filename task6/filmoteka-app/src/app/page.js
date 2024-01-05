'use client';
import styles from './ui/home.module.css'
import Image from 'next/image'
import Film from './films'
import Infofilm from './infofilm'
import Formfilm from './formfilm'
import { useState, useEffect } from "react";
import FilmList from './filmsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import './ui/app.css'

import movies from '../../db.json';

const filterFilms = (searchText, listOfFilms) => {
  if (!searchText) {
    return listOfFilms;
  }
  return listOfFilms.filter(({ title }) =>
    title.toLowerCase().includes(searchText.toLowerCase())
  );
}

let dataF = [];//movies.movies;

// Выполнить запрос к серверу перед отрисовкой компонента
axios.get('http://localhost:5000/movies')
  .then(response => {
    dataF = response.data;
    //console.log(dataF);
  })
  .catch(error => console.error('Error:', error));

export default function Home() {
  const [firstData, setFirstData] = useState(dataF);
  const [creator, setCreator] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [inFilm, setInFilm] = useState(false);
  


  useEffect(() => {
    // Выполнить запрос к серверу перед отрисовкой компонента
    axios.get('http://localhost:5000/creator')
      .then(response => {
        //console.log(response.data[0]);
        setCreator(response.data[0]);
      })
      .catch(error => console.error('Error:', error));
  }, []); 



  useEffect(() => {
    // Выполнить запрос к серверу перед отрисовкой компонента
    axios.get('http://localhost:5000/movies')
      .then(response => {
        dataF = response.data;
       // console.log(dataF);
      })
      .catch(error => console.error('Error:', error));
  }, []); 

 // console.log(dataF)

  const [filmList, setFilmList] = useState(dataF);
  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredFilms = filterFilms(searchTerm, dataF);
      setFilmList(filteredFilms);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchTerm]);


  
  const [typeRabFilm, setTypeFilm] = useState(1);
  const [typeRabFilmBase, setTypeFilmBase] = useState(132);

  const filmClick = (id) => {
    // Инвертируем значение состояния при каждом нажатии
    setTypeFilmBase(typeRabFilm);
    setTypeFilm(id);
    
  };

  const trueInFilm = (booIn) =>{
    setInFilm(booIn)
  }

  const handleButtonClick = () => {
    console.log('Кнопка была нажата!');
  };

  const pokraska = (typeRabFilmBase) =>{
    document.getElementById(typeRabFilmBase).className = styles.main_container__left_film_block;
  }

  const UpdateFilm = () => {
    let id = document.getElementById("idFilm").innerHTML;
   // console.log(id);
  }
  
  const AddFilm = () => {
   // let id = document.getElementById("idFilm").innerHTML;
    setShowForm(!showForm);
    //console.log(id);
  }

  //console.log(typeRabFilm)

  return (
    <>
    <title>Админка фильмотеки</title>
    <header>
      <div className={styles.header_blok}>
        <div className={styles.header_blok__all}>
          <div className={styles.header_block}>
            <div className={styles.header_block__left}>
              <p className={styles.header_text_name}>Админка фильмотеки</p>
            </div>
            <div className={styles.header_block__right}>
              <div className={styles.header_obzesti__chtob__vipendritsya}>
                <p className={styles.header_text_creator}>
                  {creator}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
    <section>
      <div className={styles.main_container}>
        <div className={styles.main_container__all}>
          <div className={styles.main_container__left}>
            <div className={styles.main_container__left_inner}>
  
              <div className={styles.main_container__left_input_block}>
                <input
                  className={styles.main_container__input}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Введите название фильма"
                  readOnly={inFilm}
                />
                <button className={styles.main_container__button}>Искать</button>
              </div>
  
              <div id="FilmsList" className={styles.main_container__left_inner_block}>


                  {
                    filmList.map(function(elem, index) {
                      return (
                        <Film
                            key={index}
                            filmName={elem.title}
                            filmYear={elem.year}
                            filmTags={elem.genres.join(', ')}
                            filmId = {elem.id}
                            onUpdateParentVariable={filmClick} 
                            typeRabFilm={typeRabFilm}
                            onUpdateParentVariableBase ={pokraska} 
                            typeRabFilmBase={typeRabFilmBase}
                            typeInFilm = {inFilm}
                            typeSetInFulm = {trueInFilm}
                          />
                       ) 
                    })
                  }

            
  
                
              </div>
            </div>
            <div className={styles.main_container__left_footer}>
              <div className={styles.main_container__left_footer_line}>

              </div>
              <div className={styles.main_container__left_footer_info}>
                <p className={styles.main_container__left_footer_info_num_searched}>
                  Найдено элементов: {filmList.length}
                </p>
                <button className={styles.main_container_footer_button_accept} onClick={AddFilm}>
                  {" "}
                  + Добавить
                </button>
              </div>
            </div>
          </div>

          <div className={styles.main_container__right}>
            {inFilm&&!showForm ? <Infofilm film={firstData[typeRabFilm]} AddFilm ={AddFilm}/> : null}
            {!inFilm&&showForm ? <Formfilm showForm = {showForm} cancelAddFilm = {AddFilm} />   : null}
            {inFilm&&showForm ? <Formfilm showForm = {showForm} cancelAddFilm = {AddFilm} inFilm={inFilm} typeRabFilm={typeRabFilm+1} />   : null}
            {/* {showForm ? <Formfilm > </Formfilm> :<Infofilm film={filmList[typeRabFilm]} onUpdateParentVariable={UpdateFilm}></Infofilm>} */}
          </div>

        </div>
      </div>
    </section>s
    <footer>
      <div className={styles.footer_block}></div>
    </footer>
  </>
  )
}
