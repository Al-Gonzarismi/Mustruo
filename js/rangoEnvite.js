window.onload = function () {
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
}