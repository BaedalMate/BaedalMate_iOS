import {atom} from 'recoil';
import {DEFAULT_PROFILE_IMG} from 'themes/theme';

export const userNicknameState = atom({
  key: 'userNicknameState',
  default: '',
  dangerouslyAllowMutability: true,
});

export const userDormitoryState = atom({
  key: 'userDormitoryState',
  default: '',
  dangerouslyAllowMutability: true,
});

export const userProfileImageState = atom({
  key: 'userProfileImageState',
  default: DEFAULT_PROFILE_IMG,
  dangerouslyAllowMutability: true,
});

export const userIdState = atom({
  key: 'userIdState',
  default: '',
  dangerouslyAllowMutability: true,
});

export const userScoreState = atom({
  key: 'userScoreState',
  default: 0,
  dangerouslyAllowMutability: true,
});
