import {atom} from 'recoil';

// export const FCMTokenState = atom({
//   key: 'FCMTokenState',
//   default: '',
// });
export const NotificationAllAllowState = atom({
  key: 'notificationAllAllowState',
  default: true,
});

export const NotificationChatAllowState = atom({
  key: 'notificationChatAllowState',
  default: true,
});

export const NotificationNoticeAllowState = atom({
  key: 'notificationNoticeAllowState',
  default: true,
});

export const NotificationRecruitAllowState = atom({
  key: 'notificationRecruitAllowState',
  default: true,
});
