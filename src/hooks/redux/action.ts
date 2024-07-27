import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { laureatesActions } from '../../entities/laureates/slice';
import { nobelPrizesActions } from '../../entities/prizes/slice';
const actions = {
  ...laureatesActions,
  ...nobelPrizesActions
};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
