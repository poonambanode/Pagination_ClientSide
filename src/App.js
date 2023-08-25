import "./styles.css";
import { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    let data = await res.json();
    if (data && data.products) setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const selectedPage = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= products.length / 10)
      setPage(selectedPage);
  };

  return (
    <div className="App">
      <div className="products">
        {products.length > 0 &&
          products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <div className="product__single">
                <img src={prod.thumbnail} alt={prod.title} />
                <div> {prod.title}</div>
              </div>
            );
          })}
      </div>
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination__disable"}
            onClick={() => selectedPage(page - 1)}
          >
            {" "}
            ◀️{" "}
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "pagination__selected" : ""}
                key={i}
                onClick={() => selectedPage(i + 1)}
              >
                {" "}
                {i + 1}{" "}
              </span>
            );
          })}
          <span
            className={page < products.length / 10 ? "" : "pagination__disable"}
            onClick={() => selectedPage(page + 1)}
          >
            {" "}
            ▶️{" "}
          </span>
        </div>
      )}
    </div>
  );
}
