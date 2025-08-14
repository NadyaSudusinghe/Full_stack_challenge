import {
  integrationTestModule,
  integrationTestTeardown,
} from "../integration-test.module";
import { BearRepository } from "../persistence/bear.repository";
import { AppDataSource } from "../config/data-source";
import { TransactionalTestContext } from "typeorm-transactional-tests";
import { BearController } from "./bear.controller";
import { Bear } from "../persistence/bear.entity";
import { BadRequestException } from "@nestjs/common";
import { Color } from "../persistence/color.entity";
import { TestingModule } from "@nestjs/testing";
import { DataSource } from "typeorm";

jest.setTimeout(60000);

let transactionalContext: TransactionalTestContext;
let testModule: TestingModule;
let bearRepository: BearRepository;
let bearController: BearController;

describe("BearController", () => {
  beforeAll(async () => {
    testModule = await integrationTestModule();
    bearRepository = testModule.get<BearRepository>(BearRepository);
    bearController = testModule.get<BearController>(BearController);
  });

  afterAll(async () => {
    await integrationTestTeardown();
  });

  beforeEach(async () => {
    if (AppDataSource.isInitialized) {
      transactionalContext = new TransactionalTestContext(AppDataSource);
      await transactionalContext.start();
    }
  });

  afterEach(async () => {
    if (transactionalContext) {
      await transactionalContext.finish();
    }
  });

  it("Should run", async () => {
    expect(bearRepository).toBeDefined();
  });

  it("size-in-range wrong parameters should raise error", async () => {
    try {
      await bearController.getBearBySizeInRange(10, 0);
    } catch (error) {
      const exception = error as BadRequestException;
      expect(exception.getStatus()).toEqual(400);
    }
  });

  it("size-in-range should return proper values", async () => {
    const gummyBear = new Bear();
    gummyBear.name = "Gummybear";
    gummyBear.size = 5;
    const grizzlyBear = new Bear();
    grizzlyBear.name = "Grizzly";
    grizzlyBear.size = 320;
    await bearRepository.save(gummyBear);
    await bearRepository.save(grizzlyBear);

    let bears = await bearController.getBearBySizeInRange(0, 4);
    expect(bears.length).toEqual(0);

    bears = await bearController.getBearBySizeInRange(5, 320);
    expect(bears.length).toEqual(2);

    bears = await bearController.getBearBySizeInRange(100, 500);
    expect(bears.length).toEqual(1);
    expect(bears[0]).toEqual("Grizzly");
  });

  it("should return bears by color name", async () => {
    // Create colors and bears, save to DB
    const brownColor = new Color();
    brownColor.name = "Brown";
    await testModule.get(DataSource).manager.save(brownColor);

    const grizzlyBear = new Bear();
    grizzlyBear.name = "Grizzly";
    grizzlyBear.size = 320;
    grizzlyBear.colors = [brownColor];
    await bearRepository.save(grizzlyBear);

    const pandaBear = new Bear();
    pandaBear.name = "Panda";
    pandaBear.size = 160;
    pandaBear.colors = [];
    await bearRepository.save(pandaBear);

    // Call controller method
    const result = await bearController.findBearsByColor("Brown");

    expect(result.map((bear) => bear.name)).toContain("Grizzly");
    expect(result.map((bear) => bear.name)).not.toContain("Panda");
  });
});
