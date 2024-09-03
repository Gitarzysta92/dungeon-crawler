import { trigger, transition, style, animate, animateChild, query, stagger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ADD_CARD_ACTION, IAddCardActionPayload } from '@game-logic/lib/modules/cards/aspects/actions/add-card.action';
import { IRewarder } from '@game-logic/lib/modules/rewards/entities/rewarder/rewarder.interface';
import { IRewardable } from '@game-logic/lib/modules/rewards/rewards.interface';
import { DataFeedService } from 'src/app/core/game-data/services/data-feed.service';
import { CommandService } from '../../services/command.service';
import { IAuxiliaryView, IAuxiliaryViewComponent } from 'src/app/core/game-ui/interfaces/auxiliary-view.interface';
import { ComponentType } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Component({
  selector: 'reward-view',
  templateUrl: './reward-view.component.html',
  styleUrls: ['./reward-view.component.scss'],
  animations: [
    // trigger('cardEnter', [
    //   transition(':enter', [
    //     style({ transform: "scale(0.1) rotateY(0)" }),
    //     animate('400ms ease-in-out', style({ transform: "scale(1) rotateY(360deg)" }))
    //   ]),
    // ]),
    trigger('opened', [
      transition('* => *', [
        query('.isCard:enter', [
          style({ transform: "scale(0.1) rotateY(0)", opacity: 0 }),
          stagger(100, [animate('400ms ease-in-out', style({ transform: "scale(1) rotateY(360deg)", opacity: 1 }))])
        ], { optional: true }),
        query('.isCard:leave', [
          style({ transform: "scale(1)", opacity: 1 }),
          stagger(100, [animate('200ms ease-in-out', style({ transform: "scale(0)", opacity: 0 }))])
        ], { optional: true })
      ]),
    ])
  ]
})
export class RewardViewComponent implements OnInit, IAuxiliaryViewComponent {


  onClose$: Subject<void> = new Subject();

  public rewards: any[] = [];

  @Input() rewarder: IRewarder;
  @Input() rewardable: IRewardable

  constructor(
    private readonly _dataFeedService: DataFeedService,
    private readonly _commandsService: CommandService
  ) { }




  async ngOnInit(): Promise<void> {

    const rewards = []
    for (let reward of this.rewarder.rewards) {
      if (reward.delegateId === ADD_CARD_ACTION) {
        const payload = (reward.payload as IAddCardActionPayload)
        const card = await this._dataFeedService.getCard(payload.cardId);
        if (!card) {
          throw new Error(`Cannot get card data of id ${payload.cardId}`)
        }

        for (let i = 0; i < 10; i++) {}
        rewards.push({ isCardReward: true, card })
      }
    }
    this.rewards = rewards;
  }


  public claimReward() {
    this.rewards.length = 0;
    setTimeout(() => {
      this.onClose$.next();
    }, 400)

  }

}
