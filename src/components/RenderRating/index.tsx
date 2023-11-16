import {colors} from '@/constants';
import {View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

type Props = {
  rating: number;
  size?: number;
};

function RenderRating(props: Props) {
  const {rating, size} = props;

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
        <FontAwesome
          key={i}
          name="star"
          size={size}
          color={colors.yellow}
          style={{marginLeft: 6}}
        />,
      );
    }
    if (_rating < 5) {
      for (let i = _rating + 1; i <= 5; i++) {
        const _name =
          i === _rating + 1 && isHalfStar ? 'star-half-empty' : 'star-o';
        stars.push(
          <FontAwesome
            key={i}
            name={_name}
            size={size}
            color={colors.yellow}
            style={{marginLeft: 6}}
          />,
        );
      }
    }
    return stars;
  };
  return <View style={{flexDirection: 'row'}}>{render()}</View>;
}

export default RenderRating;
