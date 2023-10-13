export function createOrder(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchAllOrders(sort, pagination) {
  let queryString = "";

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders?" + queryString);
    const data = await response.json();
    const totalOrders = await response.headers.get("X-Total-Count");
    resolve({ data: { orders: data, totalOrders: +totalOrders } });
  });
}

export function orderUpdate(order) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/orders/" + order.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    resolve({ data });
  });
}
