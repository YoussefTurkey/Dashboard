const body = document.querySelector('body'),
      modeToggle = body.querySelector('.mode_toggle'),
      sideBar = body.querySelector('nav'),
      sideToggle = body.querySelector('.sidebar_toggle');
      
      //   Dark & Light Mode
let getMode = localStorage.getItem('mode');

if(getMode === 'dark'){
    body.classList.toggle('dark');
}

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if(body.classList.contains('dark')){
        localStorage.setItem('mode', 'dark');
    }else{
        localStorage.setItem('mode', 'light');
    }
});

    //   Sidebar Toggle 
let getStatus = localStorage.getItem('status');

if(getStatus === 'close'){
    sideBar.classList.toggle('close');
}

sideToggle.addEventListener('click', () => {
    sideBar.classList.toggle('close');
    if(sideBar.classList.contains('close')){
        localStorage.setItem('status', 'close');
    }else{
        localStorage.setItem('status', 'open');
    }
});


// ------- CRUD System --------
let title = document.getElementById('title'),
    name = document.getElementById('name'),
    count = document.getElementById('count'),
    category = document.getElementById('category'),
    submit = document.getElementById('submit');

let mood = 'Add Task';
var temp;


let dataProduct;
if(localStorage.Products != null){
    dataProduct = JSON.parse(localStorage.Products);
}
else{
    dataProduct = [];
}

    // Adding Products
submit.onclick = function(){
    let newProduct = {
        'Name' : name.value.toLowerCase(),
        'Title': title.value.toLowerCase(),
        'Count': count.value,
        'Category': category.value.toLowerCase()
    };

    if(title.value != ''){
        if(mood === 'Add Task'){
            if(newProduct.Count > 1){
                for(let i=0; i<newProduct.Count; i++){
                    dataProduct.push(newProduct);
                }
            }
            else{
                dataProduct.push(newProduct);
            }
        }
        else{
            dataProduct[temp] = newProduct;
            mood = 'Add Task';
            submit.innerHTML = 'Add Task';
            count.style.display = 'block';
        }
        clearData();
    }
    else{
        alert('Insert title for your new task, please!')
    }

    localStorage.setItem('Products', JSON.stringify(dataProduct));
    showData();
}

    // Clearing Inputs
function clearData(){
    name.title = title.value = count.value = category.value = '';
}

    // Diplaying data on Screen
function showData(){
    let tableProduct = '';

    for(let i=0; i< dataProduct.length; i++){
        tableProduct += `  <tr>
                        <td>${i+1}</td>
                        <td>${dataProduct[i].Name}</td>
                        <td>${dataProduct[i].Title}</td>
                        <td>${dataProduct[i].Category}</td>
                        <td><button onclick='updateProduct(${i})' id="update"><i class="uil uil-file-edit-alt"></i></button></td>
                        <td><button onclick='deleteProduct(${i})' id="deletePro"><i class="uil uil-trash-alt"></i></button></td>
                    </tr>` 
    }
    document.getElementById('tbody').innerHTML = tableProduct;

    let btnDeleteAll = document.getElementById('delete_All');
    if(dataProduct.length > 0){
        btnDeleteAll.innerHTML = `<button onclick='deleteAll()' id='delete'>Delete All Tasks (${dataProduct.length})</button>`;
    }
    else{
        btnDeleteAll.innerHTML =  '';
    }
}
showData();

    // Deleting item
function deleteProduct(index){
    dataProduct.splice(index, 1);
    localStorage.Products = JSON.stringify(dataProduct);
    showData();
}

    // Deleting All items
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

    // Updating Products 
function updateProduct(i){
    name.value = dataProduct[i].Name;
    title.value = dataProduct[i].Title;
    category.value = dataProduct[i].Category;
    count.style.display = 'none';
    submit.innerHTML = 'Update Task';
    mood = 'Update Task';
    temp = i;
    scroll({
        top: 0,
        behavior: 'smooth'
    })
}

    // Searching on Products
let searchMood = 'title';

function getSearchMood(id){

    let search = document.getElementById('search');

    if(id == 'searchTitle'){
        searchMood = 'title';
    }
    else{
        searchMood = 'task description';
    }
    search.placeholder = 'Search by ' + searchMood + '...';
    search.focus();
    search.value = '';
    showData();
}

function searchProduct(value){
    newTableProduct = '';
    for(let i=0;i<dataProduct.length;i++){
        if(searchMood == 'title'){
            if(dataProduct[i].Title.includes(value.toLowerCase())){
                newTableProduct += `  <tr>
                                        <td>${i+1}</td>
                                        <td>${dataProduct[i].Name}</td>
                                        <td>${dataProduct[i].Title}</td>
                                        <td>${dataProduct[i].Category}</td>
                                        <td><button onclick='updateProduct(${i})' id="update"><i class="uil uil-file-edit-alt"></i></button></td>
                                        <td><button onclick='deleteProduct(${i})' id="deletePro"><i class="uil uil-trash-alt"></i></button></td>
                                    </tr>`                 
            }
        }
        else{
            if(dataProduct[i].Category.includes(value.toLowerCase())){
                    newTableProduct += `  <tr>
                                            <td>${i+1}</td>
                                            <td>${dataProduct[i].Name}</td>
                                            <td>${dataProduct[i].Title}</td>
                                            <td>${dataProduct[i].Category}</td>
                                            <td><button onclick='updateProduct(${i})' id="update"><i class="uil uil-file-edit-alt"></i></button></td>
                                            <td><button onclick='deleteProduct(${i})' id="deletePro"><i class="uil uil-trash-alt"></i></button></td>
                                        </tr>`                 
            }
        }
    }
    
    document.getElementById('tbody').innerHTML = newTableProduct;
}