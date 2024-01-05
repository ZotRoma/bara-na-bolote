import styles from './ui/home.module.css';
import axios from 'axios';

const Infofilm = (props) => {
    const {film, AddFilm} = props;
    console.log(film);
    const addToFavorites = async () =>{
      const response = await axios.post('http://localhost:5000/favorites', film.id);
    }
    return (
        <div className={styles.main_container__right_description}>
              <div className={styles.description_head}>
                <div className={styles.description_head__id}>
                  <p className={styles.id_tag}>ID: </p>
                  <p id="idFilm" className={styles.id_tag}>{film.id}</p>
                </div>
                <div className={styles.description_head__reduct}>
                  <button className={styles.description_container_reduct} onClick={AddFilm}>
                    Редактировать
                  </button>
                  <button className={styles.description_container_reduct} onClick={addToFavorites}>
                    Добавить в избраное
                  </button>
                </div>
              </div>
              <div className={styles.image_block}>
                <img
                  className={styles.image_poster}
                  src={film.posterUrl}
                  alt="тут может быть ваша реклама, просто напишите в Тг"
                />
                <div>
                  <div className={styles.image_block__content_parametrs_all}>
                    <p className={styles.id_tag}>
                        {film.title}
                    </p>
                    <div className={styles.image_block__content_parametrs_all}>
                      <div className={styles.image_block__content_parametrs_tags}>
                        <div className={styles.image_block__content_parametrs}>
                          <p className={styles.id_tag}>Режиссер: </p>
                          <p className={styles.id_tag}>Год выпуска: </p>
                          <p className={styles.id_tag}>Жанры: </p>
                          <p className={styles.id_tag}>Продолжительность: </p>
                          <p className={styles.id_tag}>Оценка: </p>
                        </div>
                        <div className={styles.image_block__content_parametrs}>
                          <p id="director" className={styles.id_tag}>
                            {film.director}
                          </p>
                          <p id="year" className={styles.id_tag}>
                            {film.year}
                          </p>
                          <p id="genres" className={styles.id_tag}>
                            {film.genres.join(', ')}
                          </p>
                          <p id="runtime" className={styles.id_tag}>
                            {film.runtime}
                          </p>
                          <p className={styles.id_tag}>-</p>
                        </div>
                      </div>
                      <div className={styles.image_block__content_role}>
                        <p className={styles.id_tag}>В главных ролях &gt;</p>
                        <p className={styles.id_tag}>
                          {film.actors}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.plot_block}>
                <p className={styles.id_tag}>Описание</p>
                <p className={styles.id_tag}>
                  {film.plot}
                </p>
              </div>
            </div>
    );
}

export default Infofilm;