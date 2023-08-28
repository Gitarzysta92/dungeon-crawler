
export class LobbyItem {
  public type: 'gameMode' | 'news';
  public size: '2' | '4' | '6' | '12';
  public config: Object;
  constructor(data: Partial<LobbyItem>) {
    this.type = data.type;
    this.size = data.size;
    this.config = data.config;
  }
}