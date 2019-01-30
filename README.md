typescript-fsa-vuex
---

This repository is forked from [vuex-typescript-fsa](https://github.com/sue71/vuex-typescript-fsa).

The helper function for inferring a combination of action/mutation and handler.

## Installation

```
npm install typescript-fsa-vuex
```

or

```
yarn add typescript-fsa-vuex
```

## Demo

![demo](https://github.com/sue71/vuex-typescript-fsa/blob/images/demo-01.gif)

## Usage

### Basic

```typescript
const actionCreator = actionCreatorFactory();
// The actionCreator is create immutable FSA
const Increment = actionCreator<number>("Increment");

// The below code will raise error!
// Increment(1).payload = 2
// The reason is actionCreator all field is readonly

const store = new Store<{ count: number }>({
  state: {
    count: 0
  },
  actions: combineAction(
    action(Increment, (context, action) => {
      context.commit(action);
    })
  ),
  mutations: combineMutation(
    mutation(Increment, (state, action) => {
      state.count = action.payload;
    })
  )
});

store.dispatch(Increment(10));
```

### Vuex modules system and namespaced true

```typescript
export type RootState = {
  counter: { count: number },
}

const actionCreator = actionCreatorFactory();
const Increment = actionCreator<number>("Increment");

const store = new Store<RootState>({
  modules: {
    namespaced: true,
    counter: {
      state: {
        count: 0
      },
      actions: combineAction<RootState["counter"]>(
        action(Increment, (context, action) => {
          context.commit(action);
        })
      ),
      mutations: combineMutation<RootState["counter"]>(
        mutation(Increment, (state, action) => {
          state.count = action.payload;
        })
      )
    }
  }
});

store.dispatch(Increment(1, { namespace: "counter" }));
```

### Vuex modules system and namespaced false
DX will resemble [typescript-fsa](https://github.com/aikoven/typescript-fsa)

```typescript
export type RootState = {
  counter: { count: number },
}

const actionCreator = actionCreatorFactory("counter");
const Increment = actionCreator<number>("Increment");

const store = new Store<RootState>({
  modules: {
    counter: {
      state: {
        count: 0
      },
      actions: combineAction(
        action(Increment, (context, action) => {
          context.commit(action);
        })
      ),
      mutations: combineMutation<RootState["counter"]>(
        mutation(Increment, (state, action) => {
          state.count = action.payload;
        })
      )
    }
  }
});

store.dispatch(Increment(1));
```

## Introduce some powerful helpers
actionsToMutations is help create your ActionTree.
That is more shorthand and simple and never mistake mapping to mutation.

```typescript
const a = actionCreator<number>('A')
const b = actionCreator<string>('B')
const store = new Store({
  actions: combineAction(
    actionsToMutations(a, b),
    // `actionsToMutations(a, b)` is same below code.
    // action(a, (context, action) => {
    //   context.commit(action);
    // }),
    // action(b, (context, action) => {
    //   context.commit(action);
    // }),
  ),
  mutations: combineMutation(
    mutation(a, (_, action) => {}),
    mutation(b, (_, action) => {}),
  ),
})
```

## Setting

```typescript
// setting for actionCreatorFactory
setting({
  doNotUseSamePrefix: true, // default false
  doNotCreateSameFluxType: true, // default false
  logPrefix: false, // default false
  logFluxType: false, // default false
  addIdToSuffix: false, // default false
})
```

## License

MIT
