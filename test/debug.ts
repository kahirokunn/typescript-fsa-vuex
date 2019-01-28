import { actionCreatorFactory, debugSetting } from "../src/action-creator";

describe("debug", () => {

  test("test no prefix actionCreatorFactory", () => {
    // no error
    actionCreatorFactory()
    actionCreatorFactory()
    actionCreatorFactory('namespace')
    const tmpActionCreator = actionCreatorFactory('fugafuga')
    tmpActionCreator('somekey')
    tmpActionCreator('somekey')

    debugSetting({
      doNotUseSamePrefix: true,
      doNotCreateSameFluxType: true,
      logPrefix: true,
      logFluxType: true,
    })
    actionCreatorFactory('namespace')
    expect(() => actionCreatorFactory('namespace')).toThrow()
    const fugafugaActionCreator = actionCreatorFactory('fugafuga')
    fugafugaActionCreator('piyo')
    expect(() => fugafugaActionCreator('piyo')).toThrow()
  });

});
