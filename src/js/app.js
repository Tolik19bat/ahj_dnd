// Получаем все кнопки удаления
const deleteButton = document.querySelectorAll('.column__card-button');
// Получаем кнопку добавления
const addButton = document.querySelector('.add_card')
// Получаем контент карточки
const cardContent = document.querySelector('.column__card-content_add')
// Получаем все колонки
const columns = document.querySelectorAll('.column')
// Получаем заголовок колонки
const columnTitle = document.querySelector('.column_title')
// Получаем главный контейнер
const mainContainer = document.querySelector('.main_container')
// Инициализируем переменную для текущей карточки
let actualCard = null;

// Добавляем обработчик события клика на кнопку добавления
addButton.addEventListener('click', function() {
    // Создаем новую карточку
    const newColumnCard = document.createElement('div');
    // Добавляем классы и атрибуты
    newColumnCard.classList.add('column__card');
    newColumnCard.draggable = true;
    newColumnCard.id = Math.random().toString(36).substring(2);
    // Задаем HTML содержимое карточки
    newColumnCard.innerHTML = '<div class="column__card-content">Здесь будут прописаны задачи</div><button class="column__card-button"></button>';
    // Вставляем новую карточку после заголовка колонки
    columnTitle.insertAdjacentElement("afterEnd", newColumnCard);
    // Добавляем обработчики событий dragstart и dragend
    newColumnCard.addEventListener('dragstart', dragStart);
    newColumnCard.addEventListener('dragend', dragEnd);
});

// Добавляем обработчик события клика на главный контейнер
mainContainer.addEventListener('click', function(event) {
    // Если клик был по кнопке удаления
    if (event.target.classList.contains('column__card-button')) {
        // Находим ближайшую карточку и удаляем ее
        const card = event.target.closest('.column__card');
        if (card) {
            card.remove();
        }
    } 
});

// Обработчик начала перетаскивания
function dragStart (e) {
    // Запоминаем id перетаскиваемого элемента
    e.dataTransfer.setData('text/plain', e.target.id);
    // Добавляем класс для стилизации
    this.classList.add("is-dragging");
};

// Обработчик окончания перетаскивания
function dragEnd () {
    // Возвращаем исходные классы элементу
    this.classList = 'column__card';
};

// Обработчик входа перетаскиваемого элемента в зону дропа
function dragEnter (e) {
    // Предотвращаем стандартное поведение
    e.preventDefault();
    // Добавляем класс для стилизации
    this.classList.add('hovered');
};

// Обработчик выхода перетаскиваемого элемента из зоны дропа
function dragLeave () {
    // Удаляем класс для стилизации
    this.classList.remove('hovered');
};

// Обработчик перемещения перетаскиваемого элемента над зоной дропа
function dragOver (e) {
    // Предотвращаем стандартное поведение
    e.preventDefault();
};

// Добавляем обработчики событий для каждой колонки
for (const column of columns) {
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
}

// Обработчик события дропа
function drop (e) {
    // Предотвращаем стандартное поведение
    e.preventDefault();
    // Возвращаем исходные классы элементу
    this.classList = 'column'
    // Получаем id перетаскиваемого элемента
    const id = e.dataTransfer.getData('text/plain');
    // Находим перетаскиваемый элемент по id
    const draggableElement = document.getElementById(id);
    // Добавляем перетаскиваемый элемент в колонку
    this.append(draggableElement);
};
