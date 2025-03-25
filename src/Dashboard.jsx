import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import Order from "./Order";

let getPreviousOrders = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === true);
};
let getCart = (orders) => {
  return orders.filter((ord) => ord.isPaymentCompleted === false);
};

let Dashboard = () => {
  let [orders, setOrders] = useState([]);
  let userContext = useContext(UserContext);
  useEffect(() => {
    document.title = "Dashboard - eCommerce";

    (async () => {
      let ordersResponse = await fetch(
        `http://localhost:5000/orders?userid=${userContext.user.currentUserId}`,
        { method: "GET" }
      );
      if (ordersResponse.ok) {
        let ordersResponseBody = await ordersResponse.json();
        //Getting all products
        let productsResponse = await fetch(`http://localhost:5000/products`, {
          method: "GET",
        });
        if (productsResponse.ok) {
          let productsResponseBody = await productsResponse.json();

          ordersResponseBody.forEach((order) => {
            order.product = productsResponseBody.find(
              (prod) => prod.id == order.productId
            );
          });
          setOrders(ordersResponseBody);
        }
      }
    })();
  }, [userContext.user.currentUserId]);
  return (
    <div className="row">
      <div className="col-12 py-3 header">
        <h4>
          <i className="fa fa-dashboard"></i> Dashboard
        </h4>
      </div>
      <div className="col-12">
        <div className="row">
          {/* previous orders starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-info border-bottom border-info">
              <i className="fa fa-history"></i> Previous Orders{" "}
              <span className="badge badge-info">
                {getPreviousOrders(orders).length}
              </span>
            </h4>
            {getPreviousOrders(orders).length === 0 ? (
              <div className="text-danger"> No Orders </div>
            ) : (
              ""
            )}

            {getPreviousOrders(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={
                    ord.product ? ord.product.productName : "Unknown Product"
                  }
                  price={ord.product ? ord.product.price : "N/A"}
                />
              );
            })}
          </div>
          {/* previous orders ends*/}

          {/* cart starts*/}
          <div className="col-lg-6">
            <h4 className="py-2 my-2 text-primary border-bottom border-primary">
              <i className="fa fa-shopping-cart"></i> Cart{" "}
              <span className="badge badge-primary">
                {getCart(orders).length}
              </span>
            </h4>

            {getCart(orders).length === 0 ? (
              <div className="text-danger">No products in your cart</div>
            ) : (
              ""
            )}

            {getCart(orders).map((ord) => {
              return (
                <Order
                  key={ord.id}
                  orderId={ord.id}
                  productId={ord.productId}
                  userId={ord.userId}
                  isPaymentCompleted={ord.isPaymentCompleted}
                  quantity={ord.quantity}
                  productName={
                    ord.product ? ord.product.productName : "Unknown Product"
                  }
                  price={ord.product ? ord.product.price : "N/A"}
                />
              );
            })}
          </div>
          {/* cart ends*/}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
