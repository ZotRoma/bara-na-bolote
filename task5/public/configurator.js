// const concurrently = require('concurrently');

// // Запускаем JSON-сервер на порту 3000
// const jsonServerCommand = 'json-server --watch db.json --port 3000';

// // Запускаем сервер для HTML на порту 8000
// const htmlServerCommand = 'http-server -p 8000';

// // Запускаем оба сервера параллельно
// // Запускаем оба сервера параллельно
// concurrently([jsonServerCommand, htmlServerCommand], {
//   prefix: 'name',
//   killOthers: ['failure', 'success'],
// }).then(
//   () => {
//     console.log('Оба сервера успешно запущены.');
//   },
//   (err) => {
//     console.error('Ошибка при запуске серверов:', err);
//   }
// );
const concurrently = require('concurrently');
const { result } = concurrently(
  [
    
    { command: 'json-server --watch db.json --port 3000', name: 'serverBack' },
    //{ command: 'http-server -o /layout.html -p 8080', name: 'serverFront', },
    { command: 'node server.js', name: 'server', },
  ],
  { 
    prefix: 'name',
    killOthers: ['failure', 'success'],
    restartTries: 3,
  }
);
result.then(success, failure);

function success() {
  console.log('Оба сервера успешно запущены.');
}

function failure(err) {
  console.error('Ошибка при запуске серверов:', err);
}