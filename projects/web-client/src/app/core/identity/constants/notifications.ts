import { ICONS } from 'src/app/shared/icons/constants/icons';
import { InjectionToken } from '@angular/core';
import { NotificationType, Notification } from '../../../aspects/notifications/api';


export const IDENTITY_NOTIFICATIONS = {
  error: new Notification({
    type: NotificationType.Error,
    icon: ICONS.warning,
    content: `<strong>Problem:</strong> Oops! Something went wrong. Please try again later or contact our support team for assistance."`
  }),
  loginSuccess: new Notification({
    type: NotificationType.Success,
    icon: ICONS.success,
    content: `<strong>Success:</strong> Success! You have been logged in to your account.`
  }),
  registrationSuccess: new Notification({
    type: NotificationType.Success,
    icon: ICONS.success,
    content: `<strong>Success:</strong> Thank you for registering! You will receive a confirmation email shortly.`
  }),
  badCredentials: new Notification({
    type: NotificationType.Error,
    icon: ICONS.login,
    content: `<strong>Problem:</strong> Sorry, we couldn't log you in. Please check your login credentials and try again.`
  })
};

export type IdentityNotifications = typeof IDENTITY_NOTIFICATIONS;
export const IdentityNotificationsToken = new InjectionToken<IdentityNotifications>('identity-notifications');
  