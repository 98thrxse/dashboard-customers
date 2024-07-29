class Promote {
    create() {
        const promote = document.getElementById('promote');
        if (promote === null) { return; }
        for(let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            block.classList.add('promote-block');
            block.textContent = i;
            if (i == 0) {
                block.classList.add('promote-block-big');
            }
            promote.appendChild(block);
        }
    }
}

window.promote = new Promote();
window.promote.create();
