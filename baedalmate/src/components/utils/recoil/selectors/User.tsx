import {selector} from 'recoil';
import {
  userDormitoryState,
  userIdState,
  userNicknameState,
  userProfileImageState,
  userScoreState,
} from '../atoms/User';

export const getUserNicknameSelector = selector({
  key: 'getUserNicknameSelector',
  get: ({get}) => {
    const text = get(userNicknameState);
    return text;
  },
});

export const getUserDormitorySelector = selector({
  key: 'getUserDormitorySelector',
  get: ({get}) => {
    const text = get(userDormitoryState);
    return text;
  },
});

export const getUserProfileImageSelector = selector({
  key: 'getUserProfileImageSelector',
  get: ({get}) => {
    const text = get(userProfileImageState);
    return text;
  },
});

export const getUserIdSelector = selector({
  key: 'getUserIdSelector',
  get: ({get}) => {
    const text = get(userIdState);
    return text;
  },
});

export const getUserScoreSelector = selector({
  key: 'getUserScoreSelector',
  get: ({get}) => {
    const text = get(userScoreState);
    return text;
  },
});
