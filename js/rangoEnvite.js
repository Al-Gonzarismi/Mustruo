window.onload = function () {
    $('#rangoEnvite').on('change', function() {
        $('#textoEnvite').text($(this).val());
        $('#envidar').text('Envido ' + $(this).val());
    })
}