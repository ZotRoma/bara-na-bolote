import styles from './ui/home.module.css';
import { useState, useEffect } from "react";
import axios from 'axios';

const Formfilm = (props ) => {
    const {showForm, cancelAddFilm, inFilm,typeRabFilm}  =  props;
    const cancellAdd = () => {
      cancelAddFilm();
    }
    const [formData, setFormData] = useState({
      title: '',
      year: '',
      plot:'',
      posterUrl:'',
      actors:'',
      genres: [],
      director:'',
      runtime:'',
    });

    const handleChange = (e) => {
      const { name, value } = e.target;

      const updatedFormData = { ...formData };

      if (name === 'genres') {
        const updatedGender = formData.gender.includes(value)
          ? formData.gender.filter((item) => item !== value)
          : [...formData.gender, value]; 

        updatedFormData[name] = updatedGender;
      } else {
        updatedFormData[name] = value;
      }

      // Обновление состояния формы
      setFormData(updatedFormData);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        // Отправка данных на сервер
        console.log('http://localhost:5000/movies/'+typeRabFilm)
        if(!inFilm&&showForm) {const response = await axios.post('http://localhost:5000/movies', formData);}
        else {const response = await axios.put('http://localhost:5000/movies/'+typeRabFilm, formData);}
        
        console.log('Server response:', response.data);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  
    return (
      <>
        <div className={styles.main_container__right}>
          <div className={styles.form_block__create}>
            {/* onsubmit="return checkForm(this)" */}
            <p className={styles.form_block__title}>
              <b>Редактирование / Создание</b>
            </p>
            <form id="data_film" onSubmit={handleSubmit} className={styles.form_block__create_allin}>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Название фильма</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Введите название фильма"
                    required=""
                    autofocus=""
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Год выпуска</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Введите год выпуска"
                    required=""
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Описание</b>
                </p>
                <label>
                  <textarea
                    className={styles.form_textarea}
                    type="text"
                    name="plot"
                    id="plot"
                    placeholder="Введите описание"
                    required=""
                    defaultValue={""}
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Укажите ссылку на обложку</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                    name="posterUrl"
                    id="posterUrl"
                    placeholder="Введите ссылку на обложку"
                    required=""
                  />
                </label>
              </div>
              {/* <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Рейтинг</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="number"
                    name="rating"
                    id="rating"
                    placeholder="Задайте рейтинг"
                    required=""
                  />
                </label>
              </div> */}
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Укажите список актеров</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                    name="actors"
                    id="actors"
                    placeholder="Введите актеров (через ,)"
                    required=""
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p>
                  <b>Укажите жанры</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                    name="genres"
                    id="genres"
                    placeholder="Введите жанры (через ;)"
                    required=""
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Режиссер</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="text"
                    name="director"
                    id="director"
                    placeholder="Введите режисера"
                    required=""
                  />
                </label>
              </div>
              <div className={styles.form_block__create_in}>
                <p className={styles.form_block__name_block}>
                  <b>Продолжительность фильма</b>
                </p>
                <label>
                  <input
                    onChange={handleChange}
                    className={styles.form_input}
                    type="number"
                    name="runtime"
                    id="runtime"
                    placeholder="Введите продолжительность фильма"
                    required=""
                  />
                </label>
              </div>
            </form>
          </div>
          <div className={styles.card_block__button_d}>
            <div className={styles.main_container__left_footer_line}></div>
            <div className={styles.button_block}>
              <button
                form="data_film"
                className={styles.main_container_footer_button_decline}
                type="reset"
                onClick={cancellAdd}
              >
                Отменить
              </button>
              <button
                form="data_film"
                className={styles.main_container_footer_button_accept}
                type="submit"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </>
    );
}

export default Formfilm;