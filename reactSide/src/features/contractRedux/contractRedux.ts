import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import LeagueList from '../../API/Page/leagueList';

export interface contractReduxState {
  contract:any;
}
// it is neccessary to define outside like this.
const initialState: contractReduxState = {
  contract:"no contract is loaded"
};

export const ContractRedux = createSlice({
  name: 'ContractRedux',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateContract: (state, action:any) => {
        state.contract = action.payload;
      }
  },
});

export const {updateContract} = ContractRedux.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value`
// state.counter returns counter reducer
export const getContract = (state: RootState) => state.contractRedux.contract;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const connectContract =
  (thing:any): AppThunk =>
  async (dispatch, getState) => {
    let metamask = new Metamask();  
    await metamask.connectToMetamask(); //promt the metamask windows 
    dispatch(updateContract(metamask.contract)); 
  };

export default ContractRedux.reducer;

/*
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState (here it's root's state)
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
*/
