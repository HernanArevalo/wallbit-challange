'use client'
import { useState } from 'react';
import { Divider, NewProduct, ProductController, ProductItem } from './components'
import { Product } from "./interfaces";
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useCartStore } from './store';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function Home() {
  const products: Product[] = [
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts ",
      "price": 22.3,
      "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      "rating": {
        "rate": 4.1,
        "count": 259
      }
    },
    {
      "id": 3,
      "title": "Mens Cotton Jacket",
      "price": 55.99,
      "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      "category": "men's clothing",
      "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      "rating": {
        "rate": 4.7,
        "count": 500
      }
    }
  ]

  const { addProduct, cart, createdAt } = useCartStore()
  const [dragging, setDragging] = useState(false)

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const productData = e.dataTransfer.getData("application/json");

    if (productData) {
      const product = JSON.parse(productData);
      addProduct(product)
    }
  };

  return (
    <>
      <main>
        <div className="div-container">

          <div className="products-container">
            <h2 className="title">
              Products
            </h2>
            <div className="search-container">
              <input type="text" className="product-input" placeholder="ID" />
            </div>

            <Divider />

            <div className="items-container">
              {products.map((product) => (
                <div key={product.id} className='flex flex-row justify-center items-center gap-2'>
                  <ProductItem product={product} setDragging={setDragging} onCart={false} />
                  <div className='add-product' onClick={() => addProduct(product)} >
                    <MdKeyboardDoubleArrowRight size={30} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="cart-container"
          >
            <h2 className="title">
              Cart
            </h2>
            {createdAt !== null &&
              <span className='created-at'>
                created at: {format(createdAt, 'dd/MM/yyyy HH:mm:ss', { locale: es })}
              </span>
            }

            <Divider />

            <div
              className="items-container"
              data-droppable={true}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              {cart.map((product) => (
                <div className="item-container" key={product.id}>
                  <ProductItem product={product} setDragging={() => { }} onCart={true} />
                  <ProductController quantity={product.quantity} id={product.id} />
                </div>
              ))}
              {(dragging || cart.length == 0) &&
                <NewProduct />
              }

            </div>

          </div>
        </div>

      </main>
      <footer className="">

      </footer>
    </>
  );
}
