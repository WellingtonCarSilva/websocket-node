function somar(x, y) {
    return parseFloat(x.replace('^[-+]?\d*\.?\d*$')) + parseFloat(y.replace('^[-+]?\d*\.?\d*$'));
}

function dividir(x, y) {
    return parseFloat(x.replace('^[-+]?\d*\.?\d*$')) / parseFloat(y.replace('^[-+]?\d*\.?\d*$'));
}

function subtrair(x, y) {
    return parseFloat(x.replace('^[-+]?\d*\.?\d*$')) - parseFloat(y.replace('^[-+]?\d*\.?\d*$'));
}

function multiplicar(x, y) {
    return parseFloat(x.replace('^[-+]?\d*\.?\d*$')) * parseFloat(y.replace('^[-+]?\d*\.?\d*$'));
}

module.exports = {
    somar: somar,
    dividir: dividir,
    subtrair: subtrair,
    multiplicar: multiplicar
}