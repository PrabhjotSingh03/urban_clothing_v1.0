export function fetchProductById(id) {
  return new Promise(async(resolve) =>{
    const response = await fetch('/products/' + id);
    const data = await response.json();
    resolve({data});
  }
  );
}

export function fetchProductsByFilters(filter, sort, pagination, admin) {
  let queryString = '';
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length){
      const lastCategoryValue = categoryValues[categoryValues.length-1];
      queryString += `${key}=${lastCategoryValue}&`
    }
  }

  if(admin){
    queryString += `admin=true`;
  }

  for(let key in sort){
    queryString += `${key}=${sort[key]}&`
  }

  for(let key in pagination){
    queryString += `${key}=${pagination[key]}&`
  }


  return new Promise(async(resolve) =>{
    const response = await fetch('/products?' + queryString);
    const data = await response.json();
    const totalItems = await response.headers.get('X-Total-Count');
    resolve({data:{products:data,totalItems:+totalItems}});
  }
  );
}

export function fetchCategories() {
  return new Promise(async(resolve) =>{
    const response = await fetch('/categories')
    const data = await response.json();
    resolve({data});
  }
  );
}
export function fetchBrands() {
  return new Promise(async(resolve) =>{
    const response = await fetch('/brands')
    const data = await response.json();
    resolve({data});
  }
  );
}

export function productCreate(product) {
  return new Promise(async(resolve) =>{
    const response = await fetch('/products/',{
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
    const response = await fetch("/products/" + update.id, {
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