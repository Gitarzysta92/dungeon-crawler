
import { ICONS } from 'src/app/shared/icons/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType } from '../../../aspects/notifications/api';


export const MY_PROFILE_NOTIFICATIONS = {
  updateSuceed: {
    type: NotificationType.Success,
    icon: ICONS.success,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  },
  updateFailed: {
    type: NotificationType.Warning,
    icon: ICONS.warning,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`
  },
};

export type MyProfileNotifications = typeof MY_PROFILE_NOTIFICATIONS;
export const MyProfileNotificationsToken = new InjectionToken<MyProfileNotifications>('army-notifications');
  