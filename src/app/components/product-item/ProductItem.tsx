'use client'
import { Product } from '../../interfaces';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import './styles.css'

interface Props{
  product: Product,
  setDragging: (arg9:boolean)=>void,
  onCart: boolean
}
export const ProductItem = ({ product, setDragging, onCart }: Props) => {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(product));
    console.log("Dragging:", product.title);
    setDragging(true);
  };

  const onDragEnd = () => {
    setDragging(false);
  };

  return (
    <div
      className="product-item"
      draggable={!onCart}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="product-data">
        <div className="product-id">id: {product.id}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rate">
          <FaStar /> {product.rating.rate}
        </div>
      </div>
      <div className="product-image">
        <Image src={product.image} alt={product.title} height={64} width={64} draggable={false} />
      </div>
    </div>
  );
};
