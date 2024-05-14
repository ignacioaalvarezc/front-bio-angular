export const notifications = [
    {
        icon: 'cloud_download',
        subject: 'Pedidos pendientes',
        description: '# pedidos no han sido completados'
    },
    {
        icon: 'cloud_upload',
        subject: 'Pedidos completos',
        description: 'Cargando el recurso...'
    },
    {
        icon: 'delete',
        subject: 'Todos los pedidos',
        description: 'Archivos basura'
    }
]

export const userItems = [
    {
        icon: 'person',
        routerLink: 'profile',
        label: 'Perfil'
    },
    {
        icon: 'person',
        label: 'Cerrar sesión',
        action: 'logout'
    },
]