export const exampleDungeonState = {
  "playersNumber": 2,
  "gameLayer": "Dungeon",
  "turn": 3,
  "round": 2,
  "isDungeonTurn": false,
  "isDungeonFinished": false,
  "dungeonId": "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
  "deck": {
    "playerType": "Computer",
    "actorType": 3,
    "id": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c",
    "revealedCardIds": [],
    "cardsToUtilize": [
      {
        "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
        "name": "spawnEnemy",
        "effect": {
          "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 3,
          "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "selectorType": "global",
          "effectTargetingSelector": {
            "targetingActors": [
              5
            ],
            "selectorTargets": "single"
          },
          "selectorOriginDeterminant": {
            "requireOutlets": false,
            "selectorType": "global",
            "isCaster": false
          },
          "minSpawnDistanceFromHero": 1,
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
        "name": "spawnEnemy",
        "effect": {
          "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 3,
          "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "selectorType": "global",
          "effectTargetingSelector": {
            "targetingActors": [
              5
            ],
            "selectorTargets": "single"
          },
          "selectorOriginDeterminant": {
            "requireOutlets": false,
            "selectorType": "global",
            "isCaster": false
          },
          "minSpawnDistanceFromHero": 1,
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
        "name": "spawnEnemy",
        "effect": {
          "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 3,
          "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "selectorType": "global",
          "effectTargetingSelector": {
            "targetingActors": [
              5
            ],
            "selectorTargets": "single"
          },
          "selectorOriginDeterminant": {
            "requireOutlets": false,
            "selectorType": "global",
            "isCaster": false
          },
          "minSpawnDistanceFromHero": 1,
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      }
    ],
    "utilizedCards": [
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false,
            "selectorOrigin": {}
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true,
          "selectorOrigin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          }
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false,
            "selectorOrigin": {}
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true,
          "selectorOrigin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          }
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false,
            "selectorOrigin": {}
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true,
          "selectorOrigin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          }
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      }
    ],
    "cardsInDeck": [
      {
        "id": "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
        "name": "noop",
        "effect": {
          "id": "8A754EC5-92B3-4F73-80C3-67BABE700B5B",
          "effectTargetingSelector": {},
          "effectName": 0,
          "effectLifeTime": 0,
          "effectResolveTime": 0
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      },
      {
        "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
        "name": "moveEnemy",
        "effect": {
          "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectResolveTime": 0,
          "effectLifeTime": 0,
          "effectName": 5,
          "preserveRotation": false,
          "selectorType": "global",
          "selectorRange": 2,
          "selectorOriginDeterminant": {
            "requireOutlets": true,
            "selectorType": "global",
            "isCaster": false
          },
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "interactionType": [
            1
          ],
          "utilizationCost": [],
          "requiredPayload": true
        },
        "entityType": 5,
        "informative": {
          "name": "string",
          "description": "string"
        }
      }
    ],
    "drawPerTurn": 3,
    "lastingEffects": [],
    "sourceActorId": "86FA22F6-5425-4FC6-BB41-657F53A73B1B"
  },
  "exitBonuses": [],
  "heroObjectId": "88deb9ce-415e-4507-8a6c-374abbc7433f",
  "heroInventory": {
    "items": [
      {
        "id": "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
        "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
        "name": "Sword",
        "interactionType": [
          0,
          3
        ],
        "requiredSlots": [
          {
            "slotType": "Weapon",
            "amount": 1
          }
        ],
        "itemType": 3,
        "effectLifeTime": 0,
        "effectResolveTime": 0,
        "effectName": 1,
        "damageValue": 10,
        "damageType": 0,
        "effectTargetingSelector": {
          "targetingActors": [
            2
          ],
          "selectorTargets": "single"
        },
        "selectorType": "line",
        "selectorRange": 1,
        "equipCost": [
          {
            "costValue": 1,
            "costType": "majorAction"
          }
        ],
        "sellBasePrice": 10,
        "buyBasePrice": 10,
        "purchaseCurrency": 0,
        "maxStackSize": 1,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 1,
        "slotIds": [
          "5A99BB51-B603-4975-AD1E-F2113668FBE2"
        ],
        "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
      },
      {
        "id": "F95D81C3-1A5C-43DF-B3D6-081D36397684",
        "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
        "name": "Axe",
        "interactionType": [
          0,
          3
        ],
        "requiredSlots": [
          {
            "slotType": "Weapon",
            "amount": 1
          }
        ],
        "itemType": 3,
        "effectLifeTime": 0,
        "effectResolveTime": 0,
        "effectName": 1,
        "damageValue": 10,
        "damageType": 0,
        "effectTargetingSelector": {
          "targetingActors": [
            2
          ],
          "selectorTargets": "single"
        },
        "selectorType": "line",
        "selectorRange": 1,
        "equipCost": [
          {
            "costValue": 1,
            "costType": "majorAction"
          }
        ],
        "sellBasePrice": 10,
        "buyBasePrice": 10,
        "purchaseCurrency": 0,
        "maxStackSize": 1,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 1,
        "slotIds": [
          "B921716D-9E2C-4C8C-A2F1-E39857D2634B"
        ],
        "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
      },
      {
        "id": "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
        "sourceItemId": "ECCD311F-0161-49D0-BA39-3C4968B42497",
        "name": "Staff",
        "itemType": 3,
        "interactionType": [
          3,
          0
        ],
        "requiredSlots": [
          {
            "slotType": "Weapon",
            "amount": 2
          }
        ],
        "effectLifeTime": 0,
        "effectResolveTime": 0,
        "effectName": 1,
        "effectTargetingSelector": {
          "targetingActors": [
            2
          ],
          "selectorTargets": "single"
        },
        "damageValue": 10,
        "damageType": 1,
        "selectorType": "line",
        "selectorRange": 1,
        "equipCost": [
          {
            "costValue": 1,
            "costType": "majorAction"
          }
        ],
        "sellBasePrice": 10,
        "buyBasePrice": 10,
        "purchaseCurrency": 0,
        "maxStackSize": 1,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 1,
        "slotIds": [],
        "itemId": "ECCD311F-0161-49D0-BA39-3C4968B42497"
      },
      {
        "id": "714DF949-8CE2-4216-A582-414CBF3277C8",
        "sourceItemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
        "name": "Boots",
        "itemType": 2,
        "interactionType": [
          0,
          3
        ],
        "requiredSlots": [
          {
            "slotType": "Feet",
            "amount": 1
          }
        ],
        "effectName": 4,
        "effectLifeTime": 1,
        "effectResolveTime": 0,
        "effectTargetingSelector": {
          "targetingActors": [
            0
          ],
          "selectorTargets": "single"
        },
        "statsModifications": [
          {
            "statName": "speed",
            "modiferValue": 1,
            "modifierType": "add"
          }
        ],
        "sellBasePrice": 10,
        "buyBasePrice": 10,
        "purchaseCurrency": 0,
        "equipCost": [
          {
            "costValue": 1,
            "costType": "majorAction"
          }
        ],
        "maxStackSize": 1,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 1,
        "slotIds": [
          "87D31830-2C04-4CE2-A4EC-BBA7274B8F54"
        ],
        "itemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5"
      },
      {
        "id": "D91C9974-391E-4F1B-B589-E3F7F684AF63",
        "sourceItemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
        "name": "Gold",
        "itemType": 7,
        "currencyType": 0,
        "maxStackSize": 9999,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 100,
        "slotIds": [
          "3BD7A769-1179-46A9-9989-7A27A07A630B"
        ],
        "itemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C"
      },
      {
        "id": "86DBE683-9130-4771-801E-DCA914C9DCFB",
        "sourceItemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
        "name": "Healing potion",
        "itemType": 5,
        "interactionType": [
          1,
          3
        ],
        "effectLifeTime": 0,
        "effectResolveTime": 0,
        "effectName": 4,
        "effectTargetingSelector": {
          "targetingActors": [
            0,
            1
          ],
          "selectorTargets": "single"
        },
        "statsModifications": [
          {
            "statName": "health",
            "modiferValue": 20,
            "modifierType": "add"
          }
        ],
        "selectorType": "line",
        "selectorRange": 1,
        "utilizationCost": [
          {
            "costValue": 20,
            "costType": "source"
          }
        ],
        "sellBasePrice": 10,
        "buyBasePrice": 10,
        "purchaseCurrency": 0,
        "maxStackSize": 20,
        "entityType": 6,
        "informative": {
          "name": "string",
          "description": "string"
        },
        "amountInStack": 10,
        "slotIds": [
          "EE208A7E-3047-43A8-947E-31C11AC6A319"
        ],
        "itemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF"
      }
    ],
    "slots": [
      {
        "id": "5A99BB51-B603-4975-AD1E-F2113668FBE2",
        "slotType": "Weapon",
        "isOccupied": true
      },
      {
        "id": "E01C92FA-8AC4-4005-8A5E-B44604C0D747",
        "slotType": "Weapon"
      },
      {
        "id": "87D31830-2C04-4CE2-A4EC-BBA7274B8F54",
        "slotType": "Feet",
        "isOccupied": true
      },
      {
        "id": "3BD7A769-1179-46A9-9989-7A27A07A630B",
        "slotType": "Currency",
        "isOccupied": true
      },
      {
        "id": "EE208A7E-3047-43A8-947E-31C11AC6A319",
        "slotType": "Common",
        "isOccupied": true
      },
      {
        "id": "B921716D-9E2C-4C8C-A2F1-E39857D2634B",
        "slotType": "Common"
      },
      {
        "id": "832B4DB3-14D2-4185-A50C-455F43587201",
        "slotType": "Common"
      },
      {
        "id": "25496070-910A-4087-A463-286AE8B1FD49",
        "slotType": "Common"
      },
      {
        "id": "A12B902F-6A67-4028-AD20-70A5584B5932",
        "slotType": "Common"
      }
    ]
  },
  "heroPreparedSpellAndAbilityIds": [
    "A3ED3076-47E7-479B-86B4-147E07DA584C",
    "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
    "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
    "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
    "4A75B866-3878-4D23-954E-9DC4E6663DAE",
    "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
    "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
    "636642BE-EA42-4482-B81C-48D8398D3BC5",
    "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
  ],
  "board": {
    "fields": {
      "-202": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-202",
                  "position": {
                    "r": -2,
                    "q": 0,
                    "s": 2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-202",
                "position": {
                  "r": -2,
                  "q": 0,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-202",
              "position": {
                "r": -2,
                "q": 0,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-202",
            "position": {
              "r": -2,
              "q": 0,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-202",
          "position": {
            "r": -2,
            "q": 0,
            "s": 2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-202",
        "position": {
          "r": -2,
          "q": 0,
          "s": 2
        },
        "sourceActorId": ""
      },
      "-211": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-211",
                  "position": {
                    "r": -2,
                    "q": 1,
                    "s": 1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-211",
                "position": {
                  "r": -2,
                  "q": 1,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-211",
              "position": {
                "r": -2,
                "q": 1,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-211",
            "position": {
              "r": -2,
              "q": 1,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-211",
          "position": {
            "r": -2,
            "q": 1,
            "s": 1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-211",
        "position": {
          "r": -2,
          "q": 1,
          "s": 1
        },
        "sourceActorId": ""
      },
      "-220": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-220",
                  "position": {
                    "r": -2,
                    "q": 2,
                    "s": 0
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-220",
                "position": {
                  "r": -2,
                  "q": 2,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-220",
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-220",
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-220",
          "position": {
            "r": -2,
            "q": 2,
            "s": 0
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-220",
        "position": {
          "r": -2,
          "q": 2,
          "s": 0
        },
        "sourceActorId": ""
      },
      "-1-12": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-1-12",
                  "position": {
                    "r": -1,
                    "q": -1,
                    "s": 2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-1-12",
                "position": {
                  "r": -1,
                  "q": -1,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-1-12",
              "position": {
                "r": -1,
                "q": -1,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-1-12",
            "position": {
              "r": -1,
              "q": -1,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-1-12",
          "position": {
            "r": -1,
            "q": -1,
            "s": 2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-1-12",
        "position": {
          "r": -1,
          "q": -1,
          "s": 2
        },
        "sourceActorId": ""
      },
      "-101": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-101",
                  "position": {
                    "r": -1,
                    "q": 0,
                    "s": 1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-101",
                "position": {
                  "r": -1,
                  "q": 0,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-101",
              "position": {
                "r": -1,
                "q": 0,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-101",
            "position": {
              "r": -1,
              "q": 0,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-101",
          "position": {
            "r": -1,
            "q": 0,
            "s": 1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-101",
        "position": {
          "r": -1,
          "q": 0,
          "s": 1
        },
        "sourceActorId": ""
      },
      "-110": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-110",
                  "position": {
                    "r": -1,
                    "q": 1,
                    "s": 0
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-110",
                "position": {
                  "r": -1,
                  "q": 1,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-110",
              "position": {
                "r": -1,
                "q": 1,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-110",
            "position": {
              "r": -1,
              "q": 1,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-110",
          "position": {
            "r": -1,
            "q": 1,
            "s": 0
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-110",
        "position": {
          "r": -1,
          "q": 1,
          "s": 0
        },
        "sourceActorId": ""
      },
      "-12-1": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "-12-1",
                  "position": {
                    "r": -1,
                    "q": 2,
                    "s": -1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-12-1",
                "position": {
                  "r": -1,
                  "q": 2,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-12-1",
              "position": {
                "r": -1,
                "q": 2,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-12-1",
            "position": {
              "r": -1,
              "q": 2,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-12-1",
          "position": {
            "r": -1,
            "q": 2,
            "s": -1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "-12-1",
        "position": {
          "r": -1,
          "q": 2,
          "s": -1
        },
        "sourceActorId": ""
      },
      "0-22": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "0-22",
                  "position": {
                    "r": 0,
                    "q": -2,
                    "s": 2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "0-22",
                "position": {
                  "r": 0,
                  "q": -2,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "0-22",
              "position": {
                "r": 0,
                "q": -2,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "0-22",
            "position": {
              "r": 0,
              "q": -2,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "0-22",
          "position": {
            "r": 0,
            "q": -2,
            "s": 2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "0-22",
        "position": {
          "r": 0,
          "q": -2,
          "s": 2
        },
        "sourceActorId": ""
      },
      "0-11": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "0-11",
                  "position": {
                    "r": 0,
                    "q": -1,
                    "s": 1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "0-11",
                "position": {
                  "r": 0,
                  "q": -1,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "0-11",
              "position": {
                "r": 0,
                "q": -1,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "0-11",
            "position": {
              "r": 0,
              "q": -1,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "0-11",
          "position": {
            "r": 0,
            "q": -1,
            "s": 1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "0-11",
        "position": {
          "r": 0,
          "q": -1,
          "s": 1
        },
        "sourceActorId": ""
      },
      "000": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "000",
                  "position": {
                    "r": 0,
                    "q": 0,
                    "s": 0
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "000",
                "position": {
                  "r": 0,
                  "q": 0,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "000",
              "position": {
                "r": 0,
                "q": 0,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "000",
            "position": {
              "r": 0,
              "q": 0,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "000",
          "position": {
            "r": 0,
            "q": 0,
            "s": 0
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "000",
        "position": {
          "r": 0,
          "q": 0,
          "s": 0
        },
        "sourceActorId": ""
      },
      "01-1": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "01-1",
                  "position": {
                    "r": 0,
                    "q": 1,
                    "s": -1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "01-1",
                "position": {
                  "r": 0,
                  "q": 1,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "01-1",
              "position": {
                "r": 0,
                "q": 1,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "01-1",
            "position": {
              "r": 0,
              "q": 1,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "01-1",
          "position": {
            "r": 0,
            "q": 1,
            "s": -1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "01-1",
        "position": {
          "r": 0,
          "q": 1,
          "s": -1
        },
        "sourceActorId": ""
      },
      "02-2": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "02-2",
                  "position": {
                    "r": 0,
                    "q": 2,
                    "s": -2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "02-2",
                "position": {
                  "r": 0,
                  "q": 2,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "02-2",
              "position": {
                "r": 0,
                "q": 2,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "02-2",
            "position": {
              "r": 0,
              "q": 2,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "02-2",
          "position": {
            "r": 0,
            "q": 2,
            "s": -2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "02-2",
        "position": {
          "r": 0,
          "q": 2,
          "s": -2
        },
        "sourceActorId": ""
      },
      "1-21": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "1-21",
                  "position": {
                    "r": 1,
                    "q": -2,
                    "s": 1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "1-21",
                "position": {
                  "r": 1,
                  "q": -2,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "1-21",
              "position": {
                "r": 1,
                "q": -2,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "1-21",
            "position": {
              "r": 1,
              "q": -2,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "1-21",
          "position": {
            "r": 1,
            "q": -2,
            "s": 1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "1-21",
        "position": {
          "r": 1,
          "q": -2,
          "s": 1
        },
        "sourceActorId": ""
      },
      "1-10": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "1-10",
                  "position": {
                    "r": 1,
                    "q": -1,
                    "s": 0
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "1-10",
                "position": {
                  "r": 1,
                  "q": -1,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "1-10",
              "position": {
                "r": 1,
                "q": -1,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "1-10",
            "position": {
              "r": 1,
              "q": -1,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "1-10",
          "position": {
            "r": 1,
            "q": -1,
            "s": 0
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "1-10",
        "position": {
          "r": 1,
          "q": -1,
          "s": 0
        },
        "sourceActorId": ""
      },
      "10-1": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "10-1",
            "position": {
              "r": 1,
              "q": 0,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "10-1",
          "position": {
            "r": 1,
            "q": 0,
            "s": -1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "10-1",
        "position": {
          "r": 1,
          "q": 0,
          "s": -1
        },
        "sourceActorId": ""
      },
      "11-2": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "11-2",
                  "position": {
                    "r": 1,
                    "q": 1,
                    "s": -2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "11-2",
                "position": {
                  "r": 1,
                  "q": 1,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "11-2",
              "position": {
                "r": 1,
                "q": 1,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "11-2",
            "position": {
              "r": 1,
              "q": 1,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "11-2",
          "position": {
            "r": 1,
            "q": 1,
            "s": -2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "11-2",
        "position": {
          "r": 1,
          "q": 1,
          "s": -2
        },
        "sourceActorId": ""
      },
      "2-20": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "2-20",
                  "position": {
                    "r": 2,
                    "q": -2,
                    "s": 0
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "2-20",
                "position": {
                  "r": 2,
                  "q": -2,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "2-20",
              "position": {
                "r": 2,
                "q": -2,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "2-20",
            "position": {
              "r": 2,
              "q": -2,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "2-20",
          "position": {
            "r": 2,
            "q": -2,
            "s": 0
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "2-20",
        "position": {
          "r": 2,
          "q": -2,
          "s": 0
        },
        "sourceActorId": ""
      },
      "2-1-1": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "2-1-1",
                  "position": {
                    "r": 2,
                    "q": -1,
                    "s": -1
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "2-1-1",
                "position": {
                  "r": 2,
                  "q": -1,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "2-1-1",
              "position": {
                "r": 2,
                "q": -1,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "2-1-1",
            "position": {
              "r": 2,
              "q": -1,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "2-1-1",
          "position": {
            "r": 2,
            "q": -1,
            "s": -1
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "2-1-1",
        "position": {
          "r": 2,
          "q": -1,
          "s": -1
        },
        "sourceActorId": ""
      },
      "20-2": {
        "_data": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "id": "20-2",
                  "position": {
                    "r": 2,
                    "q": 0,
                    "s": -2
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "20-2",
                "position": {
                  "r": 2,
                  "q": 0,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "20-2",
              "position": {
                "r": 2,
                "q": 0,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "20-2",
            "position": {
              "r": 2,
              "q": 0,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "20-2",
          "position": {
            "r": 2,
            "q": 0,
            "s": -2
          },
          "sourceActorId": ""
        },
        "actorType": 5,
        "lastingEffects": [],
        "id": "20-2",
        "position": {
          "r": 2,
          "q": 0,
          "s": -2
        },
        "sourceActorId": ""
      }
    },
    "objects": {
      "000": {
        "id": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
        "actorType": 4,
        "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
        "sourceActorId": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
        "entityType": 0,
        "informative": {
          "name": "obstacle",
          "description": "string"
        },
        "visualScene": {
          "auxId": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
          "mapTexture": {
            "url": "assets/images/obstacle.png"
          },
          "color": 2
        },
        "visualUi": {
          "avatar": {
            "url": "assets/images/obstacle.png"
          },
          "color": 2
        },
        "rotation": 0,
        "position": {
          "r": 0,
          "q": 0,
          "s": 0
        }
      },
      "-202": {
        "id": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
        "actorType": 6,
        "utilizationCost": [
          {
            "costValue": 1,
            "costType": "majorAction"
          }
        ],
        "interactionType": [
          2
        ],
        "isOpened": false,
        "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
        "sourceActorId": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
        "entityType": 0,
        "informative": {
          "name": "treasure",
          "description": "string"
        },
        "visualScene": {
          "auxId": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
          "mapTexture": {
            "url": "assets/images/treasure.png"
          },
          "color": 2
        },
        "visualUi": {
          "avatar": {
            "url": "assets/images/treasure.png"
          },
          "color": 2
        },
        "rotation": 2,
        "position": {
          "r": -2,
          "q": 0,
          "s": 2
        }
      },
      "2-1-1": {
        "id": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
        "actorType": 7,
        "utilizationCost": [],
        "interactionType": [
          2
        ],
        "applyExitBonus": true,
        "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
        "sourceActorId": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
        "entityType": 0,
        "informative": {
          "name": "dungeon exit",
          "description": "string"
        },
        "visualScene": {
          "auxId": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
          "mapTexture": {
            "url": "assets/images/exit.png"
          },
          "color": 2
        },
        "visualUi": {
          "avatar": {
            "url": "assets/images/exit.png"
          },
          "color": 2
        },
        "rotation": 0,
        "position": {
          "r": 2,
          "q": -1,
          "s": -1
        }
      },
      "20-2": {
        "playerType": "Human",
        "id": "88deb9ce-415e-4507-8a6c-374abbc7433f",
        "level": 1,
        "majorAction": 1,
        "majorActionRegain": 1,
        "minorAction": 2,
        "minorActionRegain": 2,
        "moveAction": 1,
        "moveActionRegain": 1,
        "groupId": "26E0E7C7-5789-452A-ACD8-5295980ACDB6",
        "defence": 10,
        "defenceUpperLimit": 10,
        "source": 10,
        "sourceUpperLimit": 10,
        "speed": 1,
        "speedUpperLimit": 1,
        "sight": 1,
        "sightUpperLimit": 1,
        "health": 10,
        "healthUpperLimit": 10,
        "attackPower": 5,
        "attackPowerUpperLimit": 5,
        "spellPower": 5,
        "spellPowerUpperLimit": 5,
        "actorType": 0,
        "abilities": {},
        "occupiedAreaId": "7933C948-7358-4E92-95F2-8AECB6ECB0C9",
        "experiencePoints": 0,
        "outlets": [
          0
        ],
        "sourceActorId": "6DA46033-52F9-4BB5-874C-90311A0AB036",
        "occupiedRootAreaId": "7933C948-7358-4E92-95F2-8AECB6ECB0C9",
        "inventory": {
          "itemSlots": [
            {
              "id": "5A99BB51-B603-4975-AD1E-F2113668FBE2",
              "slotType": "Weapon",
              "isOccupied": true
            },
            {
              "id": "E01C92FA-8AC4-4005-8A5E-B44604C0D747",
              "slotType": "Weapon"
            },
            {
              "id": "87D31830-2C04-4CE2-A4EC-BBA7274B8F54",
              "slotType": "Feet",
              "isOccupied": true
            },
            {
              "id": "3BD7A769-1179-46A9-9989-7A27A07A630B",
              "slotType": "Currency",
              "isOccupied": true
            },
            {
              "id": "EE208A7E-3047-43A8-947E-31C11AC6A319",
              "slotType": "Common",
              "isOccupied": true
            },
            {
              "id": "B921716D-9E2C-4C8C-A2F1-E39857D2634B",
              "slotType": "Common"
            },
            {
              "id": "832B4DB3-14D2-4185-A50C-455F43587201",
              "slotType": "Common"
            },
            {
              "id": "25496070-910A-4087-A463-286AE8B1FD49",
              "slotType": "Common"
            },
            {
              "id": "A12B902F-6A67-4028-AD20-70A5584B5932",
              "slotType": "Common"
            }
          ],
          "itemBindings": [
            {
              "id": "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
              "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
              "name": "Sword",
              "interactionType": [
                0,
                3
              ],
              "requiredSlots": [
                {
                  "slotType": "Weapon",
                  "amount": 1
                }
              ],
              "itemType": 3,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectName": 1,
              "damageValue": 10,
              "damageType": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  2
                ],
                "selectorTargets": "single"
              },
              "selectorType": "line",
              "selectorRange": 1,
              "equipCost": [
                {
                  "costValue": 1,
                  "costType": "majorAction"
                }
              ],
              "sellBasePrice": 10,
              "buyBasePrice": 10,
              "purchaseCurrency": 0,
              "maxStackSize": 1,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 1,
              "slotIds": [
                "5A99BB51-B603-4975-AD1E-F2113668FBE2"
              ],
              "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
            },
            {
              "id": "F95D81C3-1A5C-43DF-B3D6-081D36397684",
              "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
              "name": "Axe",
              "interactionType": [
                0,
                3
              ],
              "requiredSlots": [
                {
                  "slotType": "Weapon",
                  "amount": 1
                }
              ],
              "itemType": 3,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectName": 1,
              "damageValue": 10,
              "damageType": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  2
                ],
                "selectorTargets": "single"
              },
              "selectorType": "line",
              "selectorRange": 1,
              "equipCost": [
                {
                  "costValue": 1,
                  "costType": "majorAction"
                }
              ],
              "sellBasePrice": 10,
              "buyBasePrice": 10,
              "purchaseCurrency": 0,
              "maxStackSize": 1,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 1,
              "slotIds": [
                "B921716D-9E2C-4C8C-A2F1-E39857D2634B"
              ],
              "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
            },
            {
              "id": "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
              "sourceItemId": "ECCD311F-0161-49D0-BA39-3C4968B42497",
              "name": "Staff",
              "itemType": 3,
              "interactionType": [
                3,
                0
              ],
              "requiredSlots": [
                {
                  "slotType": "Weapon",
                  "amount": 2
                }
              ],
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectName": 1,
              "effectTargetingSelector": {
                "targetingActors": [
                  2
                ],
                "selectorTargets": "single"
              },
              "damageValue": 10,
              "damageType": 1,
              "selectorType": "line",
              "selectorRange": 1,
              "equipCost": [
                {
                  "costValue": 1,
                  "costType": "majorAction"
                }
              ],
              "sellBasePrice": 10,
              "buyBasePrice": 10,
              "purchaseCurrency": 0,
              "maxStackSize": 1,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 1,
              "slotIds": [],
              "itemId": "ECCD311F-0161-49D0-BA39-3C4968B42497"
            },
            {
              "id": "714DF949-8CE2-4216-A582-414CBF3277C8",
              "sourceItemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
              "name": "Boots",
              "itemType": 2,
              "interactionType": [
                0,
                3
              ],
              "requiredSlots": [
                {
                  "slotType": "Feet",
                  "amount": 1
                }
              ],
              "effectName": 4,
              "effectLifeTime": 1,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "statsModifications": [
                {
                  "statName": "speed",
                  "modiferValue": 1,
                  "modifierType": "add"
                }
              ],
              "sellBasePrice": 10,
              "buyBasePrice": 10,
              "purchaseCurrency": 0,
              "equipCost": [
                {
                  "costValue": 1,
                  "costType": "majorAction"
                }
              ],
              "maxStackSize": 1,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 1,
              "slotIds": [
                "87D31830-2C04-4CE2-A4EC-BBA7274B8F54"
              ],
              "itemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5"
            },
            {
              "id": "D91C9974-391E-4F1B-B589-E3F7F684AF63",
              "sourceItemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
              "name": "Gold",
              "itemType": 7,
              "currencyType": 0,
              "maxStackSize": 9999,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 100,
              "slotIds": [
                "3BD7A769-1179-46A9-9989-7A27A07A630B"
              ],
              "itemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C"
            },
            {
              "id": "86DBE683-9130-4771-801E-DCA914C9DCFB",
              "sourceItemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
              "name": "Healing potion",
              "itemType": 5,
              "interactionType": [
                1,
                3
              ],
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectName": 4,
              "effectTargetingSelector": {
                "targetingActors": [
                  0,
                  1
                ],
                "selectorTargets": "single"
              },
              "statsModifications": [
                {
                  "statName": "health",
                  "modiferValue": 20,
                  "modifierType": "add"
                }
              ],
              "selectorType": "line",
              "selectorRange": 1,
              "utilizationCost": [
                {
                  "costValue": 20,
                  "costType": "source"
                }
              ],
              "sellBasePrice": 10,
              "buyBasePrice": 10,
              "purchaseCurrency": 0,
              "maxStackSize": 20,
              "entityType": 6,
              "informative": {
                "name": "string",
                "description": "string"
              },
              "amountInStack": 10,
              "slotIds": [
                "EE208A7E-3047-43A8-947E-31C11AC6A319"
              ],
              "itemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF"
            }
          ]
        },
        "heroProgression": {},
        "heroSpellsAndAbilities": {
          "learnedIds": [
            "A3ED3076-47E7-479B-86B4-147E07DA584C",
            "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
            "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
            "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
            "4A75B866-3878-4D23-954E-9DC4E6663DAE",
            "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
            "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
            "636642BE-EA42-4482-B81C-48D8398D3BC5",
            "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
          ],
          "preparedIds": [
            "A3ED3076-47E7-479B-86B4-147E07DA584C",
            "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
            "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
            "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
            "4A75B866-3878-4D23-954E-9DC4E6663DAE",
            "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
            "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
            "636642BE-EA42-4482-B81C-48D8398D3BC5",
            "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
          ]
        },
        "entityType": 0,
        "informative": {
          "name": "hero",
          "description": "string"
        },
        "visualScene": {
          "auxId": "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7",
          "mapTexture": {
            "url": "assets/images/hero.png"
          },
          "color": 2
        },
        "visualUi": {
          "avatar": {
            "url": "assets/images/warior.png"
          }
        },
        "position": {
          "r": 2,
          "q": 0,
          "s": -2
        },
        "rotation": 0
      },
      "10-1": {
        "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
        "actorType": 2,
        "health": 20,
        "defence": 0,
        "attackPower": 10,
        "spellPower": 0,
        "lastingEffects": [],
        "healthUpperLimit": 20,
        "defenceUpperLimit": 0,
        "attackPowerUpperLimit": 10,
        "spellPowerUpperLimit": 0,
        "outlets": [
          0
        ],
        "effectName": 1,
        "effectLifeTime": 0,
        "effectResolveTime": 0,
        "effectTargetingSelector": {
          "targetingActors": [
            0
          ],
          "selectorTargets": "single"
        },
        "damageValue": 20,
        "damageType": 0,
        "selectorType": "line",
        "selectorRange": 1,
        "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
        "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
        "entityType": 0,
        "informative": {
          "name": "rat",
          "description": "string"
        },
        "visualScene": {
          "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "mapTexture": {
            "url": "assets/images/rat.png"
          },
          "color": 2
        },
        "visualUi": {
          "avatar": {
            "url": "assets/images/rat.png"
          },
          "color": 2
        },
        "rotation": 1,
        "position": {
          "r": 1,
          "q": 0,
          "s": -1
        }
      }
    }
  },
  "effectsToTrigger": [],
  "effectLogs": [],
  "rewardsTracker": {
    "rewardsToClaim": [],
    "claimedRewards": []
  },
  "changesHistory": [
    {
      "name": "StartTurn",
      "payload": {},
      "turn": 3,
      "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
    },
    {
      "name": "FinishDungeonTurn",
      "payload": {},
      "turn": 2,
      "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
    },
    {
      "name": "PlayDungeonCard",
      "payload": [
        {
          "origin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "actor": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "field": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "10-1",
            "position": {
              "r": 1,
              "q": 0,
              "s": -1
            },
            "sourceActorId": ""
          },
          "rotation": 1
        }
      ],
      "effectSignatures": {
        "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
        "effectName": 5,
        "data": {
          "targets": [
            {
              "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "rotation": 1
            }
          ]
        }
      },
      "turn": 2,
      "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
    },
    {
      "name": "PlayDungeonCard",
      "payload": [
        {
          "origin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "actor": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "field": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "10-1",
            "position": {
              "r": 1,
              "q": 0,
              "s": -1
            },
            "sourceActorId": ""
          },
          "rotation": 1
        }
      ],
      "effectSignatures": {
        "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
        "effectName": 5,
        "data": {
          "targets": [
            {
              "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "rotation": 1
            }
          ]
        }
      },
      "turn": 2,
      "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
    },
    {
      "name": "PlayDungeonCard",
      "payload": [
        {
          "origin": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "actor": {
            "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "actorType": 2,
            "health": 20,
            "defence": 0,
            "attackPower": 10,
            "spellPower": 0,
            "lastingEffects": [],
            "healthUpperLimit": 20,
            "defenceUpperLimit": 0,
            "attackPowerUpperLimit": 10,
            "spellPowerUpperLimit": 0,
            "outlets": [
              0
            ],
            "effectName": 1,
            "effectLifeTime": 0,
            "effectResolveTime": 0,
            "effectTargetingSelector": {
              "targetingActors": [
                0
              ],
              "selectorTargets": "single"
            },
            "damageValue": 20,
            "damageType": 0,
            "selectorType": "line",
            "selectorRange": 1,
            "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
            "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "entityType": 0,
            "informative": {
              "name": "rat",
              "description": "string"
            },
            "visualScene": {
              "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "mapTexture": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "visualUi": {
              "avatar": {
                "url": "assets/images/rat.png"
              },
              "color": 2
            },
            "rotation": 3,
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            }
          },
          "field": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "10-1",
            "position": {
              "r": 1,
              "q": 0,
              "s": -1
            },
            "sourceActorId": ""
          },
          "rotation": 1
        }
      ],
      "effectSignatures": {
        "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
        "effectName": 5,
        "data": {
          "targets": [
            {
              "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "rotation": 1
            }
          ]
        }
      },
      "turn": 2,
      "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
    },
    {
      "name": "StartDungeonTurn",
      "payload": {},
      "turn": 2,
      "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
    },
    {
      "name": "FinishTurn",
      "turn": 1,
      "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
    },
    {
      "name": "StartTurn",
      "payload": {},
      "turn": 1,
      "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
    }
  ],
  "prevState": {
    "playersNumber": 2,
    "gameLayer": "Dungeon",
    "turn": 3,
    "round": 2,
    "isDungeonTurn": false,
    "isDungeonFinished": false,
    "dungeonId": "6ACC198B-5951-4E52-BCFC-29C72CFF8004",
    "deck": {
      "playerType": "Computer",
      "actorType": 3,
      "id": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c",
      "revealedCardIds": [],
      "cardsToUtilize": [
        {
          "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
          "name": "spawnEnemy",
          "effect": {
            "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 3,
            "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "selectorType": "global",
            "effectTargetingSelector": {
              "targetingActors": [
                5
              ],
              "selectorTargets": "single"
            },
            "selectorOriginDeterminant": {
              "requireOutlets": false,
              "selectorType": "global",
              "isCaster": false
            },
            "minSpawnDistanceFromHero": 1,
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
          "name": "spawnEnemy",
          "effect": {
            "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 3,
            "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "selectorType": "global",
            "effectTargetingSelector": {
              "targetingActors": [
                5
              ],
              "selectorTargets": "single"
            },
            "selectorOriginDeterminant": {
              "requireOutlets": false,
              "selectorType": "global",
              "isCaster": false
            },
            "minSpawnDistanceFromHero": 1,
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "B27818D2-1336-4C36-9068-AC667BD656D5",
          "name": "spawnEnemy",
          "effect": {
            "id": "3082D56E-224E-47B9-A5FA-E9736C444C20",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 3,
            "enemyId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "selectorType": "global",
            "effectTargetingSelector": {
              "targetingActors": [
                5
              ],
              "selectorTargets": "single"
            },
            "selectorOriginDeterminant": {
              "requireOutlets": false,
              "selectorType": "global",
              "isCaster": false
            },
            "minSpawnDistanceFromHero": 1,
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        }
      ],
      "utilizedCards": [
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false,
              "selectorOrigin": {}
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true,
            "selectorOrigin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            }
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false,
              "selectorOrigin": {}
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true,
            "selectorOrigin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            }
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false,
              "selectorOrigin": {}
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true,
            "selectorOrigin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            }
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        }
      ],
      "cardsInDeck": [
        {
          "id": "FEA3D848-6D9C-4E7D-A285-D8B41989CE4C",
          "name": "noop",
          "effect": {
            "id": "8A754EC5-92B3-4F73-80C3-67BABE700B5B",
            "effectTargetingSelector": {},
            "effectName": 0,
            "effectLifeTime": 0,
            "effectResolveTime": 0
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        },
        {
          "id": "F80C1147-1D72-4460-A7A2-B2894C9E2F46",
          "name": "moveEnemy",
          "effect": {
            "id": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
            "effectResolveTime": 0,
            "effectLifeTime": 0,
            "effectName": 5,
            "preserveRotation": false,
            "selectorType": "global",
            "selectorRange": 2,
            "selectorOriginDeterminant": {
              "requireOutlets": true,
              "selectorType": "global",
              "isCaster": false
            },
            "effectTargetingSelector": {
              "targetingActors": [
                2
              ],
              "selectorTargets": "single"
            },
            "interactionType": [
              1
            ],
            "utilizationCost": [],
            "requiredPayload": true
          },
          "entityType": 5,
          "informative": {
            "name": "string",
            "description": "string"
          }
        }
      ],
      "drawPerTurn": 3,
      "lastingEffects": [],
      "sourceActorId": "86FA22F6-5425-4FC6-BB41-657F53A73B1B"
    },
    "exitBonuses": [],
    "heroObjectId": "88deb9ce-415e-4507-8a6c-374abbc7433f",
    "heroInventory": {
      "items": [
        {
          "id": "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
          "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
          "name": "Sword",
          "interactionType": [
            0,
            3
          ],
          "requiredSlots": [
            {
              "slotType": "Weapon",
              "amount": 1
            }
          ],
          "itemType": 3,
          "effectLifeTime": 0,
          "effectResolveTime": 0,
          "effectName": 1,
          "damageValue": 10,
          "damageType": 0,
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "selectorType": "line",
          "selectorRange": 1,
          "equipCost": [
            {
              "costValue": 1,
              "costType": "majorAction"
            }
          ],
          "sellBasePrice": 10,
          "buyBasePrice": 10,
          "purchaseCurrency": 0,
          "maxStackSize": 1,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 1,
          "slotIds": [
            "5A99BB51-B603-4975-AD1E-F2113668FBE2"
          ],
          "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
        },
        {
          "id": "F95D81C3-1A5C-43DF-B3D6-081D36397684",
          "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
          "name": "Axe",
          "interactionType": [
            0,
            3
          ],
          "requiredSlots": [
            {
              "slotType": "Weapon",
              "amount": 1
            }
          ],
          "itemType": 3,
          "effectLifeTime": 0,
          "effectResolveTime": 0,
          "effectName": 1,
          "damageValue": 10,
          "damageType": 0,
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "selectorType": "line",
          "selectorRange": 1,
          "equipCost": [
            {
              "costValue": 1,
              "costType": "majorAction"
            }
          ],
          "sellBasePrice": 10,
          "buyBasePrice": 10,
          "purchaseCurrency": 0,
          "maxStackSize": 1,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 1,
          "slotIds": [
            "B921716D-9E2C-4C8C-A2F1-E39857D2634B"
          ],
          "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
        },
        {
          "id": "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
          "sourceItemId": "ECCD311F-0161-49D0-BA39-3C4968B42497",
          "name": "Staff",
          "itemType": 3,
          "interactionType": [
            3,
            0
          ],
          "requiredSlots": [
            {
              "slotType": "Weapon",
              "amount": 2
            }
          ],
          "effectLifeTime": 0,
          "effectResolveTime": 0,
          "effectName": 1,
          "effectTargetingSelector": {
            "targetingActors": [
              2
            ],
            "selectorTargets": "single"
          },
          "damageValue": 10,
          "damageType": 1,
          "selectorType": "line",
          "selectorRange": 1,
          "equipCost": [
            {
              "costValue": 1,
              "costType": "majorAction"
            }
          ],
          "sellBasePrice": 10,
          "buyBasePrice": 10,
          "purchaseCurrency": 0,
          "maxStackSize": 1,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 1,
          "slotIds": [],
          "itemId": "ECCD311F-0161-49D0-BA39-3C4968B42497"
        },
        {
          "id": "714DF949-8CE2-4216-A582-414CBF3277C8",
          "sourceItemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
          "name": "Boots",
          "itemType": 2,
          "interactionType": [
            0,
            3
          ],
          "requiredSlots": [
            {
              "slotType": "Feet",
              "amount": 1
            }
          ],
          "effectName": 4,
          "effectLifeTime": 1,
          "effectResolveTime": 0,
          "effectTargetingSelector": {
            "targetingActors": [
              0
            ],
            "selectorTargets": "single"
          },
          "statsModifications": [
            {
              "statName": "speed",
              "modiferValue": 1,
              "modifierType": "add"
            }
          ],
          "sellBasePrice": 10,
          "buyBasePrice": 10,
          "purchaseCurrency": 0,
          "equipCost": [
            {
              "costValue": 1,
              "costType": "majorAction"
            }
          ],
          "maxStackSize": 1,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 1,
          "slotIds": [
            "87D31830-2C04-4CE2-A4EC-BBA7274B8F54"
          ],
          "itemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5"
        },
        {
          "id": "D91C9974-391E-4F1B-B589-E3F7F684AF63",
          "sourceItemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
          "name": "Gold",
          "itemType": 7,
          "currencyType": 0,
          "maxStackSize": 9999,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 100,
          "slotIds": [
            "3BD7A769-1179-46A9-9989-7A27A07A630B"
          ],
          "itemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C"
        },
        {
          "id": "86DBE683-9130-4771-801E-DCA914C9DCFB",
          "sourceItemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
          "name": "Healing potion",
          "itemType": 5,
          "interactionType": [
            1,
            3
          ],
          "effectLifeTime": 0,
          "effectResolveTime": 0,
          "effectName": 4,
          "effectTargetingSelector": {
            "targetingActors": [
              0,
              1
            ],
            "selectorTargets": "single"
          },
          "statsModifications": [
            {
              "statName": "health",
              "modiferValue": 20,
              "modifierType": "add"
            }
          ],
          "selectorType": "line",
          "selectorRange": 1,
          "utilizationCost": [
            {
              "costValue": 20,
              "costType": "source"
            }
          ],
          "sellBasePrice": 10,
          "buyBasePrice": 10,
          "purchaseCurrency": 0,
          "maxStackSize": 20,
          "entityType": 6,
          "informative": {
            "name": "string",
            "description": "string"
          },
          "amountInStack": 10,
          "slotIds": [
            "EE208A7E-3047-43A8-947E-31C11AC6A319"
          ],
          "itemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF"
        }
      ],
      "slots": [
        {
          "id": "5A99BB51-B603-4975-AD1E-F2113668FBE2",
          "slotType": "Weapon",
          "isOccupied": true
        },
        {
          "id": "E01C92FA-8AC4-4005-8A5E-B44604C0D747",
          "slotType": "Weapon"
        },
        {
          "id": "87D31830-2C04-4CE2-A4EC-BBA7274B8F54",
          "slotType": "Feet",
          "isOccupied": true
        },
        {
          "id": "3BD7A769-1179-46A9-9989-7A27A07A630B",
          "slotType": "Currency",
          "isOccupied": true
        },
        {
          "id": "EE208A7E-3047-43A8-947E-31C11AC6A319",
          "slotType": "Common",
          "isOccupied": true
        },
        {
          "id": "B921716D-9E2C-4C8C-A2F1-E39857D2634B",
          "slotType": "Common"
        },
        {
          "id": "832B4DB3-14D2-4185-A50C-455F43587201",
          "slotType": "Common"
        },
        {
          "id": "25496070-910A-4087-A463-286AE8B1FD49",
          "slotType": "Common"
        },
        {
          "id": "A12B902F-6A67-4028-AD20-70A5584B5932",
          "slotType": "Common"
        }
      ]
    },
    "heroPreparedSpellAndAbilityIds": [
      "A3ED3076-47E7-479B-86B4-147E07DA584C",
      "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
      "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
      "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
      "4A75B866-3878-4D23-954E-9DC4E6663DAE",
      "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
      "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
      "636642BE-EA42-4482-B81C-48D8398D3BC5",
      "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
    ],
    "board": {
      "fields": {
        "-202": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-202",
                    "position": {
                      "r": -2,
                      "q": 0,
                      "s": 2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-202",
                  "position": {
                    "r": -2,
                    "q": 0,
                    "s": 2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-202",
                "position": {
                  "r": -2,
                  "q": 0,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-202",
              "position": {
                "r": -2,
                "q": 0,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-202",
            "position": {
              "r": -2,
              "q": 0,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-202",
          "position": {
            "r": -2,
            "q": 0,
            "s": 2
          },
          "sourceActorId": ""
        },
        "-211": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-211",
                    "position": {
                      "r": -2,
                      "q": 1,
                      "s": 1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-211",
                  "position": {
                    "r": -2,
                    "q": 1,
                    "s": 1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-211",
                "position": {
                  "r": -2,
                  "q": 1,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-211",
              "position": {
                "r": -2,
                "q": 1,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-211",
            "position": {
              "r": -2,
              "q": 1,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-211",
          "position": {
            "r": -2,
            "q": 1,
            "s": 1
          },
          "sourceActorId": ""
        },
        "-220": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-220",
                    "position": {
                      "r": -2,
                      "q": 2,
                      "s": 0
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-220",
                  "position": {
                    "r": -2,
                    "q": 2,
                    "s": 0
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-220",
                "position": {
                  "r": -2,
                  "q": 2,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-220",
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-220",
            "position": {
              "r": -2,
              "q": 2,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-220",
          "position": {
            "r": -2,
            "q": 2,
            "s": 0
          },
          "sourceActorId": ""
        },
        "-1-12": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-1-12",
                    "position": {
                      "r": -1,
                      "q": -1,
                      "s": 2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-1-12",
                  "position": {
                    "r": -1,
                    "q": -1,
                    "s": 2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-1-12",
                "position": {
                  "r": -1,
                  "q": -1,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-1-12",
              "position": {
                "r": -1,
                "q": -1,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-1-12",
            "position": {
              "r": -1,
              "q": -1,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-1-12",
          "position": {
            "r": -1,
            "q": -1,
            "s": 2
          },
          "sourceActorId": ""
        },
        "-101": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-101",
                    "position": {
                      "r": -1,
                      "q": 0,
                      "s": 1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-101",
                  "position": {
                    "r": -1,
                    "q": 0,
                    "s": 1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-101",
                "position": {
                  "r": -1,
                  "q": 0,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-101",
              "position": {
                "r": -1,
                "q": 0,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-101",
            "position": {
              "r": -1,
              "q": 0,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-101",
          "position": {
            "r": -1,
            "q": 0,
            "s": 1
          },
          "sourceActorId": ""
        },
        "-110": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-110",
                    "position": {
                      "r": -1,
                      "q": 1,
                      "s": 0
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-110",
                  "position": {
                    "r": -1,
                    "q": 1,
                    "s": 0
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-110",
                "position": {
                  "r": -1,
                  "q": 1,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-110",
              "position": {
                "r": -1,
                "q": 1,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-110",
            "position": {
              "r": -1,
              "q": 1,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-110",
          "position": {
            "r": -1,
            "q": 1,
            "s": 0
          },
          "sourceActorId": ""
        },
        "-12-1": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "-12-1",
                    "position": {
                      "r": -1,
                      "q": 2,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "-12-1",
                  "position": {
                    "r": -1,
                    "q": 2,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "-12-1",
                "position": {
                  "r": -1,
                  "q": 2,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "-12-1",
              "position": {
                "r": -1,
                "q": 2,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "-12-1",
            "position": {
              "r": -1,
              "q": 2,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "-12-1",
          "position": {
            "r": -1,
            "q": 2,
            "s": -1
          },
          "sourceActorId": ""
        },
        "0-22": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "0-22",
                    "position": {
                      "r": 0,
                      "q": -2,
                      "s": 2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "0-22",
                  "position": {
                    "r": 0,
                    "q": -2,
                    "s": 2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "0-22",
                "position": {
                  "r": 0,
                  "q": -2,
                  "s": 2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "0-22",
              "position": {
                "r": 0,
                "q": -2,
                "s": 2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "0-22",
            "position": {
              "r": 0,
              "q": -2,
              "s": 2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "0-22",
          "position": {
            "r": 0,
            "q": -2,
            "s": 2
          },
          "sourceActorId": ""
        },
        "0-11": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "0-11",
                    "position": {
                      "r": 0,
                      "q": -1,
                      "s": 1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "0-11",
                  "position": {
                    "r": 0,
                    "q": -1,
                    "s": 1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "0-11",
                "position": {
                  "r": 0,
                  "q": -1,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "0-11",
              "position": {
                "r": 0,
                "q": -1,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "0-11",
            "position": {
              "r": 0,
              "q": -1,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "0-11",
          "position": {
            "r": 0,
            "q": -1,
            "s": 1
          },
          "sourceActorId": ""
        },
        "000": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "000",
                    "position": {
                      "r": 0,
                      "q": 0,
                      "s": 0
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "000",
                  "position": {
                    "r": 0,
                    "q": 0,
                    "s": 0
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "000",
                "position": {
                  "r": 0,
                  "q": 0,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "000",
              "position": {
                "r": 0,
                "q": 0,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "000",
            "position": {
              "r": 0,
              "q": 0,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "000",
          "position": {
            "r": 0,
            "q": 0,
            "s": 0
          },
          "sourceActorId": ""
        },
        "01-1": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "01-1",
                    "position": {
                      "r": 0,
                      "q": 1,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "01-1",
                  "position": {
                    "r": 0,
                    "q": 1,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "01-1",
                "position": {
                  "r": 0,
                  "q": 1,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "01-1",
              "position": {
                "r": 0,
                "q": 1,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "01-1",
            "position": {
              "r": 0,
              "q": 1,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "01-1",
          "position": {
            "r": 0,
            "q": 1,
            "s": -1
          },
          "sourceActorId": ""
        },
        "02-2": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "02-2",
                    "position": {
                      "r": 0,
                      "q": 2,
                      "s": -2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "02-2",
                  "position": {
                    "r": 0,
                    "q": 2,
                    "s": -2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "02-2",
                "position": {
                  "r": 0,
                  "q": 2,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "02-2",
              "position": {
                "r": 0,
                "q": 2,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "02-2",
            "position": {
              "r": 0,
              "q": 2,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "02-2",
          "position": {
            "r": 0,
            "q": 2,
            "s": -2
          },
          "sourceActorId": ""
        },
        "1-21": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "1-21",
                    "position": {
                      "r": 1,
                      "q": -2,
                      "s": 1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "1-21",
                  "position": {
                    "r": 1,
                    "q": -2,
                    "s": 1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "1-21",
                "position": {
                  "r": 1,
                  "q": -2,
                  "s": 1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "1-21",
              "position": {
                "r": 1,
                "q": -2,
                "s": 1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "1-21",
            "position": {
              "r": 1,
              "q": -2,
              "s": 1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "1-21",
          "position": {
            "r": 1,
            "q": -2,
            "s": 1
          },
          "sourceActorId": ""
        },
        "1-10": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "1-10",
                    "position": {
                      "r": 1,
                      "q": -1,
                      "s": 0
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "1-10",
                  "position": {
                    "r": 1,
                    "q": -1,
                    "s": 0
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "1-10",
                "position": {
                  "r": 1,
                  "q": -1,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "1-10",
              "position": {
                "r": 1,
                "q": -1,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "1-10",
            "position": {
              "r": 1,
              "q": -1,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "1-10",
          "position": {
            "r": 1,
            "q": -1,
            "s": 0
          },
          "sourceActorId": ""
        },
        "10-1": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "10-1",
            "position": {
              "r": 1,
              "q": 0,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "10-1",
          "position": {
            "r": 1,
            "q": 0,
            "s": -1
          },
          "sourceActorId": ""
        },
        "11-2": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "11-2",
                    "position": {
                      "r": 1,
                      "q": 1,
                      "s": -2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "11-2",
                  "position": {
                    "r": 1,
                    "q": 1,
                    "s": -2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "11-2",
                "position": {
                  "r": 1,
                  "q": 1,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "11-2",
              "position": {
                "r": 1,
                "q": 1,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "11-2",
            "position": {
              "r": 1,
              "q": 1,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "11-2",
          "position": {
            "r": 1,
            "q": 1,
            "s": -2
          },
          "sourceActorId": ""
        },
        "2-20": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "2-20",
                    "position": {
                      "r": 2,
                      "q": -2,
                      "s": 0
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "2-20",
                  "position": {
                    "r": 2,
                    "q": -2,
                    "s": 0
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "2-20",
                "position": {
                  "r": 2,
                  "q": -2,
                  "s": 0
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "2-20",
              "position": {
                "r": 2,
                "q": -2,
                "s": 0
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "2-20",
            "position": {
              "r": 2,
              "q": -2,
              "s": 0
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "2-20",
          "position": {
            "r": 2,
            "q": -2,
            "s": 0
          },
          "sourceActorId": ""
        },
        "2-1-1": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "2-1-1",
                    "position": {
                      "r": 2,
                      "q": -1,
                      "s": -1
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "2-1-1",
                  "position": {
                    "r": 2,
                    "q": -1,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "2-1-1",
                "position": {
                  "r": 2,
                  "q": -1,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "2-1-1",
              "position": {
                "r": 2,
                "q": -1,
                "s": -1
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "2-1-1",
            "position": {
              "r": 2,
              "q": -1,
              "s": -1
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "2-1-1",
          "position": {
            "r": 2,
            "q": -1,
            "s": -1
          },
          "sourceActorId": ""
        },
        "20-2": {
          "_data": {
            "_data": {
              "_data": {
                "_data": {
                  "_data": {
                    "id": "20-2",
                    "position": {
                      "r": 2,
                      "q": 0,
                      "s": -2
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "20-2",
                  "position": {
                    "r": 2,
                    "q": 0,
                    "s": -2
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "20-2",
                "position": {
                  "r": 2,
                  "q": 0,
                  "s": -2
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "20-2",
              "position": {
                "r": 2,
                "q": 0,
                "s": -2
              },
              "sourceActorId": ""
            },
            "actorType": 5,
            "lastingEffects": [],
            "id": "20-2",
            "position": {
              "r": 2,
              "q": 0,
              "s": -2
            },
            "sourceActorId": ""
          },
          "actorType": 5,
          "lastingEffects": [],
          "id": "20-2",
          "position": {
            "r": 2,
            "q": 0,
            "s": -2
          },
          "sourceActorId": ""
        }
      },
      "objects": {
        "000": {
          "id": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
          "actorType": 4,
          "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
          "sourceActorId": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
          "entityType": 0,
          "informative": {
            "name": "obstacle",
            "description": "string"
          },
          "visualScene": {
            "auxId": "A3FAF197-EEDE-407D-A08F-EE8E519D359F",
            "mapTexture": {
              "url": "assets/images/obstacle.png"
            },
            "color": 2
          },
          "visualUi": {
            "avatar": {
              "url": "assets/images/obstacle.png"
            },
            "color": 2
          },
          "rotation": 0,
          "position": {
            "r": 0,
            "q": 0,
            "s": 0
          }
        },
        "-202": {
          "id": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
          "actorType": 6,
          "utilizationCost": [
            {
              "costValue": 1,
              "costType": "majorAction"
            }
          ],
          "interactionType": [
            2
          ],
          "isOpened": false,
          "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
          "sourceActorId": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
          "entityType": 0,
          "informative": {
            "name": "treasure",
            "description": "string"
          },
          "visualScene": {
            "auxId": "E2A83BC9-5C2E-46A5-A8EF-D9F48B9146E4",
            "mapTexture": {
              "url": "assets/images/treasure.png"
            },
            "color": 2
          },
          "visualUi": {
            "avatar": {
              "url": "assets/images/treasure.png"
            },
            "color": 2
          },
          "rotation": 2,
          "position": {
            "r": -2,
            "q": 0,
            "s": 2
          }
        },
        "2-1-1": {
          "id": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
          "actorType": 7,
          "utilizationCost": [],
          "interactionType": [
            2
          ],
          "applyExitBonus": true,
          "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
          "sourceActorId": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
          "entityType": 0,
          "informative": {
            "name": "dungeon exit",
            "description": "string"
          },
          "visualScene": {
            "auxId": "A3D83C26-FAC9-4446-89DF-D228C7A8810A",
            "mapTexture": {
              "url": "assets/images/exit.png"
            },
            "color": 2
          },
          "visualUi": {
            "avatar": {
              "url": "assets/images/exit.png"
            },
            "color": 2
          },
          "rotation": 0,
          "position": {
            "r": 2,
            "q": -1,
            "s": -1
          }
        },
        "20-2": {
          "playerType": "Human",
          "id": "88deb9ce-415e-4507-8a6c-374abbc7433f",
          "level": 1,
          "majorAction": 1,
          "majorActionRegain": 1,
          "minorAction": 2,
          "minorActionRegain": 2,
          "moveAction": 1,
          "moveActionRegain": 1,
          "groupId": "26E0E7C7-5789-452A-ACD8-5295980ACDB6",
          "defence": 10,
          "defenceUpperLimit": 10,
          "source": 10,
          "sourceUpperLimit": 10,
          "speed": 1,
          "speedUpperLimit": 1,
          "sight": 1,
          "sightUpperLimit": 1,
          "health": 10,
          "healthUpperLimit": 10,
          "attackPower": 5,
          "attackPowerUpperLimit": 5,
          "spellPower": 5,
          "spellPowerUpperLimit": 5,
          "actorType": 0,
          "abilities": {},
          "occupiedAreaId": "7933C948-7358-4E92-95F2-8AECB6ECB0C9",
          "experiencePoints": 0,
          "outlets": [
            0
          ],
          "sourceActorId": "6DA46033-52F9-4BB5-874C-90311A0AB036",
          "occupiedRootAreaId": "7933C948-7358-4E92-95F2-8AECB6ECB0C9",
          "inventory": {
            "itemSlots": [
              {
                "id": "5A99BB51-B603-4975-AD1E-F2113668FBE2",
                "slotType": "Weapon",
                "isOccupied": true
              },
              {
                "id": "E01C92FA-8AC4-4005-8A5E-B44604C0D747",
                "slotType": "Weapon"
              },
              {
                "id": "87D31830-2C04-4CE2-A4EC-BBA7274B8F54",
                "slotType": "Feet",
                "isOccupied": true
              },
              {
                "id": "3BD7A769-1179-46A9-9989-7A27A07A630B",
                "slotType": "Currency",
                "isOccupied": true
              },
              {
                "id": "EE208A7E-3047-43A8-947E-31C11AC6A319",
                "slotType": "Common",
                "isOccupied": true
              },
              {
                "id": "B921716D-9E2C-4C8C-A2F1-E39857D2634B",
                "slotType": "Common"
              },
              {
                "id": "832B4DB3-14D2-4185-A50C-455F43587201",
                "slotType": "Common"
              },
              {
                "id": "25496070-910A-4087-A463-286AE8B1FD49",
                "slotType": "Common"
              },
              {
                "id": "A12B902F-6A67-4028-AD20-70A5584B5932",
                "slotType": "Common"
              }
            ],
            "itemBindings": [
              {
                "id": "9A8A5A25-F98B-4926-9288-2413EF48AAA8",
                "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
                "name": "Sword",
                "interactionType": [
                  0,
                  3
                ],
                "requiredSlots": [
                  {
                    "slotType": "Weapon",
                    "amount": 1
                  }
                ],
                "itemType": 3,
                "effectLifeTime": 0,
                "effectResolveTime": 0,
                "effectName": 1,
                "damageValue": 10,
                "damageType": 0,
                "effectTargetingSelector": {
                  "targetingActors": [
                    2
                  ],
                  "selectorTargets": "single"
                },
                "selectorType": "line",
                "selectorRange": 1,
                "equipCost": [
                  {
                    "costValue": 1,
                    "costType": "majorAction"
                  }
                ],
                "sellBasePrice": 10,
                "buyBasePrice": 10,
                "purchaseCurrency": 0,
                "maxStackSize": 1,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 1,
                "slotIds": [
                  "5A99BB51-B603-4975-AD1E-F2113668FBE2"
                ],
                "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
              },
              {
                "id": "F95D81C3-1A5C-43DF-B3D6-081D36397684",
                "sourceItemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30",
                "name": "Axe",
                "interactionType": [
                  0,
                  3
                ],
                "requiredSlots": [
                  {
                    "slotType": "Weapon",
                    "amount": 1
                  }
                ],
                "itemType": 3,
                "effectLifeTime": 0,
                "effectResolveTime": 0,
                "effectName": 1,
                "damageValue": 10,
                "damageType": 0,
                "effectTargetingSelector": {
                  "targetingActors": [
                    2
                  ],
                  "selectorTargets": "single"
                },
                "selectorType": "line",
                "selectorRange": 1,
                "equipCost": [
                  {
                    "costValue": 1,
                    "costType": "majorAction"
                  }
                ],
                "sellBasePrice": 10,
                "buyBasePrice": 10,
                "purchaseCurrency": 0,
                "maxStackSize": 1,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 1,
                "slotIds": [
                  "B921716D-9E2C-4C8C-A2F1-E39857D2634B"
                ],
                "itemId": "F35F997F-405B-4F0A-8A6D-82C771BF6A30"
              },
              {
                "id": "9E3CFF84-1FEC-4FAA-927F-D38909804D78",
                "sourceItemId": "ECCD311F-0161-49D0-BA39-3C4968B42497",
                "name": "Staff",
                "itemType": 3,
                "interactionType": [
                  3,
                  0
                ],
                "requiredSlots": [
                  {
                    "slotType": "Weapon",
                    "amount": 2
                  }
                ],
                "effectLifeTime": 0,
                "effectResolveTime": 0,
                "effectName": 1,
                "effectTargetingSelector": {
                  "targetingActors": [
                    2
                  ],
                  "selectorTargets": "single"
                },
                "damageValue": 10,
                "damageType": 1,
                "selectorType": "line",
                "selectorRange": 1,
                "equipCost": [
                  {
                    "costValue": 1,
                    "costType": "majorAction"
                  }
                ],
                "sellBasePrice": 10,
                "buyBasePrice": 10,
                "purchaseCurrency": 0,
                "maxStackSize": 1,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 1,
                "slotIds": [],
                "itemId": "ECCD311F-0161-49D0-BA39-3C4968B42497"
              },
              {
                "id": "714DF949-8CE2-4216-A582-414CBF3277C8",
                "sourceItemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5",
                "name": "Boots",
                "itemType": 2,
                "interactionType": [
                  0,
                  3
                ],
                "requiredSlots": [
                  {
                    "slotType": "Feet",
                    "amount": 1
                  }
                ],
                "effectName": 4,
                "effectLifeTime": 1,
                "effectResolveTime": 0,
                "effectTargetingSelector": {
                  "targetingActors": [
                    0
                  ],
                  "selectorTargets": "single"
                },
                "statsModifications": [
                  {
                    "statName": "speed",
                    "modiferValue": 1,
                    "modifierType": "add"
                  }
                ],
                "sellBasePrice": 10,
                "buyBasePrice": 10,
                "purchaseCurrency": 0,
                "equipCost": [
                  {
                    "costValue": 1,
                    "costType": "majorAction"
                  }
                ],
                "maxStackSize": 1,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 1,
                "slotIds": [
                  "87D31830-2C04-4CE2-A4EC-BBA7274B8F54"
                ],
                "itemId": "9D993B4D-8D71-4C28-B86B-5427A5FD62A5"
              },
              {
                "id": "D91C9974-391E-4F1B-B589-E3F7F684AF63",
                "sourceItemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C",
                "name": "Gold",
                "itemType": 7,
                "currencyType": 0,
                "maxStackSize": 9999,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 100,
                "slotIds": [
                  "3BD7A769-1179-46A9-9989-7A27A07A630B"
                ],
                "itemId": "EF9C9CE4-7429-4660-8FA2-F9243A415B9C"
              },
              {
                "id": "86DBE683-9130-4771-801E-DCA914C9DCFB",
                "sourceItemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF",
                "name": "Healing potion",
                "itemType": 5,
                "interactionType": [
                  1,
                  3
                ],
                "effectLifeTime": 0,
                "effectResolveTime": 0,
                "effectName": 4,
                "effectTargetingSelector": {
                  "targetingActors": [
                    0,
                    1
                  ],
                  "selectorTargets": "single"
                },
                "statsModifications": [
                  {
                    "statName": "health",
                    "modiferValue": 20,
                    "modifierType": "add"
                  }
                ],
                "selectorType": "line",
                "selectorRange": 1,
                "utilizationCost": [
                  {
                    "costValue": 20,
                    "costType": "source"
                  }
                ],
                "sellBasePrice": 10,
                "buyBasePrice": 10,
                "purchaseCurrency": 0,
                "maxStackSize": 20,
                "entityType": 6,
                "informative": {
                  "name": "string",
                  "description": "string"
                },
                "amountInStack": 10,
                "slotIds": [
                  "EE208A7E-3047-43A8-947E-31C11AC6A319"
                ],
                "itemId": "DDD1EBED-5C4C-42B9-AF10-A66581D90AEF"
              }
            ]
          },
          "heroProgression": {},
          "heroSpellsAndAbilities": {
            "learnedIds": [
              "A3ED3076-47E7-479B-86B4-147E07DA584C",
              "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
              "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
              "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
              "4A75B866-3878-4D23-954E-9DC4E6663DAE",
              "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
              "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
              "636642BE-EA42-4482-B81C-48D8398D3BC5",
              "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
            ],
            "preparedIds": [
              "A3ED3076-47E7-479B-86B4-147E07DA584C",
              "85745620-91E7-4BDB-BE6A-EBE7B207E4DD",
              "A1F8217E-5C5B-4512-A6CE-6C553AC587F0",
              "C1DD99DF-C0F0-4EEE-B2D4-D51C77E0043E",
              "4A75B866-3878-4D23-954E-9DC4E6663DAE",
              "605E23E0-6DB9-4B09-A84B-B4738E5D9E55",
              "7A7B211B-92FB-4417-B1A9-853FB1564F0A",
              "636642BE-EA42-4482-B81C-48D8398D3BC5",
              "B0D3E90C-E359-43C9-A42F-30D9B37B2E0E"
            ]
          },
          "entityType": 0,
          "informative": {
            "name": "hero",
            "description": "string"
          },
          "visualScene": {
            "auxId": "DF750CDB-22BF-4948-BCF9-7FCB1108D1E7",
            "mapTexture": {
              "url": "assets/images/hero.png"
            },
            "color": 2
          },
          "visualUi": {
            "avatar": {
              "url": "assets/images/warior.png"
            }
          },
          "position": {
            "r": 2,
            "q": 0,
            "s": -2
          },
          "rotation": 0
        },
        "10-1": {
          "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "actorType": 2,
          "health": 20,
          "defence": 0,
          "attackPower": 10,
          "spellPower": 0,
          "lastingEffects": [],
          "healthUpperLimit": 20,
          "defenceUpperLimit": 0,
          "attackPowerUpperLimit": 10,
          "spellPowerUpperLimit": 0,
          "outlets": [
            0
          ],
          "effectName": 1,
          "effectLifeTime": 0,
          "effectResolveTime": 0,
          "effectTargetingSelector": {
            "targetingActors": [
              0
            ],
            "selectorTargets": "single"
          },
          "damageValue": 20,
          "damageType": 0,
          "selectorType": "line",
          "selectorRange": 1,
          "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
          "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
          "entityType": 0,
          "informative": {
            "name": "rat",
            "description": "string"
          },
          "visualScene": {
            "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
            "mapTexture": {
              "url": "assets/images/rat.png"
            },
            "color": 2
          },
          "visualUi": {
            "avatar": {
              "url": "assets/images/rat.png"
            },
            "color": 2
          },
          "rotation": 1,
          "position": {
            "r": 1,
            "q": 0,
            "s": -1
          }
        }
      }
    },
    "effectsToTrigger": [],
    "effectLogs": [],
    "rewardsTracker": {
      "rewardsToClaim": [],
      "claimedRewards": []
    },
    "changesHistory": [
      {
        "name": "StartTurn",
        "payload": {},
        "turn": 3,
        "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
      },
      {
        "name": "FinishDungeonTurn",
        "payload": {},
        "turn": 2,
        "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
      },
      {
        "name": "PlayDungeonCard",
        "payload": [
          {
            "origin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "actor": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "field": {
              "_data": {
                "_data": {
                  "_data": {
                    "_data": {
                      "id": "10-1",
                      "position": {
                        "r": 1,
                        "q": 0,
                        "s": -1
                      },
                      "actorType": 5,
                      "lastingEffects": [],
                      "sourceActorId": ""
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "rotation": 1
          }
        ],
        "effectSignatures": {
          "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectName": 5,
          "data": {
            "targets": [
              {
                "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "rotation": 1
              }
            ]
          }
        },
        "turn": 2,
        "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
      },
      {
        "name": "PlayDungeonCard",
        "payload": [
          {
            "origin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "actor": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "field": {
              "_data": {
                "_data": {
                  "_data": {
                    "_data": {
                      "id": "10-1",
                      "position": {
                        "r": 1,
                        "q": 0,
                        "s": -1
                      },
                      "actorType": 5,
                      "lastingEffects": [],
                      "sourceActorId": ""
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "rotation": 1
          }
        ],
        "effectSignatures": {
          "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectName": 5,
          "data": {
            "targets": [
              {
                "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "rotation": 1
              }
            ]
          }
        },
        "turn": 2,
        "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
      },
      {
        "name": "PlayDungeonCard",
        "payload": [
          {
            "origin": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "actor": {
              "id": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "actorType": 2,
              "health": 20,
              "defence": 0,
              "attackPower": 10,
              "spellPower": 0,
              "lastingEffects": [],
              "healthUpperLimit": 20,
              "defenceUpperLimit": 0,
              "attackPowerUpperLimit": 10,
              "spellPowerUpperLimit": 0,
              "outlets": [
                0
              ],
              "effectName": 1,
              "effectLifeTime": 0,
              "effectResolveTime": 0,
              "effectTargetingSelector": {
                "targetingActors": [
                  0
                ],
                "selectorTargets": "single"
              },
              "damageValue": 20,
              "damageType": 0,
              "selectorType": "line",
              "selectorRange": 1,
              "groupId": "FDF02595-7340-4E34-83D8-1D492B7F8D84",
              "sourceActorId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
              "entityType": 0,
              "informative": {
                "name": "rat",
                "description": "string"
              },
              "visualScene": {
                "auxId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "mapTexture": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "visualUi": {
                "avatar": {
                  "url": "assets/images/rat.png"
                },
                "color": 2
              },
              "rotation": 3,
              "position": {
                "r": -2,
                "q": 2,
                "s": 0
              }
            },
            "field": {
              "_data": {
                "_data": {
                  "_data": {
                    "_data": {
                      "id": "10-1",
                      "position": {
                        "r": 1,
                        "q": 0,
                        "s": -1
                      },
                      "actorType": 5,
                      "lastingEffects": [],
                      "sourceActorId": ""
                    },
                    "actorType": 5,
                    "lastingEffects": [],
                    "id": "10-1",
                    "position": {
                      "r": 1,
                      "q": 0,
                      "s": -1
                    },
                    "sourceActorId": ""
                  },
                  "actorType": 5,
                  "lastingEffects": [],
                  "id": "10-1",
                  "position": {
                    "r": 1,
                    "q": 0,
                    "s": -1
                  },
                  "sourceActorId": ""
                },
                "actorType": 5,
                "lastingEffects": [],
                "id": "10-1",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "sourceActorId": ""
              },
              "actorType": 5,
              "lastingEffects": [],
              "id": "10-1",
              "position": {
                "r": 1,
                "q": 0,
                "s": -1
              },
              "sourceActorId": ""
            },
            "rotation": 1
          }
        ],
        "effectSignatures": {
          "effectId": "3D05CF5E-2DA0-4E3B-A16F-ADEF1780C0CD",
          "effectName": 5,
          "data": {
            "targets": [
              {
                "targetId": "88275863-48C3-4E13-B7CF-CA1A52539F1D",
                "position": {
                  "r": 1,
                  "q": 0,
                  "s": -1
                },
                "rotation": 1
              }
            ]
          }
        },
        "turn": 2,
        "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
      },
      {
        "name": "StartDungeonTurn",
        "payload": {},
        "turn": 2,
        "playerId": "f0b019e7-f3bd-4a55-b208-f8ad1595c40c"
      },
      {
        "name": "FinishTurn",
        "turn": 1,
        "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
      },
      {
        "name": "StartTurn",
        "payload": {},
        "turn": 1,
        "playerId": "88deb9ce-415e-4507-8a6c-374abbc7433f"
      }
    ]
  }
}