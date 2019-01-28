typescript-fsa-vuex
---

The helper function for inferring a combination of action/mutation and handler.
This repository is forked from [vuex-typescript-fsa](https://github.com/sue71/vuex-typescript-fsa).

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
const Increment = actionCreator<number>("Increment");

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

## Debug Mode

```typescript
// debugSetting for actionCreatorFactory
debugSetting({
  doNotUseSamePrefix: true, // default false
  doNotCreateSameFluxType: true, // default false
  logPrefix: false, // default false
  logFluxType: false, // default false
})
```


## License

MIT
