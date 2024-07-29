class Dashboard {
    create() {
        const dashboard = document.getElementById('dashboard');
        if (dashboard === null) { return; }
        for(let i = 0; i < 9; i++) {
            const block = document.createElement('div');
            block.classList.add('dashboard-block');
            block.textContent = i;
            dashboard.appendChild(block);
        }
    }
}

window.dashboard = new Dashboard();
window.dashboard.create();
