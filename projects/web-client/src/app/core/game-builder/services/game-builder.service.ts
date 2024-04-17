// import { Injectable } from '@angular/core';
// import { DataFeedService } from '../../data/services/data-feed.service';
// import { v4 } from 'uuid';
// import { IGameSettings } from '../../commons/interfaces/game-settings.interface';

// @Injectable()
// export class GameBuilderService {

//   constructor(
//     private readonly _dataFeedService: DataFeedService,
//   ) { }

//   public async createGame(
//   ): Promise<any & IGameSettings> { 


//     return Object.assign({}, {
//       timestamp: new Date().getTime().toString(),
//       gameVersion: await this._dataFeedService.getVersion(),
//       heroName: name,
//       heroAvatar: avatar,
//       adventureStateId: v4()
//     })
//   }
// }
