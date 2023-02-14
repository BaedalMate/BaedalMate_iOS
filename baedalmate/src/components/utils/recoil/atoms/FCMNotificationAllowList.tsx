import {atom} from 'recoil';

export const NotificationAllAllowState = atom({
  key: 'notificationAllAllowState',
  default: false,
});

export const NotificationChatAllowState = atom({
  key: 'notificationChatAllowState',
  default: false,
});

export const NotificationNoticeAllowState = atom({
  key: 'notificationNoticeAllowState',
  default: false,
});

export const NotificationRecruitAllowState = atom({
  key: 'notificationRecruitAllowState',
  default: false,
});
