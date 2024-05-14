import { INavbarData } from "./inavbar";

export interface NavItem {
    label: string;
    icon: string;
    routeLink: string;
}

export const adminNavData: INavbarData[] = [
    {
        routeLink: 'admin',
        icon: 'bar_chart',
        label: 'Dashboard'
    },
    {
        label: 'Usuarios',
        icon: 'person',
        routeLink: 'admin/view-users',
         items: [
            {
                label: 'Usuarios',
                icon: 'person',
                routeLink: 'admin/view-users',
            },
            {
                label: 'Operadores',
                icon: 'assignment_ind',
                routeLink: 'admin/view-responsibles'
            },
        ]
    },
    {
        label: 'Recepción',
        icon: 'assignment_returned',
        routeLink: 'admin/view-reception-statistics'
    },    
    {
        label: 'Corte',
        icon: 'content_cut',
        routeLink: 'admin/view-cut-production',
        items: [
            {
                label: 'Tipos de corte',
                icon: 'content_cut',
                routeLink: 'admin/view-cut-types',
            }
        ]
    },  
    {
        routeLink: 'admin/view-sizings',
        icon: 'straighten',
        label: 'Dimensionado',
        items: [
            {
                routeLink: 'admin/view-strawTypes',
                icon: 'clear_all',
                label: 'Tipos de dimensionado'
            },
        ]
    },
    {
        routeLink: 'admin/view-sanitizeds',
        icon: 'water_drop',
        label: 'Sanitizado'
    },
    
            
    {
        routeLink: 'admin/view-boxTypes',
        icon: 'inbox',
        label: 'Empaquetado',
        items: [
            {
                routeLink: 'admin/view-boxTypes',
                icon: 'dashboard',
                label: 'Tipos de estuche'
            },
        ]
    },
    {
        routeLink: 'admin/view-orders',
        icon: 'receipt',
        label: 'Pedidos'
    },
    /*
    {
        icon: 'equalizer',
        label: 'Estadísticas'
    },
    */
]