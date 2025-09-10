export const BASE_USER_MENU = [
  {
    label: 'Library',
    to: '/library',
  },
];

export const ADMIN_MENU = [
  ...BASE_USER_MENU,

  {
    label: 'Category',
    to: '/libray/categories',
  },
  {
    label: 'Manage users',
    to: '/users',
  },
];

export const MENU = { ADMIN: ADMIN_MENU, USER: BASE_USER_MENU };
