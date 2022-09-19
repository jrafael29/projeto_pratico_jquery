<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    {{-- <link rel="stylesheet" href="{{asset('assets/css/novoContato.css')}}" >
    <link rel="stylesheet" href="{{asset('assets/css/listaContatos.css')}}" > --}}
    <link rel="stylesheet" href="	https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css">

    <link rel="stylesheet" href="style.css">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <script src="http://jqueryvalidation.org/files/dist/jquery.validate.js"></script>
    
</head>
<body style="background-color: #111827 !important; color: white !important;">
    <div class="container">

        <header>
            <x-contato.novo-contato />
        </header>
        <hr>
        <main>
            <section>
                <x-contato.lista-contatos />

                <div id="modal">
                    <div class="modal fade" id="{{'edit-modal'}}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog ">
                            <div class="modal-content bg-dark">
                                <form id="modalForm">

                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Editar</h5>
                                        <button type="button" id="{{'btn-close'}}" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <div class="inputs d-flex flex-column gap-2 justify-content-between mb-3">
                                            <input type="hidden" name="modal-id" id="modal-id" value="" readonly>
                                            <div class="form-group">
                                                <label class="form-label" for="modal-name">Nome</label>
                                                <input class="form-control bg-transparent text-white" type="text" name="modal-name" id="modal-name" placeholder="Foobar">
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label" for="modal-cpf">CPF</label>
                                                <input class="form-control bg-transparent text-white" type="text" name="modal-cpf" id="modal-cpf" placeholder="123.456.789-10">
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label" for="modal-email">E-mail</label>
                                                <input class="form-control bg-transparent text-white" type="email" name="modal-email" id="modal-email" placeholder="foo@bar.com">
                                            </div>
                                            <div class="form-group">
                                                <label class="form-label" for="modal-telefone">Telefone</label>
                                                <input class="form-control bg-transparent text-white" type="text" name="modal-telefone" id="modal-telefone" placeholder="(99) 99999-9999">
                                            </div>
                                        </div>
                                        <div class="checkbox mb-3">
                                            <input type="checkbox" name="modal-principal" id="modal-principal">
                                            <label class="form-label" for="modal-principal">Principal</label>
                                       </div>
                                    </div>
    
                                    <div class="modal-footer">
                                        <button class="btn btn-success w-100"">Salvar</button>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    </div>
    


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"></script>
    <script src="{{asset('assets/js/script.js')}}"></script>
</body>
</html>