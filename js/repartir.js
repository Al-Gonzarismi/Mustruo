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
        if (manoUsuario.attr('class').indexOf('hidden') < 0) {
            $('#deUsu').show();
            repartoDerecha(rivalDerCartas);
            repartoCompi(compiCartas);
            repartoIzq(rivalIzqCartas);
            repartoUsuario(usuarioCartas);
        } else if (manoRivalDer.attr('class').indexOf('hidden') < 0) {
            $('#deRivalDer').show();
            repartoDerecha(compiCartas);
            repartoCompi(rivalIzqCartas);
            repartoIzq(usuarioCartas);
            repartoUsuario(rivalDerCartas);
        } else if (manoRivalIzq.attr('class').indexOf('hidden') < 0) {
            $('#deRivalIzq').show();
            repartoDerecha(usuarioCartas);
            repartoCompi(rivalDerCartas);
            repartoIzq(compiCartas);
            repartoUsuario(rivalIzqCartas);
        } else if (manoCompi.attr('class').indexOf('hidden') < 0) {
            $('#deCompi').show();
            repartoDerecha(rivalIzqCartas);
            repartoCompi(usuarioCartas);
            repartoIzq(rivalDerCartas);
            repartoUsuario(compiCartas);
        }
    })
}