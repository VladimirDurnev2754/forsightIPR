export interface ICardProps {
  title: string;
  img: string;
  price: number;
  isFavorite: boolean;
  onClickFavorite: () => void;
  onClickItem?: () => void;
}

export type ICartProps = {
  img: string;
  title: string;
  price: number;
  onClickDelete?: () => void;
};
