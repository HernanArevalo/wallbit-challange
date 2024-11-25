'use client'
import { FaMinusCircle, FaPlusCircle, FaTrash } from 'react-icons/fa';
import './styles.css'
import { useCartStore } from '@/app/store';

interface Props{
  quantity: number
  id: number
}
export const ProductController = ({quantity, id}:Props) => {

  const { removeProduct, addProductQuantity, removeProductQuantity } = useCartStore()

  return (
    <div className="buttons-container">
      <div className="delete-btn" onClick={()=>{removeProduct(id)}}>
        <FaTrash size={20} />
      </div>
      <div className="quantity-controller">
        <button className="" onClick={()=>{removeProductQuantity(id)}}><FaMinusCircle size={24} /></button>
        <span>{quantity}</span>
        <button className="" onClick={()=>{addProductQuantity(id)}}><FaPlusCircle size={24} /></button>
      </div>
    </div>
  )
}
