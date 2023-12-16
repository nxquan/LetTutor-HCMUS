import {colors} from '@/constants';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  rating: number;
  size?: number;
  interactive?: boolean;
  onChangeRating?: (rating: number) => void;
};

function RenderRating(props: Props) {
  const {rating, size, interactive, onChangeRating} = props;

  const render = () => {
    const _rating: number = Math.floor(rating);
    const decimal: number = rating - _rating;
    let isHalfStar: boolean = false;
    if (decimal >= 0.5) {
      isHalfStar = true;
    }

    const stars: any = [];
    for (let i = 1; i <= _rating; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          disabled={!interactive}
          onPress={() => onChangeRating && onChangeRating(i)}>
          <FontAwesome
            name="star"
            size={size}
            color={colors.yellow}
            style={{marginLeft: 6}}
          />
        </TouchableOpacity>,
      );
    }
    if (_rating < 5) {
      for (let i = _rating + 1; i <= 5; i++) {
        const _name =
          i === _rating + 1 && isHalfStar ? 'star-half-empty' : 'star-o';
        stars.push(
          <TouchableOpacity
            key={i}
            disabled={!interactive}
            onPress={() => onChangeRating && onChangeRating(i)}>
            <FontAwesome
              name={_name}
              size={size}
              color={colors.yellow}
              style={{marginLeft: 6}}
            />
          </TouchableOpacity>,
        );
      }
    }
    return stars;
  };
  return <View style={{flexDirection: 'row'}}>{render()}</View>;
}

export default RenderRating;
