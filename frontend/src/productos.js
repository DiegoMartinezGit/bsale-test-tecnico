
const lAMBDA_URL='https://pfcetve728.execute-api.us-east-1.amazonaws.com/'
const contenedorProductos=document.getElementById("contenedorProductos")
const contenedorCategorias=document.getElementById("contenedorCat")
let categoriasDropdown=''
let productosGrid=''

const mostrar= (productos)=>{
    
    productos.forEach(producto => {
        productosGrid+= `<div class="container-fluid col"> 
                            <div class="card mt-3 mb-3" style="width: 300px;">
                                <img src="${producto.url_image}" class="card-img-top" width="300" height="300"alt="  Upps error en carga"/>
                                <div class="card-body"style="height: 160px;">
                                <h5 class="card-title">${producto.name}</h5>
                                <p class="card-text">Precio: $ ${producto.price}
                                ${producto.discount !==0? `<span class="discount">-${producto.discount}</span>`:``}
                                </p>
                                <a href="#" class="btn btn-dark">add to cart</a>
                                </div>
                            </div>
                        </div>`
    });
    contenedorProductos.innerHTML=productosGrid
}
const mostrarCat= (categorias)=>{
    categorias.forEach(categoria => {
        categoriasDropdown+= `<li onclick="filterByCategory(event,this.id)" id="${categoria.id}"><a class="dropdown-item" href="#">${categoria.name}</a></li>`
    });
    contenedorCategorias.innerHTML=categoriasDropdown
}

const getProducts=async()=> await fetch( lAMBDA_URL+'getAllProducts')
.then(async res => {
const data= await res.json();
productosMostrados=data.productos
mostrar(data.productos)
console.log(data.productos)
})
.catch(error => console.error(error))
getProducts();


const getCategories=async()=> await fetch( lAMBDA_URL+'getAllCategories')
.then(async res => {
let data= await res.json();

mostrarCat(data.categorias)
console.log(data.categorias)
})
.catch(error => console.error(error))
getCategories();

async function productsLike(event){
    event.preventDefault();
    let search=document.getElementById("search").value;
    const requestOptions={
        method: 'POST',
        credentials: "include",
        origin: true,
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({like: search})
    };
    console.log("buscando",search)
    
    await fetch( lAMBDA_URL+'getProductsLike',requestOptions)
    .then(async res => {
    data= await res.json();
    productosGrid=''
    productosMostrados=data.productos
    console.log(data.productos)
    mostrar(data.productos)
    })
    .catch(error =>{
        console.error(error) 
    } )
}

 const filterByCategory=(event,id)=>{
    event.preventDefault();
    productosGrid=''
    mostrar(productosMostrados.filter(producto=>producto.category==id))
}