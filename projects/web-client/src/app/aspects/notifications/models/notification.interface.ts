import { NotificationType } from "../constants/notification-type.enum";

export interface INotification {
  id: string;
  type: NotificationType;
  icon: string;
  title: string;
  content: string;
  readed: boolean;
  createdAt: Date;
  apperance: string;
}