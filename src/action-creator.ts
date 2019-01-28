export type FluxType = string;

/**
 * Action conformed to FSA
 */
export type FSA<Payload = void> = {
  readonly type: FluxType;
  payload: Payload;
  error?: boolean;
  meta?: any;
}

export type Options = {
  namespace?: string;
  error?: boolean;
  meta?: any;
}


/**
 * Factory function for Action
 * ActionCreator also have action type
 *
 * @example
 * export const Login = actionCreator<string[]>("LOGIN");
 * Login(["foo", "bar"])
 */
export type ActionCreator<Payload = void> = {
  type: FluxType;
  (payload: Payload, options?: Options): FSA<Payload>;
} & (Payload extends void
  ? {
  /**
   * Creates action with given payload and metadata.
   *
   * @param payload Action payload.
   * @param meta Action metadata. Merged with `commonMeta` of Action Creator.
   */
  (payload?: Payload, options?: Options): FSA<Payload>;
} : {})

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreator<Payload = void>(type: FluxType): ActionCreator<Payload> {
  return Object.assign(
    (payload: Payload, options: Options): FSA<Payload> => {
      return {
        type:
          options && options.namespace ? `${options.namespace}/${type}` : type,
        payload,
        error: options && options.error,
        meta: options && options.meta
      };
    },
    {
      type
    }
  ) as ActionCreator<Payload>;
}

const debugSettings = {
  doNotUseSamePrefix: false,
  doNotCreateSameFluxType: false,
  logPrefix: false,
  logFluxType: false,
}
const cachedPrefixList: string[] = []
const cachedFluxTypeList: string[] = []
export function debugSetting(settings: typeof debugSettings) {
  Object.assign(debugSettings, settings)
}

export function actionCreatorFactory(prefix?: string) {
  if (prefix && debugSettings.doNotUseSamePrefix) {
    if (cachedPrefixList.includes(prefix)) {
      throw Error(`Prefix [${prefix}] is already used.`)
    }
    cachedPrefixList.push(prefix)
  }
  if (debugSettings.logPrefix) {
    console.log(`Success to used prefix! That is [${prefix}].`)
  }
  return <Payload = void>(type: FluxType): ActionCreator<Payload> => {
    const base = prefix ? `${prefix}/${type}` : type
    if (debugSettings.doNotCreateSameFluxType) {
      if (cachedFluxTypeList.includes(base)) {
        throw Error(`FluxType [${base}] is already used.`)
      }
      cachedFluxTypeList.push(base)
    }
    if (debugSettings.logFluxType) {
      console.log(`Success to used FluxType! That is [${base}].`)
    }
    return Object.assign(
      (payload: Payload, options: Options): FSA<Payload> => {
        return {
          type:
            options && options.namespace ? `${options.namespace}/${base}` : base,
          payload,
          error: options && options.error,
          meta: options && options.meta
        };
      },
      {
        type: base,
      }
    ) as ActionCreator<Payload>;
  }
}
