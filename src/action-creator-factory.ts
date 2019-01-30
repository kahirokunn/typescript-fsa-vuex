import {
  FluxType,
  ImmutableFSA,
  Options,
  ActionCreator,
} from './types'

const settings = {
  doNotUseSamePrefix: false,
  doNotCreateSameFluxType: false,
  logPrefix: false,
  logFluxType: false,
  addIdToSuffix: false,
}
const cachedPrefixList: string[] = []
const cachedFluxTypeList: string[] = []
// tslint:disable-next-line variable-name
let _id = 0
export function setting(config: Partial<typeof settings>) {
  Object.assign(settings, config)
}

export function actionCreatorFactory(prefix?: string) {
  if (prefix && settings.doNotUseSamePrefix) {
    if (cachedPrefixList.includes(prefix)) {
      throw Error(`Prefix [${prefix}] is already used.`)
    }
    cachedPrefixList.push(prefix)
  }
  if (settings.logPrefix) {
    // tslint:disable-next-line no-console
    console.log(`Success to used prefix! That is [${prefix}].`)
  }
  return <Payload = void>(type: FluxType): ActionCreator<Payload> => {
    let base = prefix ? `${prefix}/${type}` : type
    if (settings.addIdToSuffix) {
      _id++
      base = `${base}__${_id}`
    }
    if (settings.doNotCreateSameFluxType) {
      if (cachedFluxTypeList.includes(base)) {
        throw Error(`FluxType [${base}] is already used.`)
      }
      cachedFluxTypeList.push(base)
    }
    if (settings.logFluxType) {
      // tslint:disable-next-line no-console
      console.log(`Success to used FluxType! That is [${base}].`)
    }
    return Object.assign(
      (payload: Payload, options: Options): ImmutableFSA<Payload> => {
        return {
          type:
            options && options.namespace ? `${options.namespace}/${base}` : base,
          payload,
          error: options && options.error,
          meta: options && options.meta,
        }
      },
      {
        type: base,
      },
    ) as ActionCreator<Payload>
  }
}
