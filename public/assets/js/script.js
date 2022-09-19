

$(document).ready(function(){
    getAllContatos()
})

$("#telefone").mask("(99) 99999-9999");
$("#cpf").mask("999.999.999-99");
$("#modal-telefone").mask("(99) 99999-9999");
$("#modal-cpf").mask("999.999.999-99");

// adicionar novo contato
$('#forme').on('submit', function(e){
    e.preventDefault();

    let name = $("#name").val()
    let cpf = $("#cpf").val()
    let email = $("#email").val()
    let telefone = $("#telefone").val()
    let principal = $("#principal").is(':checked');


        $.ajax({
            url: 'api/contato/novo',
            type: 'POST',
            headers: {
                'X-CSRF-Token': $('#_token').val(),
            },
            data: {
                name,
                cpf,
                email,
                telefone,
                principal
            },
            success: function(data){
                console.log(data);
                getAllContatos()
                clearInputs();
            },
            error: function(request){
                console.log(request)

            }
        })
})

$('#modalForm').on('submit', function(e){
    e.preventDefault();

    let id = $('#modal-id').val()
    let name = $('#modal-name').val()
    let cpf = $('#modal-cpf').val()
    let email = $('#modal-email').val()
    let telefone = $('#modal-telefone').val()
    let principal = $("#modal-principal").is(':checked');

    $.ajax({
        url: `api/contato/${id}/editar`,
        type: "POST",
        data: {
            name,
            cpf,
            email,
            telefone,
            principal
        },
        headers: {
            'X-CSRF-Token': $('#_token').val(),
        },
        success: function(data){
            getAllContatos();

            closeModalEdit();

        }
    })
})

function clearInputs(){
    $("#name").val('');
    $("#cpf").val('');
    $("#email").val('');
    $("#telefone").val('');
    $('input[type=checkbox]').prop('checked',false);

}

function getAllContatos(){
    $.ajax({
        url: 'api/contatos',
        headers: {
            'X-CSRF-Token': $('#_token').val(),
         },
        success: function(data){
            $('#corpo').empty();
            data.map( contato => {
                renderLista(contato)
            } )
        }
    })
}

function getSingleContato(id){
    $.ajax({
        url: `api/contato/${id}`,
        headers: {
            'X-CSRF-Token': $('#_token').val(),
        },
        success: function(data){
            fillInputsEdit(data)
        }
    })
}

function renderLista({id, name, cpf, email, telefone, principal}){

    let corpo = `
        <tr id="${id}" class="text-nowrap">
            <td>${name}</td>
            <td>${cpf}</td>
            <td>${email ?? "[Não informado]"}</td>
            <td>${telefone ?? "[Não informado]"}</td>
            <td>${principal ? 'Sim' : 'Não'}</td>
            <td class="d-flex gap-1 justify-content-center">
                <a href="#" class="btn btn-sm btn-secondary" onclick="openModalEdit(${id})" >Editar</a>
                <a href="#" class="btn btn-sm btn-danger" onclick="destroyContato(${id})">Excluir</a>
            </td>
        </tr>
    `;

    $('#corpo').append(corpo);
}

function fillInputsEdit({id, name, cpf, email, telefone, principal}){
    
    $('#modal-id').val(id)
    $('#modal-name').val(name)
    $('#modal-cpf').val(cpf)
    $('#modal-email').val(email)
    $('#modal-telefone').val(telefone)
    $('#modal-principal').prop('checked', principal);

}

function openModalEdit(id){
    $('#modal .modal').modal('show');
    getSingleContato(id);
}

function closeModalEdit(){
    $('#modal .modal').modal('hide');
}

function destroyContato(id){

    $.ajax({
        url: `api/contato/${id}/excluir`,
        type: "POST",
        data: {
            id
        },
        headers: {
            'X-CSRF-Token': $('#_token').val(),
        },
        success: function(data){
            getAllContatos();
        }
    })
}

jQuery.validator.addMethod("cpf", function(value, element) {
    value = jQuery.trim(value);
 
     value = value.replace('.','');
     value = value.replace('.','');
     cpf = value.replace('-','');
     while(cpf.length < 11) cpf = "0"+ cpf;
     var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
     var a = [];
     var b = new Number;
     var c = 11;
     for (i=0; i<11; i++){
         a[i] = cpf.charAt(i);
         if (i < 9) b += (a[i] * --c);
     }
     if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
     b = 0;
     c = 11;
     for (y=0; y<10; y++) b += (a[y] * c--);
     if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }
 
     var retorno = true;
     if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;
 
     return this.optional(element) || retorno;
 
 }, "Informe um CPF válido");



$('#forme').validate({
    errorClass: "is-invalid",
    debug: true,
    rules: {
        name: {
            minlength: 5,
            maxlength: 50
        },
        cpf: {
            cpf: true,
            minlength: 14,
        },
        email: {
            email: true
        },
        telefone: {
            minlength: 15
        }

    },
    messages: {
        name: {
            minlength: 'Seu nome deve ter no minimo 5 caracteres',
            maxlength: 'Seu nome deve ter no maximo 50 caracteres'
        },
        cpf: { 
            cpf: 'CPF inválido',
            minlength: 'CPF inválido'
        },
        email:{
            email: "Email inválido"
        },
        telefone:{
            minlength: 'Telefone inválido'
        }

    }
});

$('#modalForm').validate({
    errorClass: "is-invalid",
    debug: true,
    rules: {
        'modal-name': {
            minlength: 5,
            maxlength: 50
        },
        'modal-cpf': {
            cpf: true,
            minlength: 14,
        },
        'modal-email': {
            email: true
        },
        'modal-telefone': {
            minlength: 15
        }

    },
    messages: {
        'modal-name': {
            minlength: 'Seu nome deve ter no minimo 5 caracteres',
            maxlength: 'Seu nome deve ter no maximo 50 caracteres'
        },
        'modal-cpf': { 
            cpf: 'CPF inválido',
            minlength: 'CPF inválido'
        },
        'modal-email':{
            email: "Email inválido"
        },
        'modal-telefone':{
            minlength: 'Telefone inválido'
        }

    }
});


