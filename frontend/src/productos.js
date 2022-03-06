
const lAMBDA_URL='https://pfcetve728.execute-api.us-east-1.amazonaws.com/'
const contenedorProductos=document.getElementById("contenedorProductos")
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
                                <a href="#" class="btn btn-primary">add to cart</a>
                                </div>
                            </div>
                        </div>`
    });
    contenedorProductos.innerHTML=productosGrid
}

const getProducts=async()=> await fetch( lAMBDA_URL+'getAllProducts',{
    mode: 'cors',
    credentials: 'include'
})
.then(async res => {
const data= await res.json();
mostrar(data.productos)
console.log(data.productos)
})
.catch(error => console.error(error))

getProducts();
