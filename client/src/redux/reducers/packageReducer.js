import { GET_PACKAGES } from 'src/redux/actions/types';

const initialState = {
  packages: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PACKAGES:
      return {
        ...state,
        packages: action.data,
      };
    default:
      return state;
  }
}
