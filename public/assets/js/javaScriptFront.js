// $("document").ready(function() {
//     $.ajax({
//         type: 'get',
//         url: `/departamentos`,
//         success: function(respuesta) {
//             console.log(respuesta);
//             // $('#ciudad').find('option').remove()
//             // respuesta.ciudades.forEach(ciudad => {
//             //     $("#ciudad").append(`<option  selected=”selected”>${ciudad}</option>`);
//             // });
//         },
//         error: function(e) {
//             console.log(e);
//         }
//     })
// })

function ciudades() {
    $.ajax({
        url: `http://localhost:3000/ciudades/${$("#departamento").val()}`,
        success: function(respuesta) {
            $('#ciudad').find('option').remove()
            respuesta.ciudades.forEach(ciudad => {
                $("#ciudad").append(`<option  selected=”selected”>${ciudad}</option>`);
            });
        },
        error: function(err) {
            console.log(err);
        }
    });
}

$("#compra").click(() => {
    var datos = []
    var nombre
    var precio
    var unidadesDis
    var unidadesCompra;
    var flag = true
    $("#productosDis tbody tr").each(function(index) {
        $(this).children("td").each(function(index2) {
            switch (index2) {
                case 0:
                    nombre = $(this).text();
                    break;
                case 1:
                    precio = $(this).text();
                    break;
                case 2:
                    unidadesDis = $(this).text();
                    break
                case 3:
                    unidadesCompra = $(this).children().val();
                    break
            }
        })
        fila = {
            index,
            nombre,
            precio,
            unidadesDis,
            unidadesCompra
        }
        if (fila.unidadesCompra != "") {
            datos.push(fila)
        }
        if (Number(fila.unidadesDis) < Number(fila.unidadesCompra)) {
            alert(`No hay suficientes unidades disponibles para el producto: ${fila.nombre} `)
            flag = false
        }
    })
    if (flag && datos.length > 0) {
        console.log(datos);
        $.ajax({
            type: 'post',
            url: '/compra',
            data: { datos },
            error: function() {
                alert("Error al intentar el logout")
            }
        })

    }

})




function login() {
    $.ajax({
        type: 'post',
        url: '/login',
        data: {
            user: $("#user").val(),
            pass: $("#pass").val()
        },
        success: function(respuesta) {
            if (!respuesta.response.error) {
                $("#form").submit()
                alert(respuesta)
            } else {
                alert(respuesta.response.mensaje)
            }
        },
        error: function() {
            alert("Error al intentar el loggin")
        }
    });

}

var slide_wrp = ".side-menu-wrapper"; //Menu Wrapper
var open_button = ".btn.btn-primary.btn-lg"; //Menu Open Button
var close_button = ".menu-close"; //Menu Close Button
var overlay = ".menu-overlay"; //Overlay

//Initial menu position
$(slide_wrp).hide().css({ "right": -$(slide_wrp).outerWidth() + 'px' }).delay(50).queue(function() { $(slide_wrp).show() });

$(open_button).click(function(e) { //On menu open button click
    e.preventDefault();
    $(slide_wrp).css({ "right": "0px" }); //move menu right position to 0
    setTimeout(function() {
        $(slide_wrp).addClass('active'); //add active class
    }, 50);
    $(overlay).css({ "opacity": "1", "width": "100%" });
});

$(close_button).click(function(e) { //on menu close button click
    e.preventDefault();
    $(slide_wrp).css({ "right": -$(slide_wrp).outerWidth() + 'px' }); //hide menu by setting right position 
    setTimeout(function() {
        $(slide_wrp).removeClass('active'); // remove active class
    }, 50);
    $(overlay).css({ "opacity": "0", "width": "0" });
});

$(document).on('click', function(e) { //Hide menu when clicked outside menu area
    if (!e.target.closest(slide_wrp) && $(slide_wrp).hasClass("active")) { // check menu condition
        $(slide_wrp).css({ "right": -$(slide_wrp).outerWidth() + 'px' }).removeClass('active');
        $(overlay).css({ "opacity": "0", "width": "0" });
    }
});