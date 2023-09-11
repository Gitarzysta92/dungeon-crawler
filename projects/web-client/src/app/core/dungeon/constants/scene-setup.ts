import { RepeatWrapping, Vector2, Vector3 } from "three";
import { ISceneComposerSetup } from "@3d-scene/index";


export const sceneSetup: ISceneComposerSetup & any = {
  terrain: {
    color: 0xa07966,
    mapTexture: {
      url: "assets/images/Vol_39_2_Base_Color.png",
      wrap: RepeatWrapping as any,
      repeat: new Vector2(2, 2),
      offset: new Vector2(3, 3),
    },
    normalMapTexture: {
      url: "assets/images/Vol_39_2_Normal.png",
      wrap: RepeatWrapping as any,
      repeat: new Vector2(2, 2),
      offset: new Vector2(3, 3),
    }, 
    displacementMapTexture: {
      url: "assets/images/Vol_39_2_Height.png",
      wrap: RepeatWrapping as any,
      repeat: new Vector2(2, 2),
      offset: new Vector2(3, 3),
    },
    axisYOffset: 0
  },
  board: {
    type: "hexagonal-game-board",
    coords: new Vector3(0, 0, 0),
    apperance: {
      primaryColor: 0x000,
      secondaryColor: 0x000
    },
    fields: [
      {
        auxCoords: "1",
        auxId: "1",
        coords: new Vector3(2, 3, 0),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "2",
        auxId: "2",
        coords: new Vector3(4, 3, 0),
        disabled: true,
        highlighted: {
          color: 0x0578fa
        }
      }, {
        auxCoords: "3",
        auxId: "3",
        coords: new Vector3(6, 3, 0),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "4",
        auxId: "4",
        coords: new Vector3(1, 3, 1),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "5",
        auxId: "5",
        coords: new Vector3(3, 3, 1),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "6",
        auxId: "6",
        coords: new Vector3(5, 3, 1),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "7",
        auxId: "7",
        coords: new Vector3(7, 3, 1),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "8",
        auxId: "8",
        coords: new Vector3(0, 3, 2),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "9",
        auxId: "9",
        coords: new Vector3(2, 3, 2),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "10",
        auxId: "10",
        coords: new Vector3(4, 3, 2),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "11",
        auxId: "11",
        coords: new Vector3(6, 3, 2),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "12",
        auxId: "12",
        coords: new Vector3(8, 3, 2),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "13",
        auxId: "13",
        coords: new Vector3(1, 3, 3),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "14",
        auxId: "14",
        coords: new Vector3(3, 3, 3),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "15",
        auxId: "15",
        coords: new Vector3(5, 3, 3),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "16",
        auxId: "16",
        coords: new Vector3(7, 3, 3),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "17",
        auxId: "17",
        coords: new Vector3(2, 3, 4),
        disabled: true,
        highlighted: {
          color: 0
        }
      }, {
        auxCoords: "18",
        auxId: "18",
        coords: new Vector3(4, 3, 4),
        disabled: true,
        highlighted: {
          color: 0x0578fa
        }
      }, {
        auxCoords: "19",
        auxId: "19",
        coords: new Vector3(6, 3, 4),
        disabled: true,
        highlighted: {
          color: 0x0578fa
        }
      }
    ]
  },
  lights: [
    {
      type: "directional-light",
      params: {
        color: 0xff7404,
        intensity: 3.8,
        shadow: { near: 10, far: 200, left: -30, right: 30, top: 35, bottom: -30 },
        radius: 10,
        castShadow: true,
        position: new Vector3(-100, 30, 10)
      } 
    },
    {
      type: "directional-light",
      params: {
        color: 0xfbdaa0,
        intensity: 3.2, 
        shadow: { near: 10, far: 1300, left: -530, right: 530, top: 535, bottom: -530 },
        radius: 10,
        castShadow: true,
        position: new Vector3(-500, 500, -500)
      } 
    },
    {
      type: "ambient-light",
      params: { color: 0xfbdaa0 }
    },
    {
      type: "hemisphere-light",
      params: { skyColor: 0xB1E1FF, groundColor: 0xa07966, intensity: 1}
    }
  ],
  objects: [
    {
      type: "nuclear-rods",
      coords: new Vector3(0, 0, 0),
      rods: [
        { 
          coords: new Vector3(20, 4.5, 20),
          rotation: new Vector3(0, 0, -13),
          color: 0xa07966
        },
        {
          coords: new Vector3(25, 4.5, 25),
          rotation: new Vector3(0, 0, 14),
          color: 0xa07966
        }
      ],
      lights: [
        { 
          color: 0x0e5def,
          intensity: 30,
          distance: 10,
          decay: 1,
          radius: 1,
          castShadow: false,
          position: new Vector3(20, 5, 20)
        },
        {
          color: 0x0e5def,
          intensity: 90,
          distance: 1000,
          decay: 0.5,
          radius: 4,
          castShadow: true,
          position: new Vector3(21, 10, 21)
        }
      ]
    },
    {
      type: "particles-area",
      coords: new Vector3(23, 10, 22),
    },
    {
      type: "global-particles",
      mapTexture: { url: "assets/images/particle.dcae8b12.webp" }
    }, 
    {
      type: "dust-particles-pointer-effect",
      mapTexture: { url: "assets/images/smoke.png" },
      coords: new Vector3(0,10,0)
    },
    // {
    //   auxId: "0",
    //   type: "tile-on-field",
    //   auxFieldId: "0",
    //   mapTexture: { url: "assets/images/hegemony_ganger.png" },
    //   color: 0x0002,
    //   rotation: 'top'
    // },
    // {
    //   auxId: "1",
    //   type: "tile-on-field",
    //   auxFieldId: "1",
    //   mapTexture: { url: "assets/images/hegemony_ganger.png" },
    //   color: 0x0002,
    //   rotation: 'topLeft'
    // },
    // {
    //   auxId: "2",
    //   type: "tile-on-field",
    //   auxFieldId: "2",
    //   mapTexture: { url: "assets/images/hegemony_ganger.png" },
    //   color: 0x0002,
    //   rotation: 'topRight'
    // },
    // {
    //   auxId: "3",
    //   type: "tile-on-field",
    //   auxFieldId: "3",
    //   mapTexture: { url: "assets/images/hegemony_ganger.png" },
    //   color: 0x0002,
    //   rotation: 'bottomLeft'
    // },
    // {
    //   auxId: "4",
    //   type: "tile-on-field",
    //   auxFieldId: "4",
    //   mapTexture: { url: "assets/images/hegemony_ganger.png" },
    //   color: 0x0002,
    //   rotation: 'bottomLeft'
    // },
    // {
    //   auxId: "5",
    //   type: "tile-in-dialog",
    //   mapTexture: { url: "assets/images/art1.png" },
    //   color: 0x0002
    // } as TileDeclaration,
    // {
    //   auxId: "6",
    //   type: "tile-in-staging",
    //   mapTexture: { url: "assets/images/art1.png" },
    //   color: 0x0002,
    // } as TileDeclaration
    // {
    //   auxId: "4",
    //   type: "targeting-arrow",
    //   color: 0x0578fa ,
    //   fromFieldAuxId: "6",
    //   toFieldAuxId: "16"
    // },
    // {
    //   auxId: "5",
    //   type: "targeting-arrow",
    //   color: 0x0578fa,
    //   fromFieldAuxId: "2",
    //   toFieldAuxId: "1"
    // },
    // {
    //   auxId: "5",
    //   type: "targeting-arrow",
    //   color: 0x0578fa,
    //   fromFieldAuxId: "2",
    //   toFieldAuxId: "6"
    // },
  ],
}

export const tileGraphicalData = {
  "id": "1",
  "type": "Unit",
  "name": "Runner",
  "colors": {
    "primary": "#edb316",
    "secondary": "#ff7404",
    "tertiary": "#ab4a03"
  },
  "artwork": {
    "type": 1,
    "name": "hegemony_runner"
  },
  "slots": [
    {
      "slot": "te0",
      "symbol": 0,
      "modifier": 1
    },
    {
      "slot": "tc0",
      "symbol": 17,
      "modifier": 2
    },
    {
      "slot": "tc5",
      "symbol": 8,
      "modifier": 1
    }
  ]
}