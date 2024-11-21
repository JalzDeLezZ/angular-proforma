export const DBT_CATEGORY: Array<I_CATEGORY> = [
  { cat_id: 1, cat_name: 'Benyamin' },
  { cat_id: 2, cat_name: 'Jemima' },
  { cat_id: 3, cat_name: 'Jedd' },
  { cat_id: 4, cat_name: 'Livvy' },
];

export interface I_CATEGORY {
  cat_id: number;
  cat_name: string;
}

export const DBT_SUB_CATEGORY: Array<I_SUB_CATEGORY> = [
  {
    scat_id: 1,
    scat_name: 'Washingtong',
    cat_id: 1,
  },
  {
    scat_id: 2,
    scat_name: 'Trump',
    cat_id: 1,
  },
  {
    scat_id: 3,
    scat_name: 'Omalley',
    cat_id: 2,
  },
  {
    scat_id: 4,
    scat_name: 'Vegas',
    cat_id: 3,
  },
  {
    scat_id: 5,
    scat_name: 'New York',
    cat_id: 3,
  },
  {
    scat_id: 6,
    scat_name: 'LA',
    cat_id: 3,
  },
  {
    scat_id: 7,
    scat_name: 'Chicago',
    cat_id: 4,
  },
];

export interface I_SUB_CATEGORY {
  scat_id: number;
  scat_name: string;
  cat_id: number;
}