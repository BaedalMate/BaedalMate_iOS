import {atom} from 'recoil';

export const recruitListCategoryIdxState = atom({
  key: 'recruitListCategoryIdx',
  default: 0,
});
export const recruitListState = atom({
  key: 'recruitListState',
  default: [],
});
export const totalRecruitListState = atom({
  key: 'totalRecruitListState',
  default: [],
});
export const selectedSortState = atom({
  key: 'selectedSortState',
  default: 'createDate',
});

export const searchRecruitListState = atom({
  key: 'searchRecruitListState',
  default: [],
});
