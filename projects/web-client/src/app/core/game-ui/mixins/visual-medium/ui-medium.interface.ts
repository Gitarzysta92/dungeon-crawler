
export interface IUiMedium {
  uiData: IUiData,
  isUiMedium: true
}

export interface IUiData {
  icon: string;
  avatar: { url: string; };
}