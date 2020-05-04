window.onload = function () {
    // Rango Envites
    $('#mas').click(function () {
        var num = Number($('#textoEnvidar').text())
        if (num < mesa.puntos) {
            var suma = num + 1;
            $('#textoEnvidar').text(suma);
            $('#envidar').text("Envido " + suma);
        }
    })
    $('#menos').click(function () {
        var num = Number($('#textoEnvidar').text())
        if (num > 2) {
            var suma = num - 1;
            $('#textoEnvidar').text(suma);
            $('#envidar').text("Envido " + suma);
        }
    })
    $('#haymas').click(function () {
        var num = Number($('#haytextoEnvidar').text())
        if (num < mesa.puntos) {
            var suma = num + 1;
            $('#haytextoEnvidar').text(suma);
            $('#hayenvidar').text("Envido " + suma);
        }
    })
    $('#haymenos').click(function () {
        var num = Number($('#haytextoEnvidar').text())
        if (num > 2) {
            var suma = num - 1;
            $('#haytextoEnvidar').text(suma);
            $('#hayenvidar').text("Envido " + suma);
        }
    })
    //Subir Carta
    $('#carta1').click(function () {
        var clase = $('#carta1').attr('class');
        if (clase.indexOf('subirCarta') > 0) {
            $('#carta1').attr('class', 'pointer');
        } else {
            $('#carta1').attr('class', clase + " subirCarta");
        }
    })
    $('#carta2').click(function () {
        var clase = $('#carta2').attr('class');
        if (clase.indexOf('subirCarta') > 0) {
            $('#carta2').attr('class', 'pointer');
        } else {
            $('#carta2').attr('class', clase + " subirCarta");
        }
    })
    $('#carta3').click(function () {
        var clase = $('#carta3').attr('class');
        if (clase.indexOf('subirCarta') > 0) {
            $('#carta3').attr('class', 'pointer');
        } else {
            $('#carta3').attr('class', clase + " subirCarta");
        }
    })
    $('#carta4').click(function () {
        var clase = $('#carta4').attr('class');
        if (clase.indexOf('subirCarta') > 0) {
            $('#carta4').attr('class', 'pointer');
        } else {
            $('#carta4').attr('class', clase + " subirCarta");
        }
    })
    //Mostrar Cuadro Envites
    $('#mostrarCuadro').hover(function () {
        $('#cuadroEnvites').show();
    }, function () {
        $('#cuadroEnvites').hide();
    })
}