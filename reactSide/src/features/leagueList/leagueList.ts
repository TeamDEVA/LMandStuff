import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import LeagueList from '../../API/Page/leagueList';

export interface leagueListState {
  list:any;
}
// it is neccessary to define outside like this.
const initialState: leagueListState = {
  list:"this means nothing is fetched (for leagueList)"
};

export const leagueList = createSlice({
  name: 'leagueList',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setList: (state, action: PayloadAction<Array<any>>) => {
      state.list = action.payload;
    }
  },
});

export const {setList} = leagueList.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value`
// state.counter returns counter reducer
export const getList = (state: RootState) => state.ll.list;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const updateList =
  (thing:any): AppThunk =>
  async (dispatch, getState) => {
    //console.log("here");
    let leagueListGetter = new LeagueList();  
    let list = await leagueListGetter.getList(); 
    console.log("here", list);
    dispatch(setList(list)); 
  };

export default leagueList.reducer;

/*
export type ThunkAction<
  R, // Return type of the thunk function
  S, // state type used by getState (here it's root's state)
  E, // any "extra argument" injected into the thunk
  A extends Action // known types of actions that can be dispatched
> = (dispatch: ThunkDispatch<S, E, A>, getState: () => S, extraArgument: E) => R
*/
