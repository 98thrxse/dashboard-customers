class Income {
    create() {
        const income = document.getElementById('income');
        if (income === null) { return; }
        for(let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            block.classList.add('income-block');
            block.textContent = i;
            if (i == 0) {
                block.classList.add('income-block-big');
            }
            income.appendChild(block);
        }
    }
}

window.income = new Income();
window.income.create();
