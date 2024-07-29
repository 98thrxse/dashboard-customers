class Help {
    create() {
        const help = document.getElementById('help');
        if (help === null) { return; }
        for(let i = 0; i < 3; i++) {
            const block = document.createElement('div');
            block.classList.add('help-block');
            block.textContent = i;
            help.appendChild(block);
        }
    }
}

window.help = new Help();
window.help.create();
