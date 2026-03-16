// Esperamos a que todo el HTML esté cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', () => {

    // Referencias a los campos del formulario
    const cardNumberInput = document.getElementById('cardNumber');
    const cardHolderInput = document.getElementById('cardHolder');
    const cardExpiryInput = document.getElementById('cardExpiry');
    const cardCvvInput = document.getElementById('cardCvv');

    // Referencias a los textos visuales en la tarjeta
    const cardNumberDisplay = document.getElementById('card-number-display');
    const cardHolderDisplay = document.getElementById('card-holder-display');
    const cardExpiryDisplay = document.getElementById('card-expiry-display');
    const cardCvvDisplay = document.getElementById('card-cvv-display');

    // Referencia al contenedor que rota
    const cardInner = document.getElementById('cardInner');

    // 1. Actualizar el Número de Tarjeta
    cardNumberInput.addEventListener('input', (e) => {
        // Obtenemos el valor y le quitamos espacios para formatearlo
        let inputVal = e.target.value.replace(/\s+/g, '');

        // Expresión para agregar un espacio cada 4 números
        let formattedVal = inputVal.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = formattedVal; // Actualiza el campo input

        // Si está vacío, muestra los símbolos por defecto
        cardNumberDisplay.innerText = formattedVal === '' ? '#### #### #### ####' : formattedVal;
    });

    // 2. Actualizar el Titular
    cardHolderInput.addEventListener('input', (e) => {
        let val = e.target.value.toUpperCase();
        cardHolderDisplay.innerText = val === '' ? 'NOMBRE APELLIDO' : val;
    });

    // 3. Actualizar Expiración
    cardExpiryInput.addEventListener('input', (e) => {
        let val = e.target.value;
        // Agrega automáticamente la diagonal al mes
        if (val.length === 2 && !val.includes('/')) {
            e.target.value = val + '/';
            val = val + '/';
        }
        cardExpiryDisplay.innerText = val === '' ? 'MM/YY' : val;
    });

    // 4. Actualizar CVV
    cardCvvInput.addEventListener('input', (e) => {
        let val = e.target.value;
        cardCvvDisplay.innerText = val === '' ? '***' : val;
    });

    // 5. Voltear la Tarjeta al enfocar el CVV
    cardCvvInput.addEventListener('focus', () => {
        // Añadimos la clase CSS que hace el giro de 180 grados
        cardInner.classList.add('is-flipped');
    });

    cardCvvInput.addEventListener('blur', () => {
        // Quitamos la clase para regresar al frente cuando salimos del campo
        cardInner.classList.remove('is-flipped');
    });

});