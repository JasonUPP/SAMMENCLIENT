export const navigation = [
  {
    text: 'Home',
    path: '/home',
    icon: 'home'
  },
  {
    text: 'Operativo',    
    icon: 'folder',
    items: [
      {
        text: 'Herramienta',
        path: 'Operativo/Herramienta'
      },
      {
        text: 'Medida Herramienta',
        path: 'Operativo/MedidaHerramienta'
      },
      {
        text: 'Historial Herramienta',
        path: 'Operativo/HistorialHerramienta'
      }
    ]
  },
  {
    text: 'Examples',
    icon: 'folder',
    items: [
      {
        text: 'Profile',
        path: '/profile'
      },
      {
        text: 'Tasks',
        path: '/tasks'
      }
    ]
  },

];
