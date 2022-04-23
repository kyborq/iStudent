import { add, sub } from 'date-fns';
import React, { useEffect, useRef } from 'react';
import { Dimensions, FlatList, View } from 'react-native';
import { WeekSelect } from './WeekSelect';

type Props = {
  selectedDate: Date | number;
  onChange?: (date: Date | number) => void;
};

export const WeekScroller = ({ onChange, selectedDate }: Props) => {
  const currentDate = new Date();

  const prevWeek = sub(selectedDate, { weeks: 1 });
  const nextWeek = add(selectedDate, { weeks: 1 });

  const ref = useRef<FlatList>(null);
  const { width } = Dimensions.get('window');

  useEffect(() => {
    ref.current &&
      ref.current?.scrollToIndex({
        index: 1,
        animated: false,
      });
  }, [selectedDate]);

  return (
    <View>
      <FlatList
        ref={ref}
        data={[prevWeek, selectedDate, nextWeek]}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        snapToAlignment="center"
        initialScrollIndex={1}
        onScrollToIndexFailed={(info) => {
          const wait = new Promise((resolve) => setTimeout(resolve, 500));
          wait.then(() => {
            ref.current?.scrollToIndex({
              index: info.index,
              animated: true,
            });
          });
        }}
        renderItem={(item) => (
          <WeekSelect
            date={item.item}
            currentDate={currentDate}
            selectedDate={selectedDate}
            onSelect={onChange}
          />
        )}
      />
    </View>
  );
};
