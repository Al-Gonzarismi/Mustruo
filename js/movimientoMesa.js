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
    function activarSubir() {
        $('#carta1').off('click');
        var clase = $(this).attr('class');
        if (clase.indexOf('subirCarta') > 0) {
            $(this).attr('class', 'pointer');
        } else {
            $(this).attr('class', clase + " subirCarta");
        }
    }
    $('#carta1').click(activarSubir);
    $('#carta2').click(activarSubir);
    $('#carta3').click(activarSubir);
    $('#carta4').click(activarSubir);
    //Mostrar Cuadro Envites
    $('#mostrarCuadro').hover(function () {
        $('#carta1').on('')
        $('#cuadroEnvites').show();
    }, function () {
        $('#cuadroEnvites').hide();
    })
}