const lAMBDA_URL = "https://pfcetve728.execute-api.us-east-1.amazonaws.com/"; //lambda endpoint
const contenedorProductos = document.getElementById("contenedorProductos"); //products contanter
const contenedorCategorias = document.getElementById("contenedorCat"); //categories contanter
let categoriasDropdown = ""; //listed categories
let productosGrid = ""; //listed products

//function to show products that receive in array
const mostrar = (productos) => {
  productos.forEach((producto) => {
    //add html card for each product
    productosGrid += `<div class="container-fluid col"> 
                            <div class="card mt-3 mb-3" style="width: 300px;">
                                <img src="${
                                  producto.url_image
                                }" class="card-img-top" width="300" height="300"alt="  Upps error en carga"/>
                                <div class="card-body"style="height: 160px;">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">Precio: $ ${producto.price}
                                ${
                                  producto.discount !== 0
                                    ? `<span class="discount">-${producto.discount}</span>`
                                    : ``
                                }
                                </p>
                                <a href="#" class="btn btn-dark">add to cart</a>
                                </div>
                            </div>
                        </div>`;
  });
  //actualize the products in frontend
  contenedorProductos.innerHTML = productosGrid;
};
//function to show categories in navbar category filter
const mostrarCat = (categorias) => {
  categorias.forEach((categoria) => {
    //add html <li> with category
    categoriasDropdown += `<li onclick="filterByCategory(event,this.id)" id="${categoria.id}"><a class="dropdown-item" href="#">${categoria.name}</a></li>`;
  });
  //actualize categories in dropdown menu
  contenedorCategorias.innerHTML = categoriasDropdown;
};

//function to fetch all products from lambda function in backend
const getProducts = async () =>
  await fetch(lAMBDA_URL + "getAllProducts")
    .then(async (res) => {
      //parse the response to json
      const data = await res.json();
      //set value of "Productos mostrados to all products"
      productosMostrados = data.productos;
      mostrar(data.productos);
    })
    .catch((error) => console.error(error));
getProducts();

//function to get all categories drom lambda function in backend
const getCategories = async () =>
  await fetch(lAMBDA_URL + "getAllCategories")
    .then(async (res) => {
      //parse the response to json
      let data = await res.json();
      mostrarCat(data.categorias);
    })
    .catch((error) => console.error(error));
getCategories();

//function to get products filter with "search" value from lambda function in backend
async function productsLike(event) {
  //prevent recharge page
  event.preventDefault();
  //select filter value in input
  let search = document.getElementById("search").value;
  //request options
  const requestOptions = {
    method: "POST",
    credentials: "include",
    origin: true,
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ like: search }),
  };
  //fetch prducts with finter
  await fetch(lAMBDA_URL + "getProductsLike", requestOptions)
    .then(async (res) => {
      //parse resquest data to json
      data = await res.json();
      //restart products in grid
      productosGrid = "";
      //set value of "Productos mostrados to filter products"
      productosMostrados = data.productos;
      mostrar(data.productos);
    })
    .catch((error) => {
      console.error(error);
    });
}
//funtion to filter by category from navbar category dropdown-menu
const filterByCategory = (event, id) => {
  //prevent recharge page
  event.preventDefault();
  //reset products grid
  productosGrid = "";
  //call mostrar with filtered by category products
  mostrar(productosMostrados.filter((producto) => producto.category == id));
};
