'use client'
import { Product } from '../../interfaces';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import './styles.css'
import { currencyFormat } from '@/app/utils';

interface Props{
  product: Product,
  setDragging: (arg9:boolean)=>void,
  onCart: boolean
}
export const ProductItem = ({ product, setDragging, onCart }: Props) => {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("application/json", JSON.stringify(product));
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
        <div className="product-id">
          ID: {product.id}
        </div>
        <h3 className="product-title">
          {product.title}
        </h3>
        <div className="price-rate">
          <div className="product-price">
            {currencyFormat(product.price)}
          </div>
          <div className="product-rate">
            <FaStar /> {product.rating.rate}
          </div>
        </div>
      </div>
      <div className="product-image">
        <Image src={product.image} 
               alt={product.title} 
               height={80} 
               width={80} 
               draggable={false} />
      </div>
    </div>
  );
};
