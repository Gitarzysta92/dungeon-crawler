import { Component, OnInit } from '@angular/core';
import { SceneService } from 'src/app/core/scene/services/scene.service';

@Component({
  selector: 'dungeon-scene',
  templateUrl: './dungeon-scene.component.html',
  styleUrls: ['./dungeon-scene.component.scss']
})
export class DungeonSceneComponent implements OnInit {

  constructor(
    public readonly sceneService: SceneService,
  ) { }

  ngOnInit(): void {
  }

}
