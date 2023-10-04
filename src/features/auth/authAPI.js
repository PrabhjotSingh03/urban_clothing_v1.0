import { isRejected } from "@reduxjs/toolkit";

export function createUser(userData) {
  return new Promise( async (resolve) =>{
    const response = await fetch('http://localhost:8000/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    const data = await response.json();
    resolve({data})
  }
  );
}

export function checkUser(loginInfo) {
  return new Promise( async (resolve,reject) =>{
    const email = loginInfo.email;
    const password = loginInfo.password;
    const response = await fetch('http://localhost:8000/users?email='+email);
    const data = await response.json();
    console.log({data});
    if(data.length){
      if(password===data[0].password){
        resolve({data:data[0]})
      }else{
        reject({message:'User not found'})
      }
    }else{
      reject({message:'User not found'})
    }
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