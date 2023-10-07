export function fetchUserOrders(userid) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/orders/?user.id='+userid)
    const data = await response.json()
    resolve({data})
  }
  );
}
