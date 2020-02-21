VK.init({ // подключение приложения
    apiId: 7298671 // id приложения
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login((data)=>{ // отправка запроса на разрешение/ функция выполнится когда пользователь что то сделает с окном
            if (data.session) { // если разрешил/ если авторизовались
                resolve(); // переход к .then()
            } else {
                reject();
            }
        }, 2 | 4 | 8); // коды доступа к определенной информации // VK.Auth.revokeGrants() //очистить авторизацию
    })
}

function callApi(method, params){ //универсальная функция для вызова разных методов с разными параметрами
    params.v = '5.103'; // версия запроса
    return new Promise((resolve, reject) => {
        VK.api(method, params, (data)=>{
            if (data.error){ // если появилась ошибка
                reject(data.error)
            } else { // если все норм
                resolve(data.response);
            }
        })
    })
}

function geocode(address) {
    return ymaps.geocode(address)
        .then(result => {
            const points = result.geoObjects.toArray();

            if (points.length) {
                return points[0].geometry.getCoordinates();
            }
        });
}



let myMap;
let clusterer;

// new Promise(resolve => ymaps.ready(resolve)) // ждем загрузку карты
//     .then(() => auth()) // авторизация источника данных
//     .then(() => callApi('friends.get', { fields: 'city,country' })) // получаем список записей
//     .then(friends => {
//         myMap = new ymaps.Map('mapsCont', {
//             center: [55.76, 37.64], // Москва
//             zoom: 5
//         }, {
//             searchControlProvider: 'yandex#search'
//         });
//         clusterer = new ymaps.Clusterer({
//             preset: 'islands#invertedVioletClusterIcons',
//             clusterDisableClickZoom: true,
//             openBalloonOnClick: false
//         });
//
//         myMap.geoObjects.add(clusterer);
//
//         return friends.items;
//     }) // инициализация карты
//     .then(friends => {
//         const promises = friends
//             .filter(friend => friend.country && friend.country.title)
//             .map(friend => {
//                 let parts = friend.country.title;
//
//                 if (friend.city) {
//                     parts += ' ' + friend.city.title;
//                 }
//
//                 return parts;
//             })
//             .map(geocode);
//
//         return Promise.all(promises);
//     }) // получение адресов и координат
//     .then(coords => {
//         const placemarks = coords.map(coord => {
//             return new ymaps.Placemark(coord, {}, { preset: 'islands#blueHomeCircleIcon' })
//         });
//
//         clusterer.add(placemarks);
//     }) // добавляем гео-объекты на карту
//     .catch(e => alert('Ошибка: ' + e.message));

new Promise((resolve)=>{ymaps.ready(resolve)}) // когда дождались загрузку карты
    .then(()=>{auth()}) // авторизируемся в ВК
    .then(()=>{ return callApi('friends.get', {fields: 'city, country'})}) // получаем информацию о друзьях
    .then((friends)=>{ // получаем список друзей
        myMap = new ymaps.Map('mapsCont', { // создание яндекс карты. mapsCont - id элемента куда карта будет помещена
            center: [55.76, 37.00], // координаты карты
            zoom: 10 // приближение
        }, { searchControlProvider: 'yandex#search' }); // вывод элементов интерфейса

        clusterer = new ymaps.Clusterer({ // создание кластеререзатора (схлопывание меток на карте из нескольких в одну)
            preset: 'islands#invertedVioletClusterIcons', // тип иконки на карте
            clusterDisableClickZoom: true, // запрет зума при клике по элементу на карте
            openBalloonOnClick: false // запрет открытия информации о метке при клике по ней
        });

        myMap.geoObjects.add(clusterer); // добавление кластеререзатора на карту
        return friends.items; // пробрасываем список друзей дальше по промисам

    })
    .then((friends)=>{ // получение адресов и координат из
        console.log(friends);
        const promises = friends
            .filter(friend=> friend.country && friend.country.title) // оставляем в массиве только тех друзей у которых указана страна
            .map(friend=>{ // получаем страну и город из друзей/ map срабатывает для каждого элемента массива(друзей)
                let parts = friend.country.title; // получаем названия страны
                // если city существует
                if (friend.city) {parts += ' ' + friend.city.title;} // к названию страны прибавляем название города
                return parts;
            })
            .map((string)=>{geocode(string)}); // отправляем адреса в геокод и получаем из адресов координаты //string - адрес
        return Promise.all(promises); // возвращает промис когда все промисы (в all) разрешатся(выполнятся)
    })
    .then((cords)=>{
        const placemarks = cords.map((cord)=>{
            return new ymaps.Placemark(cord, {}, {preset: 'islands#blueHomeCircleIcon'})
        });
        clusterer.add(placemarks);
    });


// auth()
//     .then(()=>{ // когда все норм
//         return callApi('friends.get', {fields: 'city, country'}) //отправка запроса на получения списка друзей и их фото
//     })
//     .then((data)=>{ // когда список друзей будет получен
//         const resu = document.querySelector('.results');
//         for (let i = 0; i < data.items.length; i++){ // перебор всех друзей
//             let country = data.items[i].country.title || '';
//             resu.innerHTML += data.items[i].id + ' ' + data.items[i].last_name + '<br>';
//             resu.innerHTML += country +'<br>';
//             console.log(data.items[i].id);
//         }
//         console.log(data);
//     });