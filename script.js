document.addEventListener('DOMContentLoaded', function () {
    const signupSection = document.getElementById('signup-section');
    const loginSection = document.getElementById('login-section');

    // Signup form submission
    let signup = document.getElementById('signup-form');
    if (signup) {
        signup.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById('signup-username').value;
            const password = document.getElementById('signup-password').value;

            // Validate password length
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify({ username, password }));

            // Automatically switch to login form
            signupSection.classList.add('hidden');
            loginSection.classList.remove('hidden');

            // Pre-fill the login form with the signed-up username
            document.getElementById('login-username').value = username;
            document.getElementById('signup-form').reset();
        });
    }

    // Login form submission
    let login = document.getElementById('login-form');
    if (login) {
        login.addEventListener('submit', (a) => {
            a.preventDefault();
            const username = document.getElementById('login-username').value;
            const password = document.getElementById('login-password').value;

            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser && storedUser.username === username && storedUser.password === password) {
                alert('Login successful!');
                // Redirect to the admin or customer page
                window.location.href = 'admin.html'; // Change to customer.html for customer login
            } else {
                alert('Invalid username or password');
            }

            document.getElementById('login-form').reset();
        });
    }

    // Load categories into the item form select
    function populateCategoriesSelect() {
        const itemCategorySelect = document.getElementById('item-category');
        if (itemCategorySelect) {
            itemCategorySelect.innerHTML = '';
            const categories = JSON.parse(localStorage.getItem('categories')) || [];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                itemCategorySelect.appendChild(option);
            });
        }
    }

    // Admin: Add category
    // try {
    //     document.getElementById('category-form')?.addEventListener('submit', function (e) {
    //         e.preventDefault();
    //         const categoryName = document.getElementById('category-name').value;
    //         const categories = JSON.parse(localStorage.getItem('categories')) || [];
    //         categories.push(categoryName);
    //         localStorage.setItem('categories', JSON.stringify(categories));
    //         updateCategoriesList();
    //         populateCategoriesSelect();
    //         document.getElementById('category-form').reset();
    //     });
    
    //     function updateCategoriesList() {
    //         const categoriesList = document.getElementById('categories-list');
    //         if (categoriesList) {
    //             categoriesList.innerHTML = '';
    //             const categories = JSON.parse(localStorage.getItem('categories')) || [];
    //             categories.forEach(category => {
    //                 const li = document.createElement('li');
    //                 li.textContent = category;
    //                 categoriesList.appendChild(li);
    //             });
    //         }
    //     }
    // } catch (error) {
        
    // }

    // Admin: Add item
    document.getElementById('item-form')?.addEventListener('submit', function (e) {
        e.preventDefault();
        const itemName = document.getElementById('item-name').value;
        const itemDescription = document.getElementById('item-description').value;
        const itemPrice = document.getElementById('item-price').value;
        const itemCategory = document.getElementById('item-category').value;
        const itemImage = document.getElementById('item-image').files[0];
        const reader = new FileReader();
        reader.onloadend = function () {
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push({
                name: itemName,
                description: itemDescription,
                price: itemPrice,
                category: itemCategory,
                image: reader.result
            });
            localStorage.setItem('items', JSON.stringify(items));
            alert('Item added successfully! Redirecting to customer page...');
            window.location.href = 'customer.html';
        };
        reader.readAsDataURL(itemImage);

        document.getElementById('item-form').reset();
    });

    function updateItemsList() {
        const itemsList = document.getElementById('items-list');
        if (itemsList) {
            itemsList.innerHTML = '';
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - ${item.description} - Rs${item.price}`;
                itemsList.appendChild(li);
            });
        }
    }

    // Load data on page load
    if (document.getElementById('categories-list')) {
        updateCategoriesList();
        populateCategoriesSelect();
        updateItemsList();
    }

    // Customer: Display items
    if (document.getElementById('menu-list')) {
        const menuList = document.getElementById('menu-list');
        const items = JSON.parse(localStorage.getItem('items')) || [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
            <div class="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl">
            <img src="${item.image}" alt="${item.name}" style="width: 200px; height: 150px; object-fit: cover;">
      
        <div class="flex flex-col gap-4">
          <div class="flex flex-row justify-between">
            <div class="flex flex-col">
              <span class="text-xl font-bold">${item.name}</span>
              <p class="text-xs text-gray-700">${item.description}</p>
            </div>
            <span class="font-bold  text-red-600">$${item.price}.00</span>
          </div>
          <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
        </div>
      </div>
            `;
            menuList.appendChild(li);
        });
    }

    // Customer: Add to cart
    window.addToCart = function (name, price) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push({ name, price });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartList();
    }

    // Customer: Update cart list
    function updateCartList() {
        const cartList = document.getElementById('cart-list');
        if (cartList) {
            cartList.innerHTML = '';
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - Rs${item.price}`;
                cartList.appendChild(li);
            });
        }
    }

    // Load cart on page load
    if (document.getElementById('cart-list')) {
        updateCartList();
    }
});




let home = document.getElementById('home');
home.addEventListener("click",function(){
    location.href  = "admin.html"
})

let cart = document.getElementById('cart');
cart.addEventListener("click",function(){
    location.href  = "customer.html"
})