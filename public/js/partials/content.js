class Content {
    collapse() {
        const content = document.getElementById('content');

        if (content.classList.contains('content-collapse')) {
            content.classList.remove('content-collapse');
        } else {
            content.classList.add('content-collapse');
        }
    }
}

window.content = new Content();
