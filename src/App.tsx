import React, { useEffect, useState } from "react";
import ServicePanel from "./components/ServicePanel";
import {
  fetchUsers,
  fetchProducts,
  fetchOrders,
  User,
  Product,
  Order,
} from "./services/api";
import "./App.css";

interface LoadState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

function useServiceData<T>(
  fetcher: () => Promise<T[]>
): LoadState<T> {
  const [state, setState] = useState<LoadState<T>>({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    fetcher()
      .then((data) => {
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
          setState({ data: [], loading: false, error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

function App(): JSX.Element {
  const users = useServiceData<User>(fetchUsers);
  const products = useServiceData<Product>(fetchProducts);
  const orders = useServiceData<Order>(fetchOrders);

  return (
    <div className="App">
      <header className="App-header">
        <h1>CI/CD Demo Application</h1>
      </header>

      <main>
        <ServicePanel
          title="User Service"
          loading={users.loading}
          error={users.error}
        >
          <ul>
            {users.data.map((user) => (
              <li key={user.id}>
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        </ServicePanel>

        <ServicePanel
          title="Product Service"
          loading={products.loading}
          error={products.error}
        >
          <ul>
            {products.data.map((product) => (
              <li key={product.id}>
                {product.name} - {product.price}
              </li>
            ))}
          </ul>
        </ServicePanel>

        <ServicePanel
          title="Order Service"
          loading={orders.loading}
          error={orders.error}
        >
          <ul>
            {orders.data.map((order) => (
              <li key={order.id}>
                Order #{order.id}: user {order.userId}, product{" "}
                {order.productId}, qty {order.quantity}
              </li>
            ))}
          </ul>
        </ServicePanel>
      </main>
    </div>
  );
}

export default App;
