export const searchProducts = async (id: number | null) => {
  const url = 'https://fakestoreapi.com/products';

  if (id) {
    try {
      const product = await fetch(`${url}/${id}`).then((res) => {
        if (!res.ok) {
          return []
        }
        return res.json();
      });
      return [product];
    } catch (error) {
      return [];
    }
  } else {
    try {
      const products = await fetch(`${url}?limit=3`).then((res) => {
        if (!res.ok) {
          return []
        }
        return res.json();
      });
      return products;
    } catch (error) {
      return [];
    }
  }
}

