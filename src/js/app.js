const deleteButton = document.querySelectorAll('.column__card-button');
const addButton = document.querySelector('.add_card')
const cardContent = document.querySelector('.column__card-content_add')
const columns = document.querySelectorAll('.column')
const columnTitle = document.querySelector('.column_title')
const mainContainer = document.querySelector('.main_container')
let actualCard = null;
const tasks = document.querySelectorAll('.column__card')

addButton.addEventListener('click', function() {
    const newColumnCard = document.createElement('div');
    columnTitle.insertAdjacentHTML("afterEnd", '<div class="column__card" draggable="true"><div class="column__card-content">Здесь будут прописаны задачи</div><button class="column__card-button"></button></div>')
});

mainContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('column__card-button')) {
        const card = event.target.closest('.column__card');
        if (card) {
            card.remove();
        }
    } 
});

function dragStart () {
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

tasks.forEach(task => {
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
});

for (const column of columns) {
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
}

function drop (e) {
    e.preventDefault();
    this.classList = 'column'
    this.append(task)
};

