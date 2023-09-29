export function createUser(userData) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json()
    resolve({data})
  }
  );
}
