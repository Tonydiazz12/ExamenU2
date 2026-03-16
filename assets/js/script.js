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

// 3. Actualizar Expiración y Validar
    cardExpiryInput.addEventListener('input', (e) => {
        const errorText = document.getElementById('expiry-error');

        // SOLUCIÓN AL MÓVIL: Si el usuario está borrando texto, dejamos que borre de forma natural y salimos de la función
        if (e.inputType === 'deleteContentBackward') {
            cardExpiryDisplay.innerText = e.target.value === '' ? 'MM/YY' : e.target.value;
            // Ocultamos el error si empieza a borrar
            e.target.classList.remove('border-danger');
            errorText.style.display = 'none';
            return; 
        }

        // Quitamos cualquier cosa que no sea número para evitar que escriban letras
        let val = e.target.value.replace(/\D/g, ''); 
        
        // Formateo: Si ya escribieron 2 números o más, ponemos la diagonal automáticamente
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        
        e.target.value = val; // Actualizamos el input
        cardExpiryDisplay.innerText = val === '' ? 'MM/YY' : val; // Actualizamos la tarjeta visual

        // --- LÓGICA DE VALIDACIÓN (Se ejecuta solo cuando terminan de escribir MM/YY) ---
        if (val.length === 5) {
            // Extraemos el mes y el año de lo que escribió el usuario
            const mesInput = parseInt(val.substring(0, 2));
            const anioInput = parseInt("20" + val.substring(3, 5)); // Convertimos "26" a 2026

            // Obtenemos la fecha actual del sistema
            const fechaActual = new Date();
            const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 porque en JS enero es 0
            const anioActual = fechaActual.getFullYear();

            // 1. Verificamos si escribieron un mes que no existe (ej. 13)
            if (mesInput < 1 || mesInput > 12) {
                e.target.classList.add('border-danger');
                errorText.innerText = "Mes inválido";
                errorText.style.display = 'block';
            } 
            // 2. Verificamos si la tarjeta ya expiró
            else if (anioInput < anioActual || (anioInput === anioActual && mesInput < mesActual)) {
                e.target.classList.add('border-danger');
                errorText.innerText = "Tarjeta expirada";
                errorText.style.display = 'block';
            } 
            // 3. Si todo está correcto, quitamos las alertas
            else {
                e.target.classList.remove('border-danger');
                errorText.style.display = 'none';
            }
        }
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