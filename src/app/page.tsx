'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdKeyboardDoubleArrowRight, MdSearch } from 'react-icons/md';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Divider, LoadingProducts, NewProduct, NoProducts, ProductController, ProductItem } from './components'
import { Product } from './interfaces';
import { useCartStore } from './store';
import { currencyFormat } from './utils';
import { searchProducts } from './service';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([])

  const { addProduct, cart, createdAt, getTotalPrice, getTotalItems } = useCartStore()
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const getProductsList = async () => {
    setLoadingProducts(true);
    const productsList = await searchProducts(Number(inputValue))
    setProducts(productsList);

    setTimeout(() => {
      setLoadingProducts(false);
    }, 1000);
  }

  useEffect(() => {
    setLoading(false);
    getProductsList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchProduct = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoadingProducts(true);
    const newProducts = await searchProducts(Number(inputValue))
    setProducts(newProducts);
    setLoadingProducts(false);
  }

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
        <div>
          <div className='page-title'>
            <div className="title-img">
              <Image src='/logo.png' width={42} height={42} alt='logo'></Image>
            </div>
            <span>El Topo - Shop</span>
          </div>
          <div className='div-container'>
            <div className="products-container">
              <div className='flex flex-row justify-between items-center'>
                <h2 className="title">
                  Products
                </h2>
                <form onSubmit={onSearchProduct} className="search-container">
                  <input type="number"
                    min={1}
                    className="product-input"
                    placeholder="ID"
                    value={inputValue}
                    max={20}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button type="submit">
                    <MdSearch size={20} />
                  </button>
                </form>
              </div>

              <Divider />

              <div className="items-container">
                {loadingProducts ?
                  <LoadingProducts />
                  :
                  (products.length > 0 ?
                    products.map((product, index) => (
                      <div key={index} className='flex flex-row justify-center items-center gap-2'>
                        <ProductItem product={product} setDragging={setDragging} onCart={false} />
                        <div className='add-product' onClick={() => addProduct(product)} >
                          <MdKeyboardDoubleArrowRight size={60} />
                        </div>
                      </div>
                    ))
                    :
                    <NoProducts />
                  )
                }
              </div>
            </div>

            <div
              className="cart-container"
              data-droppable={true}
              onDragOver={(e) => e.preventDefault()}
              onDrop={onDrop}
            >
              <div className='flex flex-row justify-between items-start'>
                <h2 className="title">
                  Cart
                </h2>
                {createdAt !== null &&
                  <span className='created-at'>
                    created at: {format(createdAt, 'dd/MM/yyyy HH:mm:ss', { locale: es })}
                  </span>
                }

              </div>

              <Divider />

              <div
                className="items-container"
              >
                {cart.map((product) => (
                  <div className="item-container" key={product.id}>
                    <ProductItem product={product} setDragging={() => { }} onCart={true} />
                    <ProductController quantity={product.quantity} id={product.id} />
                  </div>
                ))}
                {(dragging || cart.length == 0) && !loading &&
                  <NewProduct />
                }
                {loading &&
                  <LoadingProducts />
                }

                {cart.length > 0 &&
                  <div className="summary">
                    <div className="cart-total">
                      Products: <span>{getTotalItems()}</span>
                    </div>
                    <div className="cart-total">
                      Total: <span>{currencyFormat(getTotalPrice())}</span>
                    </div>
                  </div>

                }

              </div>

            </div>
          </div>
        </div>

      </main>

      <footer className="">
      </footer>
    </>
  );
}
