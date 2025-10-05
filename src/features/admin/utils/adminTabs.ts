export const AdminTabs = {
    PROFILE: 'profile',
    PASSWORD: 'password',
    PRODUCTS: 'products',
    CATEGORIES: 'categories'
}

export type AdminTabs = typeof AdminTabs[keyof typeof AdminTabs]