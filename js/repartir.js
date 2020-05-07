window.onload = function () {
    //Reparto
    function repartoDerecha(cartas) {
        cartas[0].setAttribute('class', 'ocultar aparecer unSegundo')
        cartas['1'].setAttribute('class', 'ocultar aparecer cincoSegundos')
        cartas['2'].setAttribute('class', 'ocultar aparecer nueveSegundos')
        cartas['3'].setAttribute('class', 'ocultar aparecer treceSegundos')
    }
    function repartoCompi(cartas) {
        cartas['0'].setAttribute('class', 'ocultar aparecer dosSegundos')
        cartas['1'].setAttribute('class', 'ocultar aparecer seisSegundos')
        cartas['2'].setAttribute('class', 'ocultar aparecer diezSegundos')
        cartas['3'].setAttribute('class', 'ocultar aparecer catorceSegundos')
    }
    function repartoIzq(cartas) {
        cartas['0'].setAttribute('class', 'ocultar aparecer tresSegundos')
        cartas['1'].setAttribute('class', 'ocultar aparecer sieteSegundos')
        cartas['2'].setAttribute('class', 'ocultar aparecer onceSegundos')
        cartas['3'].setAttribute('class', 'ocultar aparecer quinceSegundos')
    }
    function repartoUsuario(cartas) {
        cartas['0'].setAttribute('class', 'ocultar aparecer cuatroSegundos')
        cartas['1'].setAttribute('class', 'ocultar aparecer ochoSegundos')
        cartas['2'].setAttribute('class', 'ocultar aparecer doceSegundos')
        cartas['3'].setAttribute('class', 'ocultar aparecer dieciseisSegundos')
    }
    $('#repartir').click(function () {
        const manoUsuario = $('.manoUsuario');
        const manoRivalDer = $('.manoRivalDer');
        const manoRivalIzq = $('.manoRivalIzq');
        const manoCompi = $('.manoCompi');
        var usuarioCartas = $('.misCartas').children();
        var compiCartas = $('.compiCartas').children();
        var rivalDerCartas = $('.rivalderCartas').children();
        var rivalIzqCartas = $('.rivalizqCartas').children();
        if (!manoRivalDer.hasClass('hidden')) {
            $('#deUsu').show();
            repartoDerecha(rivalDerCartas);
            repartoCompi(compiCartas);
            repartoIzq(rivalIzqCartas);
            repartoUsuario(usuarioCartas);
        } else if (!manoCompi.hasClass('hidden')) {
            $('#deRivalDer').show();
            repartoDerecha(compiCartas);
            repartoCompi(rivalIzqCartas);
            repartoIzq(usuarioCartas);
            repartoUsuario(rivalDerCartas);
        } else if (!manoUsuario.hasClass('hidden')) {
            $('#deRivalIzq').show();
            repartoDerecha(usuarioCartas);
            repartoCompi(rivalDerCartas);
            repartoIzq(compiCartas);
            repartoUsuario(rivalIzqCartas);
        } else if (!manoRivalIzq.hasClass('hidden')) {
            $('#deCompi').show();
            repartoDerecha(rivalIzqCartas);
            repartoCompi(usuarioCartas);
            repartoIzq(rivalDerCartas);
            repartoUsuario(compiCartas);
        }
    })
}