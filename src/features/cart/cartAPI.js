export function addProductToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchProductsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart");
    const data = await response.json();
    resolve({ data });
  });
}

export function updateCart(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + update.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(update),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function deleteProductFromCart(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cart/" + itemId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function cartReset() {
  return new Promise(async (resolve) => {
    const response = await fetchProductsByUserId();
    const items = response.data;
    for (let item of items) {
      await deleteProductFromCart(item.id);
    }
    resolve({status:"success"});
  });
}
