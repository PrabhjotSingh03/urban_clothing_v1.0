import { isRejected } from "@reduxjs/toolkit";

export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function checkUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    // const email = loginInfo.email;
    // const password = loginInfo.password;
    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
    // const data = await response.json();
    // console.log({data});
    // if(data.length){
    //   if(password===data[0].password){
    //     resolve({data:data[0]})
    //   }else{
    //     reject({message:'User not found'})
    //   }
    // }else{
    //   reject({message:'User not found'})
    // }
  });
}

export function signOut(userId) {
  return new Promise(async (resolve) => {
    resolve({ data: "successfully signed out" });
  });
}
