class Customers {
    constructor() {
        this.tbody = document.getElementById('customers-tbody');
        this.theadItems = [];
        this.tbodyItems = [];
        this.currentPage = null;
        this.itemsPerPage = null;
        this.showPages = null;
        this.states = {}
        this.state = null;
    }

    async init() {
        const data = await this.loadData();

        this.theadItems = data.theadItems;
        this.tbodyItems = data.tbodyItems;
        this.currentPage = data.currentPage;
        this.itemsPerPage = data.itemsPerPage;
        this.showPages = data.showPages;
        this.states = data.states;
        this.state = data.state;

        this.update(this.state);
    }

    async loadData() {
        try {
            const response = await fetch('/json/customers.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error loading or parsing JSON data:', error);
        }
    }

    isPresent() {
        const customers = document.getElementById('customers');
        return !!customers;
    }

    update(state = null) {
        if (!this.isPresent()) return;
        this.updateTableHead();
        this.updateTableBody(state);
        this.updateFooterHint();
        this.updateFooterControls();
    }

    search() {
        this.update(this.state);
    }

    filterBySearch(array) {
        let bySearch = [];
        const input = document.getElementById('customers-search-input');
        const filter = input.value.toLowerCase();
        if (!filter) { return array; }
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array[i].length - 1; j++) {
                let text = array[i][j].toLowerCase();
                if (text.toLowerCase().includes(filter)) {
                    bySearch.push(array[i]);
                    break;
                }
            }
        }

        return bySearch;
    }

    updateFooterControls() {
        const state = this.state;
        const byState = this.filterByState(state);
        const bySearch = this.filterBySearch(byState);
        const totalPages = Math.ceil(bySearch.length / this.itemsPerPage);

        this.clearPageButtons();

        if (!totalPages) { return; }

        this.updateNavigationButton('<', this.currentPage === 1, () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.update(state);
            }
        });

        const startPage = Math.max(1, Math.min(this.currentPage - Math.floor(this.showPages / 2), totalPages - this.showPages + 1));
        const endPage = Math.min(totalPages, startPage + this.showPages - 1);

        if (startPage > this.showPages / 2) {
            this.updatePageButton(1);
            this.createPageLabel();
        }

        for (let i = startPage; i <= endPage; i++) {
            this.updatePageButton(i);
        }

        if (endPage < totalPages - 1) {
            this.createPageLabel();
            this.updatePageButton(totalPages);
        }

        this.updateNavigationButton('>', this.currentPage === totalPages, () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.update(state);
            }
        });
    }

    updateNavigationButton(text, disabled, onClick) {
        const controls = document.getElementById('customers-footer-controls');

        const li = document.createElement('li');
        li.classList.add('customers-footer-li');

        const button = document.createElement('button');
        button.classList.add('customers-footer-button');
        button.textContent = text;
        button.disabled = disabled;
        button.onclick = onClick;

        li.appendChild(button);
        controls.appendChild(li);
    }

    updatePageButton(number) {
        const state = this.state;
        const controls = document.getElementById('customers-footer-controls');

        const li = document.createElement('li');
        li.classList.add('customers-footer-li');

        const button = document.createElement('button');
        button.classList.add('customers-footer-button');
        button.textContent = number;
        if (number === this.currentPage) {
            button.classList.add('customers-footer-active');
        }
        button.disabled = number === this.currentPage;
        button.onclick = () => {
            this.currentPage = number;
            this.update(state);
        }
        li.appendChild(button);
        controls.appendChild(li);
    }

    clearPageButtons() {
        const controls = document.getElementById('customers-footer-controls');
        controls.replaceChildren();
    }

    createPageLabel() {
        const controls = document.getElementById('customers-footer-controls');

        const li = document.createElement('li');
        li.classList.add('customers-footer-li');
        li.textContent = '...';
        controls.appendChild(li);
    }

    paginate(items) {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return items.slice(startIndex, endIndex);
    }

    updateTableHead() {
        const thead = document.getElementById('customers-thead');
        thead.replaceChildren();

        const tr = document.createElement('tr');
        tr.classList.add('customers-tr');

        this.theadItems.forEach(item => {
            const th = document.createElement('th');
            th.classList.add('customers-th');
            th.textContent = item;

            tr.appendChild(th);
        });

        thead.appendChild(tr);
    }

    updateTableBody(state = null) {
        state = state ? state : this.toggleFilter(this.state);
        this.state = state;

        const button = document.getElementById('customers-info-button');
        button.textContent = state;

        this.tbody.replaceChildren();

        const byState = this.filterByState(state);
        const bySearch = this.filterBySearch(byState);
        const paginatedItems = this.paginate(bySearch);

        this.createBodyItems(paginatedItems);
    }

    updateFooterHint() {
        const byState = this.filterByState(this.state);
        const bySearch = this.filterBySearch(byState);
        const totalEntries = bySearch.length;

        const startEntry = (this.currentPage - 1) * this.itemsPerPage + 1;
        const endEntry = Math.min(this.currentPage * this.itemsPerPage, totalEntries);

        const hint = document.getElementById('customers-footer-hint');
        if (!totalEntries) {
            hint.textContent = 'No data';
        } else {
            hint.textContent = 'Showing data ' + startEntry + ' to ' + endEntry + ' of ' + totalEntries + ' entries';
        }
    }

    filterByState(state) {
        return this.tbodyItems.filter(this.determineState(state));
    }

    toggleFilter(state) {
        this.currentPage = 1;
        switch (state) {
            case this.states.all: return this.states.active;
            case this.states.active: return this.states.inactive;
            case this.states.inactive: return this.states.all;
            default: return this.states.all;
        }
    }

    determineState(state) {
        switch (state) {
            case this.states.all: return () => true;
            case this.states.active: return item => item[5];
            case this.states.inactive: return item => !item[5];
            default: return () => true;
        }
    }

    createBodyItems(items) {
        items.forEach(item => {
            const tr = document.createElement('tr');
            tr.classList.add('customers-tr');

            item.forEach((cell, index) => {
                const td = document.createElement('td');
                td.classList.add('customers-td');

                if (index === item.length - 1) {
                    const button = document.createElement('button');
                    button.classList.add('customers-table-button');
                    button.classList.add(cell ? 'customers-table-active-btn' : 'customers-table-inactive-btn');
                    button.textContent = cell ? 'Active' : 'Inactive';
                    button.onclick = () => this.updateTableBody(cell ? this.states.active : this.states.inactive);
                    td.appendChild(button);
                } else {
                    td.textContent = cell;
                }

                tr.appendChild(td);
            });

            this.tbody.appendChild(tr);
        });
    }
}

window.customers = new Customers();
window.customers.init();
