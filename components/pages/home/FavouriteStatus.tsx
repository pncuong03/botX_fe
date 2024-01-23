import { useState, useEffect } from 'react';
import { useHomeHook } from './hooks';

type Props = {
  status: boolean;
  id: any;
};

const FavouriteStatus = ({ id, status }: Props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const { addToFavourite } = useHomeHook();
  const changeStatusFavourite = () => setIsFavourite(!isFavourite);

  useEffect(() => {
    setIsFavourite(status as boolean);
  }, [status]);

  return (
    <img
      src={isFavourite ? '/svg/heart-red.svg' : '/svg/heart-white.svg'}
      alt="heart"
      onClick={() => addToFavourite(id, isFavourite, changeStatusFavourite)}
    />
  );
};

export default FavouriteStatus;
