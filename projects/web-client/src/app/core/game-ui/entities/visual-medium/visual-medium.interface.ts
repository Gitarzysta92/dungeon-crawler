
export interface IVisualMedium<U = IVisualUiData, S = null> {
  visual: {
    ui?: U;
    scene?: S
  }
  isVisualMedium: true
}

export interface IVisualUiData {
  icon: string;
  avatar: { url: string; };
}