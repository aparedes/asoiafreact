import { appReducer } from './reducers/app';
import { houseReducer } from './reducers/housesReducer';

const rootReducer = {
  app: appReducer,
  houses: houseReducer,
};

export default rootReducer;
