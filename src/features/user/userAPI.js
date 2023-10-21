export function fetchUserOrders() {
  return new Promise( async (resolve) =>{
    const response = await fetch('/orders/uid/')
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise( async (resolve) =>{
    const response = await fetch('/users/'+update.id,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(update)
    })
    const data = await response.json();
    resolve({data})
  }
  );
}

export function fetchLoggedInUser() {
  return new Promise( async (resolve) =>{
    const response = await fetch('/users/uid');
    const data = await response.json()
    resolve({data})
  }
  );
}