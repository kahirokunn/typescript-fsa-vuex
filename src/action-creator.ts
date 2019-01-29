import {
  FluxType,
  ImmutableFSA,
  Options,
  ActionCreator,
} from './types'

/**
 * Factory function for create ActionCreator
 * @param type
 */
export function actionCreator<Payload = void>(type: FluxType): ActionCreator<Payload> {
  return Object.assign(
    (payload: Readonly<Payload>, options: Options): ImmutableFSA<Payload> => {
      return {
        type:
          options && options.namespace ? `${options.namespace}/${type}` : type,
        payload,
        error: options && options.error,
        meta: options && options.meta,
      }
    },
    {
      type,
    },
  ) as ActionCreator<Payload>
}
