class Profile {
    create() {
        const profile = document.getElementById('profile');
        if (profile === null) { return; }
        for(let i = 0; i < 4; i++) {
            const block = document.createElement('div');
            block.classList.add('profile-block');
            block.textContent = i;
            switch(i) {
                case 0:
                    block.classList.add('profile-block-big-horiz');
                    break;
                case 1:
                    block.classList.add('profile-block-big-vert');
                    break;
                case 2:
                    block.classList.add('profile-block-big-vert');
                    break;
                case 3:
                    block.classList.add('profile-block-big-horiz');
                    break;
            }
            profile.appendChild(block);
        }
    }
}

window.profile = new Profile();
window.profile.create();
