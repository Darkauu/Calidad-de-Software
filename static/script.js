// Array para almacenar usuarios
let users = [];
let userIdCounter = 1;

// Referencias a elementos del DOM
const userForm = document.getElementById('userForm');
const usersList = document.getElementById('usersList');
const userCount = document.getElementById('count');
const clearAllBtn = document.getElementById('clearAll');

// Función para generar ID único
function generateUserId() {
    return userIdCounter++;
}

// Función para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Función para agregar usuario
function addUser(userData) {
    if (!isValidEmail(userData.email)) {
        alert('Por favor, ingresa un email válido');
        return false;
    }

    // Verificar si el email ya existe
    if (users.some(user => user.email === userData.email)) {
        alert('Este email ya está registrado');
        return false;
    }

    const newUser = {
        id: generateUserId(),
        firstName: userData.firstName.trim(),
        lastName: userData.lastName.trim(),
        email: userData.email.trim().toLowerCase(),
        phone: userData.phone.trim(),
        age: userData.age || '',
        registeredAt: new Date().toLocaleDateString('es-ES')
    };

    users.push(newUser);
    updateUsersList();
    updateUserCount();
    return true;
}

// Función para eliminar usuario
function deleteUser(userId) {
    if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
        users = users.filter(user => user.id !== userId);
        updateUsersList();
        updateUserCount();
    }
}

// Función para actualizar la lista de usuarios
function updateUsersList() {
    if (users.length === 0) {
        usersList.innerHTML = '<p class="text-gray-500 text-center py-8">No hay usuarios registrados</p>';
        clearAllBtn.disabled = true;
        return;
    }

    clearAllBtn.disabled = false;

    usersList.innerHTML = users.map(user => `
                <div class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-200">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h3 class="font-semibold text-gray-800">
                                ${user.firstName} ${user.lastName}
                            </h3>
                            <p class="text-sm text-gray-600 mt-1">
                                <span class="font-medium">Email:</span> ${user.email}
                            </p>
                            ${user.phone ? `
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Teléfono:</span> ${user.phone}
                                </p>
                            ` : ''}
                            ${user.age ? `
                                <p class="text-sm text-gray-600">
                                    <span class="font-medium">Edad:</span> ${user.age} años
                                </p>
                            ` : ''}
                            <p class="text-xs text-gray-500 mt-2">
                                Registrado: ${user.registeredAt}
                            </p>
                        </div>
                        <button onclick="deleteUser(${user.id})"
                                class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition duration-200">
                            Eliminar
                        </button>
                    </div>
                </div>
            `).join('');
}

// Función para actualizar el contador
function updateUserCount() {
    userCount.textContent = users.length;
}

// Función para limpiar todos los usuarios
function clearAllUsers() {
    if (users.length === 0) return;

    if (confirm(`¿Estás seguro de que quieres eliminar todos los ${users.length} usuarios?`)) {
        users = [];
        userIdCounter = 1;
        updateUsersList();
        updateUserCount();
    }
}

// Event Listeners
userForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const userData = {
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        age: formData.get('age')
    };

    if (addUser(userData)) {
        this.reset(); // Limpiar el formulario
        alert('Usuario registrado exitosamente');
    }
});

clearAllBtn.addEventListener('click', clearAllUsers);

// Inicializar la aplicación
updateUsersList();
updateUserCount();
