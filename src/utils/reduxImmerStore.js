import { createStore } from 'redux';
import produce from 'immer';

// magic 使用 immer 处理数据
const reducer = (state, action) => {
  if (action.fix) {
    const data = action.fix(state);
    if (data) {
      return data;
    }
  } else if (action.recipe) {
    return produce(state, action.recipe);
  }
  return state;
}

let store;

if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
  // 如果设备未安装插件调试
  store = createStore(
    reducer,
  );
} else {
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}

export default store;