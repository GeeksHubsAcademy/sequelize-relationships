const mainContainer =document.querySelector('main');
const addFunkoForm = () => {
    mainContainer
        .innerHTML = `
    <form class="addProduct">
        <input required type="text" name="name"  placeholder="Introduce el nombre">
        <input required type="number" name="price" 
        min="0"
        step="0.01" placeholder="Introduce el precio">
        <select name="CategoryId" title="Seleccione categoría">
        <option value="default"> Seleccione una categoría</option>
        <option value="1">Marvel</option>
        <option value="2">Harry Potter</option>
        </select>
        <input required type="text" name="image_path" placeholder="Introduzca ruta de la imagen">
        <label for="disponible">Disponible:</label>
        <input required type="checkbox" name="disponible" id="disponible">
        <button type="submit">Añadir Funko</button>
    </form>
    `
    document.querySelector('.addProduct')
    .addEventListener('submit',event=>{
        event.preventDefault();
        console.log(event.target.price)
        const funko={
            name:event.target.name.value,
            price: +event.target.price.value,
            CategoryId: +event.target.CategoryId.value,
            image_path:event.target.image_path.value,
            disponible:event.target.disponible.checked,
        }
        console.log(funko);
        axios.post('http://localhost:3000/products',funko)
        .then(res=>{
            console.log(res.data)
            const message =document.createElement('h3')
            message.innerText=res.data.message
            mainContainer.appendChild(message)
            // mainContainer.innerHTML+=`
            // <h3> ${res.data.message}</h3>
            // `
            setTimeout(() => {
                message.remove();
            }, 2000);
        })
    })
}
const renderFunkos = () => {
    axios.get('http://localhost:3000/products')
        .then(res => {
            const products = res.data
            mainContainer.innerHTML='';
            products.forEach(product => {
                mainContainer.innerHTML += `
        <div class="product">
            <h3>${product.name}</h3>
            <h5>${product.price} €</h5>
            <img src="${product.image_path}" alt="imagen">
        </div>
        `
            })
        })
}
renderFunkos();