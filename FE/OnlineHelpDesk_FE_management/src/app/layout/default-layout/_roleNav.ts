import { style } from '@angular/animations';
import { INavData } from '@coreui/angular';


export function get_roleNav(role_id: number): INavData[] {

  const _roleNav = [
    [],

    // Campus Manager (role_id = 1)
    [
      {
        name: 'Accounts',
        url: '/accounts_campus',
        class: 'bg-dark my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-group' },
        children: [
          {
            name: 'Staffs',
            url: '/accounts_campus/staffs',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6',
          },
          {
            name: 'Students',
            url: '/accounts_campus/students',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6',

          },
        ]
      },
      {
        name: 'Campus Facilities',
        url: '/facility_campus',
        class: ' my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-factory', class: 'fw-bold fs-1 text-danger' },
        children: [
          {
            name: 'Facility List',
            url: '/facility_campus/facilities',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Facility Items',
            url: '/facility_campus/facility_items',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          }
        ]
      },
      {
        name: 'Campus Majors',
        url: '/majors_campus',
        class: ' my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-double-quote-sans-right' },
        children: [
          {
            name: 'Major List',
            url: '/majors_campus/majors',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Task Assignments',
            url: '/majors_campus/task_assignments',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Feedbacks',
            url: '/majors_campus/feedbacks',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Reports',
            url: '/majors_campus/reports',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
        ]
      },
      {
        name: 'FAQ',
        url: '/faq_campus',
        class: ' my-2 bg-info rounded',
        iconComponent: { name: 'cil-puzzle' }
      },
    ],


    // Facility Major Head (role_id = 2)
    [
      {
        name: 'Accounts',
        url: '/account_major',
        class: ' my-2 border border-2 border-primary rounded',
        iconComponent: { name: 'cil-group' },
        children: [
          {
            name: 'Staffs',
            url: '/account_major/staffs',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Requesters',
            url: '/account_major/requesters',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
        ]
      },
      {
        name: 'My Majors',
        url: '/my_majors',
        class: ' my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-double-quote-sans-right' },
        children: [
          {
            name: 'Main Major List',
            url: '/my_majors/majors',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Services',
            url: '/my_majors/services',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Feedbacks',
            url: '/my_majors/feedbacks',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Reports',
            url: '/my_majors/reports',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
        ]
      },
      {
        name: 'My Tasks',
        url: '/task_major',
        class: ' my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-task' },
        children: [
          {
            name: 'Service Requests',
            url: '/task_major/service_requests',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'Task Assignments',
            url: '/task_major/task_assignments',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'BlackList Requests',
            url: '/task_major/blacklist_requests',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          }
        ]
      }
    ],

    // Assignee (role_id = 3)
    [
      {
        name: 'My Tasks Management',
        url: '/task_assignee',
        class: ' my-2 border border-2 border-primary p-2',
        iconComponent: { name: 'cil-puzzle' },
        children: [
          {
            name: 'Service Requests',
            url: '/task_assignee/service_requests',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          },
          {
            name: 'BlackList Requests',
            url: '/task_assignee/blacklist_requests',
            icon: 'cil-arrow-circle-right w-25 text-success fs-6'
          }
        ]
      }
    ]






  ]
  const roleNav = role_id ? _roleNav[role_id] : _roleNav[0];
  return roleNav;
}
