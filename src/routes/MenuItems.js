const MenuItems = [
    {
        name: 'menusidebar.label.administration.administration',
        icon: 'far fa-folder',
        children: [
            {
                name: 'menusidebar.label.administration.dashboard',
                path: '/admin/dashboard',
                icon: 'fas fa-tachometer-alt'
            },
            {
                name: 'menusidebar.label.administration.students',
                path: '/admin/students',
                icon: 'fas fa-child'
            },
            {
                name: 'menusidebar.label.administration.staff',
                path: '/admin/staff',
                icon: 'fas fa-id-badge'
            },
            {
                name: 'menusidebar.label.administration.rooms',
                path: '/admin/rooms',
                icon: 'fas fa-tv'
            },
            {
                name: 'menusidebar.label.administration.carlines',
                path: '/admin/carlines',
                icon: 'fas fa-car'
            },
            {
                name: 'menusidebar.label.administration.barcodes',
                path: '/admin/barcodes',
                icon: 'fas fa-barcode'
            },
            // {
            //     name: 'menusidebar.label.administration.reports',
            //     path: '/admin/reports',
            //     icon: 'fas fa-file-invoice'
            // },
            // {
            //     name: 'menusidebar.label.blank',
            //     path: '/sub-menu-2',
            //     icon: 'fas fa-ghost'
            // }
        ]
    },
    {
        name: 'menusidebar.label.dispatch.dispatch',
        icon: 'fas fa-barcode',
        children: [
            {
                name: 'menusidebar.label.dispatch.dispatch',
                path: '/dispatch/home',
                icon: 'fas fa-barcode'
            }
        ]
    },
    {
        name: 'menusidebar.label.rooms.rooms',
        icon: 'fas fa-tv',
        children: [
            {
                name: 'menusidebar.label.dispatch.dispatch',
                path: '/dispatch/home',
                icon: 'fas fa-barcode'
            }
        ]
    }
];

export default MenuItems;
