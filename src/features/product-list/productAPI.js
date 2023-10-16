export function fetchAllProducts() {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products');
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products/' + id);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilters(filter,sort,pagination) {
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products?' + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/categories')
    const data = await response.json();
    resolve({data});
  }
  );
}
export function fetchBrands() {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/brands')
    const data = await response.json();
    resolve({data});
  }
  );
}

export function productCreate(product) {
  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products/',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });
    const data = await response.json();
    resolve({data});
  }
  );
}

export function productUpdate(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/products/" + update.id, {
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