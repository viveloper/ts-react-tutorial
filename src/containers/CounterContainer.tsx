import React from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';

function CounterContainer() {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrease = () => dispatch(increase());
  const handleDecrease = () => dispatch(decrease());
  const handleIncreaseBy = (diff: number) => dispatch(increaseBy(diff));

  return (
    <Counter
      count={count}
      onIncrease={handleIncrease}
      onDecrease={handleDecrease}
      onIncreaseBy={handleIncreaseBy}
    />
  );
}

export default CounterContainer;
