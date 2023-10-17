export function fetchUserOrders(userid) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/orders/?user='+userid)
    const data = await response.json()
    resolve({data})
  }
  );
}

export function updateUser(update) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+update.id,{
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

export function fetchLoggedInUser(userid) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/users/'+userid)
    const data = await response.json()
    resolve({data})
  }
  );
}