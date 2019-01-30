import { actionCreatorFactory, setting } from '../src/action-creator-factory'

describe('debug', () => {

  test('test no prefix actionCreatorFactory', () => {
    // no error
    actionCreatorFactory()
    actionCreatorFactory()
    actionCreatorFactory('namespace')
    const tmpActionCreator = actionCreatorFactory('fugafuga')
    tmpActionCreator('somekey')
    tmpActionCreator('somekey')

    setting({
      doNotUseSamePrefix: true,
      doNotCreateSameFluxType: true,
    })
    actionCreatorFactory('namespace')
    expect(() => actionCreatorFactory('namespace')).toThrow()
    const fugafugaActionCreator = actionCreatorFactory('fugafuga')
    fugafugaActionCreator('piyo')
    expect(() => fugafugaActionCreator('piyo')).toThrow()
  })

  test('test add id to suffix', () => {
    setting({
      doNotUseSamePrefix: false,
      doNotCreateSameFluxType: false,
      addIdToSuffix: true,
    })
    const tmpActionCreator = actionCreatorFactory('fugafuga')
    const type = 'somekey'
    expect(tmpActionCreator(type).type === `${type}__1`)
    expect(tmpActionCreator(type).type === `${type}__2`)
  })

})
