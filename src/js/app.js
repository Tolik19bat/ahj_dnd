const deleteButton = document.querySelectorAll('.column__card-button');
const addButton = document.querySelector('.add_card')
const cardContent = document.querySelector('.column__card-content_add')
const columns = document.querySelectorAll('.column')
const columnTitle = document.querySelector('.column_title')
const mainContainer = document.querySelector('.main_container')
let actualCard = null;

addButton.addEventListener('click', function() {
    const newColumnCard = document.createElement('div');
    newColumnCard.classList.add('column__card');
    newColumnCard.draggable = true;
    newColumnCard.id = Math.random().toString(36).substring(2);
    newColumnCard.innerHTML = '<div class="column__card-content">Здесь будут прописаны задачи</div><button class="column__card-button"></button>';
    columnTitle.insertAdjacentElement("afterEnd", newColumnCard);
    newColumnCard.addEventListener('dragstart', dragStart);
    newColumnCard.addEventListener('dragend', dragEnd);
});

mainContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('column__card-button')) {
        const card = event.target.closest('.column__card');
        if (card) {
            card.remove();
        }
    } 
});

function dragStart (e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    this.classList.add("is-dragging");
};

function dragEnd () {
    this.classList = 'column__card';
};

function dragEnter (e) {
    e.preventDefault();
    this.classList.add('hovered');
};

function dragLeave () {
    this.classList.remove('hovered');
};

function dragOver (e) {
    e.preventDefault();
};

for (const column of columns) {
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
}

function drop (e) {
    e.preventDefault();
    this.classList = 'column'
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    this.append(draggableElement);
};