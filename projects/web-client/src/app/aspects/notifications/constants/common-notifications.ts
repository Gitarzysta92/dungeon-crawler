import { InjectionToken } from "@angular/core";

import { ICONS } from "../../../shared/icons/constants/icons";
import { NotificationType } from "./notification-type.enum";


export const COMMON_NOTIFICATIONS = {
  warning: {
    type: NotificationType.Warning,
    icon: ICONS.warning,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`,
  },
  httpError: {
    type: NotificationType.Error,
    icon: ICONS.error,
    title: 'Some example title',
    content: `<strong>Problem:</strong> Duis maximus nibh ut magna maximus, iaculis rhoncus sapien vehicula. Donec metus ante, cursus eu aliquam ac.`,
  },
};

export type CommonNotifications = typeof COMMON_NOTIFICATIONS;
export const CommonNotificationsToken = new InjectionToken<CommonNotifications>('common-notifications');
  