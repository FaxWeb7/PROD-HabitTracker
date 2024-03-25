# Трекер полезных привычек
 ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)   ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)    ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)    ![SASS](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)     ![REDUX](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) 
<br /> <br />
Веб-приложение с геймификацией для трекинга полезных привычек, поддерживающее PWA (Progressive Web Application). В разработке использован следующий стек технологий:
- React - библиотека для создания пользовательских интерфейсов
- TypeScript - типизация приложения
- Redux - стейт-менеджер для управления глобальным состоянием приложения
- LocalStorage - долговременное хранилище данных в браузере
- Scss - препроцессор для написания стилей 
<br /> <br />

**Cсылка на задеплоенную версию проекта:** [Habit tracker](https://frontend-fax-web7.vercel.app)
<br /> <br />
## Логика веб-приложения: 
- При первом посещении отображается форма, в которой необходимо заполнить поля "Имя" и "Рандомное число от 1 до 100". Рандомное число представляет собой стартовое количество ProdCoin (замена чокопай-коинам) у пользователя. На этой же странице запрашивается разрешение на отправку уведомлений, которые будут отправляться, если у пользователя "висит" вкладка с данным сайтом в оффлайне и он не открывал ее более чем 24 часа.  
- Главная страница веб-приложения - страница со списком привычек, на которой можно как добавить привычку, так и посмотреть данные о любой привычке на текущий день. Также тут можно посмотреть часть своей статистики, изменить текущую дату в приложении и подгрузить данные о привычках из json-файла(dev).
- Пару слов о логике работы привычек, опыта и уровней:
   - Если привычка с периодом 1 день добавлена 15 марта, то она не будет отображаться 14 марта и ранее, но будет отображаться в любой другой день после 15 марта, включая 15 марта.
   - Привычку можно просто перестать трекать, а можно перестать трекать и удалить историю о ней. В первом случае привычка перестает появляться в будущем, то есть если привычка была добавлена 15 марта и перестала трекаться 20 марта, то с 21 марта этой привычки уже не будет в списке привычек, а в периоод с 15 до 20 марта привычка все еще будет отображаться. А во втором случае удаляется вся информация о привычке и она не будет отображаться вовсе. 
   - За каждую выполненную привычку пользователю начисляется опыт, причем чем больше период привычки - тем больше опыта получает пользователь, но важно отметить, что опыт может уйти в минус, за невыполнение привычки предусмотрен штраф в размере ```xp / 4 опыта, где xp - количество получаемого опыта за выполненную привычку с таким же периодом```. Все данные об опыте за каждый период находятся в src/constants/constants.ts
   - Также у пользователя есть уровень, который вычисляется по формуле ```floor(xp / 1500), где xp - количество опыта```. При увеличении уровня можно открывать новые категории привычек *(см. Экстрафичи -> Геймификация).*
 - Страница статистики отображает, во-первых, всю информацию о пользователе (его числовую статистику), а также пару графиков, один из которых отображает количество выполненных привычек в день, а другой - количество добавленных привычек в день.
 - Последняя страница - Магазин, на которой можно совершать действия с ProdCoin'ами. Тут можно как заработать ProdCoin, выполняя задания или обменивая опыт на него, так и тратить ProdCoin на различные плюшки
<br />

## Инструкция по локальному запуску проекта
1. Копирование репозитория
   ```sh
   git clone https://github.com/Central-University-IT-prod/frontend-FaxWeb7.git
   ```
2. Установка NPM зависимостей
   ```xml
   npm install 
   ```
3. Установка конфигурации. Измените конфигурацию в src/constants/constants.ts
    ```js
    // src/constants/constants.ts

    APP_URL='http://localhost:4173'
    ...
    ```
4. Создание билда
   ```js
   npm run build 
   ```
5. Запуск проекта
   ```js
   npm run preview 
   ```
6. Перейти по адресу ```http://localhost:4173``` в браузере
<br />

## Экстрафичи
- Геймификация (может и не экстрафича, но в основных функциях это указано как необязательное)
   - Система прокачки, открывающая новые категории привычек. С ростом уровня пользователя увеличивются и его возможности в добавлении все новых привычек
   - Прогресс-бар наполнения уровня – система, при которой последовательное выполнение привычек без пропусков добавляет коэффициент получения нового опыта. Данная система реализована через "Рекорд", он увеличивается каждый раз, когда пользователь не пропускает ни одной привычки за день, и падает до нуля, если пользователь пропустил хотябв один день. Опыт с учетом текущего рекорда вычисляется по формуле ```xp + (xp * (streak / 100)), где xp - заработанный опыт без учета рекорда, streak - текущий Рекорд```
- Календарь-слайдер на главном экране, с помощью которого можно легко переключать текущий день недели, нажав на нужную дату, либо переключить текущую неделю на предыдущую или следующую, нажав на соответствующие кнопки.
- Модальное окно для каждой привычки, в котором можно не только ставить значения выполнено/не выполнено и удалять привычку, но и получить всю информация о выбранной привычке
- В магазине есть как базовые возможности, по типу пропуска текущего дня и сохранения опыта и стрика, так и продвинутые, как покупка изменения аватарки или имени пользователя. Также есть дополнительные возможности получить ProdCoin'ы, выполняя задания или обменивая опыт на них
- Также я хотел бы выделить дизайн и проработку всех аспектов приложения как дополнительную особенность, поскольку, на мой взгляд, эти элементы играют огромную роль в промышленной фронтенд-разработке и заслуживают особого внимания.

## Автор проекта
Павловский Артём Александрович