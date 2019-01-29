export type FluxType = string

/**
 * Action conformed to ImmutableFSA
 */
export type ImmutableFSA<Payload = void> = {
  readonly type: FluxType;
  readonly payload: Readonly<Payload>;
  readonly error?: boolean;
  readonly meta?: any;
}

export type Options = Partial<{
  readonly namespace: string;
  readonly error: boolean;
  readonly meta: any;
}>

/**
 * Factory function for Action
 * ActionCreator also have action type
 *
 * @example
 * export const Login = actionCreator<string[]>("LOGIN");
 * Login(["foo", "bar"])
 */
export type ActionCreator<Payload = void> = {
  readonly type: FluxType;
  (payload: Payload, options?: Options): ImmutableFSA<Payload>;
} & (Payload extends void
  ? (payload?: Payload, options?: Options) => ImmutableFSA<Payload> : {})
