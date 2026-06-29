export const itemDisplayColorClasses = `
    border
    bg-sand-100
    hover:bg-sand-200
    border-sand-300
    dark:bg-sand-900
    dark:hover:bg-sand-400
    dark:border-sand-800
`;

export const keyboardNavigationClasses = `
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
    focus-visible:ring-offset-blue-100
    focus-visible:ring-blue-200
    dark:focus-visible:ring-offset-blue-900
    dark:focus-visible:ring-blue-800
`;

export const itemDisplayListClasses = {
  box: 'rounded-lg p-2 flex gap-3',
  container: 'grid grid-cols-1 gap-3 mb-3',
};

export const itemDisplayBlockClasses = {
  box: 'rounded-lg p-2 flex gap-3',
  container: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-3',
};

export const itemDisplayIcon = {
  general: `
    rounded-lg
    w-11
    h-11
    flex
    items-center
    justify-center
    text-white
    `,
  status: {
    0: `
      bg-sand-red
      dark:bg-sand-red-dark
      text-text-on-yellow-light
      dark:text-text-on-yellow-dark
    `,
    1: `
      bg-sand-yellow
      dark:bg-sand-yellow-dark
      text-text-on-red-light
      dark:text-text-on-red-dark
    `,
    2: `
      bg-sand-350
      dark:bg-sand-950
    `,
  } as Record<number, string>,
} as const;

export const itemDisplayCounter = `
    bg-sand-250
    dark:bg-sand-950
    border-sand-300
    dark:border-sand-800
    rounded-xl
    w-6 h-5 
    flex 
    justify-center 
    items-center
    text-sm
`;

export const itemIconEnum = Object.freeze({
  milk: 'milk',
  droplet: 'droplet',
  croissant: 'croissant',
  snowflake: 'snowflake',
  refrigerator: 'refrigerator',
} as const);

export type itemIcon = (typeof itemIconEnum)[keyof typeof itemIconEnum];
