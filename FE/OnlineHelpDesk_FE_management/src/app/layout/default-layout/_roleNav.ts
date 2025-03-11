import { INavData } from '@coreui/angular';


export function get_roleNav (role_id : number) : INavData[] {

  const _roleNav = [
    [],
    [
      {
        name: 'View 0',
        url: '/nhap_view_0',
        iconComponent: { name: 'cil-speedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        }
      },
      {
        name: 'View 1',
        url: '/nhap_view_1',
        iconComponent: { name: 'cil-speedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        }
      }
    ],
    [
      {
        name: 'Table 1',
        url: '/table_1',
        iconComponent: { name: 'cil-speedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        }
      },
      {
        name: 'Dashboard',
        url: '/dashboard',
        iconComponent: { name: 'cil-speedometer' },
        badge: {
          color: 'info',
          text: 'NEW'
        }
      },
      {
        title: true,
        name: 'Theme'
      },
      {
        name: 'Colors',
        url: '/theme/colors',
        iconComponent: { name: 'cil-drop' }
      },
      {
        name: 'Typography',
        url: '/theme/typography',
        linkProps: { fragment: 'headings' },
        iconComponent: { name: 'cil-pencil' }
      },
      {
        name: 'Components',
        title: true
      },
    ],
    [
      {
        name: 'Base',
        url: '/base',
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Accordion',
            url: '/base/accordion',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Breadcrumbs',
            url: '/base/breadcrumbs',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Cards',
            url: '/base/cards',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Carousel',
            url: '/base/carousel',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Collapse',
            url: '/base/collapse',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'List Group',
            url: '/base/list-group',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Navs & Tabs',
            url: '/base/navs',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Pagination',
            url: '/base/pagination',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Placeholder',
            url: '/base/placeholder',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Popovers',
            url: '/base/popovers',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Progress',
            url: '/base/progress',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Spinners',
            url: '/base/spinners',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Tables',
            url: '/base/tables',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Tabs',
            url: '/base/tabs',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Tooltips',
            url: '/base/tooltips',
            icon: 'nav-icon-bullet'
          }
        ]
      },
      {
        name: 'Buttons',
        url: '/buttons',
        iconComponent: { name: 'cil-cursor' },
        children: [
          {
            name: 'Buttons',
            url: '/buttons/buttons',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Button groups',
            url: '/buttons/button-groups',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Dropdowns',
            url: '/buttons/dropdowns',
            icon: 'nav-icon-bullet'
          }
        ]
      },
      {
        name: 'Forms',
        url: '/forms',
        iconComponent: { name: 'cil-notes' },
        children: [
          {
            name: 'Form Control',
            url: '/forms/form-control',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Select',
            url: '/forms/select',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Checks & Radios',
            url: '/forms/checks-radios',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Range',
            url: '/forms/range',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Input Group',
            url: '/forms/input-group',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Floating Labels',
            url: '/forms/floating-labels',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Layout',
            url: '/forms/layout',
            icon: 'nav-icon-bullet'
          },
          {
            name: 'Validation',
            url: '/forms/validation',
            icon: 'nav-icon-bullet'
          }
        ]
      },
      {
        name: 'Charts',
        iconComponent: { name: 'cil-chart-pie' },
        url: '/charts'
      },
    ]
  
  ]
  const roleNav = role_id ? _roleNav[role_id] : _roleNav[0];
  return roleNav;
}

export function get_thiNav () : INavData[] {

  const _thiNav = [ 
    {
      name: 'Transactions',
      url: '/transactions',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    },
    {
      name: 'Profile',
      url: '/profile',
      iconComponent: { name: 'cil-speedometer' },
      badge: {
        color: 'info',
        text: 'NEW'
      }
    }
  ]
  return _thiNav
}