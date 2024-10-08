const cells = document.querySelectorAll('.cell');

let dragSrcEl = null;

function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragEnter(e) {
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        
        // Add 'changed' class to the target cell only
        this.classList.add('changed');
    }

    return false;
}

function handleDragEnd(e) {
    cells.forEach(cell => {
        cell.classList.remove('over');
    });
}

cells.forEach(cell => {
    cell.addEventListener('dragstart', handleDragStart);
    cell.addEventListener('dragenter', handleDragEnter);
    cell.addEventListener('dragover', handleDragOver);
    cell.addEventListener('dragleave', handleDragLeave);
    cell.addEventListener('drop', handleDrop);
    cell.addEventListener('dragend', handleDragEnd);
});
