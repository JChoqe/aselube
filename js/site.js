function showAlert(header, mensaje, tipo) {
    var _header = header || 'Atención';
    var _mensaje = mensaje || 'Mensaje';
    var _icon = tipo || 'info';
    $.toast({
        position: 'mid-center',
        heading: _header,
        text: _mensaje,
        showHideTransition: 'fade',
        icon: _icon,
        stack: false
    })
};
function setQlikTheme(qlik, name) {
    qlik.theme.apply(name).then(function (result) {

    });
}
function changeThemes(qlik, name) {
    qlik.theme.apply(name);
}
function resetQlikTheme(qlik) {
    qlik.theme.apply('_Theme-Default');
}