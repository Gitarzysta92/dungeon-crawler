import { HeroBuilder } from "../gameplay/modules/heroes/builder/hero.builder";
import { DataFeed } from "../helpers/data-feed";
import { getEntityFactory } from "../helpers/entity-helper";

describe('hero-builder', () => {
  const dataFeed = new DataFeed();
  const entityFactory = getEntityFactory(dataFeed);
  let heroBuilder: HeroBuilder;
  beforeEach(() => {
    heroBuilder = new HeroBuilder(dataFeed, entityFactory)
  });

  it("create hero entity from provided configuration", async () => {
    const heroClass = (await dataFeed.getHeroClasses())[0];
    const heroRace = (await dataFeed.getHeroRaces())[0];
    const heroOrigin = (await dataFeed.getHeroOrigins())[0];
    const name = "test";

    await heroBuilder.selectClass(heroClass.id);
    await heroBuilder.selectRace(heroRace.id);
    await heroBuilder.selectOrigin(heroOrigin.id);
    await heroBuilder.selectName(name);
    
    const result = await heroBuilder.build();
    expect(result).toBeTruthy();
  });


});
