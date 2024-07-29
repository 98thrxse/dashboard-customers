class Sidebar {
    create() {
        const items = [
            { href: '/dashboard', icon: '/ico/key-square.svg', alt: 'key-square', title: 'Dashboard' },
            { href: '/product', icon: '/ico/3d-square.svg', alt: '3d-square', title: 'Product' },
            { href: '/customers', icon: '/ico/user-square.svg', alt: 'user-square', title: 'Customers' },
            { href: '/income', icon: '/ico/wallet-money.svg', alt: 'wallet-money', title: 'Income' },
            { href: '/promote', icon: '/ico/discount-shape.svg', alt: 'discount-shape', title: 'Promote' },
            { href: '/help', icon: '/ico/message-question.svg', alt: 'message-question', title: 'Help' },
        ];

        const body = document.getElementById('sidebar-body');

        for (let item of items) {
            const li = document.createElement('li');

            const a = document.createElement('a');
            a.classList.add('sidebar-body-item');
            a.href = item.href;
        
            if (window.location.pathname === item.href) {
              a.classList.add('sidebar-body-active');
            }

            const spanLeft = document.createElement('span');

            const icon = document.createElement('img');
            icon.classList.add('sidebar-body-icon');
            icon.src = item.icon;
            icon.alt = item.alt;
          
            const title = document.createElement('span');
            title.classList.add('sidebar-body-title');
            title.textContent = item.title;

            spanLeft.appendChild(icon);
            spanLeft.appendChild(title);
            a.appendChild(spanLeft);

            if (item.title !== 'Dashboard') {
                const spanRight = document.createElement('span');
            
                const chevron = document.createElement('img');
                chevron.classList.add('sidebar-body-arrow');
                chevron.src = '/ico/chevron-right.svg';
                chevron.alt = 'chevron-right';
            
                spanRight.appendChild(chevron);
                a.appendChild(spanRight);
            }

            li.appendChild(a);
            body.appendChild(li);
        }
    }

    collapse() {
        const sidebar = document.getElementById('sidebar');

        if (sidebar.classList.contains('sidebar-collapse')) {
            sidebar.classList.remove('sidebar-collapse');
        } else {
            sidebar.classList.add('sidebar-collapse');
        }
    }
}

window.sidebar = new Sidebar();
window.sidebar.create();
