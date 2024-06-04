import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/Cart.context";
import Loading from "../../Components/Loading/Loading";

export default function Cart() {
  const { cartInfo, removeProductFromCart, updateProductCount, clearCart } =
    useContext(cartContext);

  return (
    <>
      {cartInfo === null ? (
        <Loading />
      ) : (
        <section className="bg-slate-100 p-5">
          <h2 className="text-2xl font-bold mb-2">
            <span>Shop Cart</span>
            <i className="fa-solid fa-cart-shopping ml-2"></i>
          </h2>

          {cartInfo.length === 0 ? (
            <div className="py-16 flex flex-col justify-center items-center">
              <h3 className="text-lg">there are not items yet.</h3>
              <Link to="/" className="btn-primary text-sm mt-2">
                ADD YOUR FIRST PRODUCT TO CART
              </Link>
            </div>
          ) : (
            <>
              {cartInfo.data.products.map((product) => (
                <div
                  key={product._id}
                  className="product grid grid-cols-12 gap-5 mt-4"
                >
                  <div className="col-span-1">
                    <img
                      src={product.product.imageCover}
                      className="w-full"
                      alt=""
                    />
                  </div>
                  <div className="col-span-11 flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {product.product.title}
                      </h3>
                      <h4 className="text-primary">
                        Price: {product.price} L.E
                      </h4>
                      <button
                        onClick={() => {
                          removeProductFromCart({ id: product.product.id });
                        }}
                        className="btn-primary bg-red-500 text-sm mt-3"
                      >
                        <i className="fa-solid fa-trash-can mr-2"></i> Remove
                      </button>
                    </div>
                    <div className="flex gap-4 items-center">
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product.id,
                            count: product.count - 1,
                          });
                        }}
                        className="btn-primary"
                      >
                        <i className="fa-solid fa-minus"></i>
                      </button>
                      <span className="text-lg font-bold">{product.count}</span>
                      <button
                        onClick={() => {
                          updateProductCount({
                            id: product.product.id,
                            count: product.count + 1,
                          });
                        }}
                        className="btn-primary"
                      >
                        <i className="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={clearCart}
                className="btn-primary bg-red-500 block ms-auto mt-4"
              >
                Clear Cart
              </button>
            </>
          )}
        </section>
      )}

      <Link
        to="/checkout"
        className="btn-primary uppercase w-fit ms-auto block mt-3"
      >
        Next Step
      </Link>
    </>
  );
}
