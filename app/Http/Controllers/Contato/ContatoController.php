<?php

namespace App\Http\Controllers\Contato;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestContato;
use App\Models\Contato;
use Illuminate\Http\Request;

class ContatoController extends Controller
{
    public function singleContato(Contato $id)
    {
        return $id;
    }
    public function allContatos()
    {
        $contatos = Contato::orderBy('updated_at', 'desc')->get();
        return $contatos;
    }
    public function addContato(RequestContato $request)
    {

        $data = $request->only(['name', 'cpf', 'email', 'telefone', 'principal']);

        Contato::create([
            'name' => $data['name'],
            'cpf' => $data['cpf'],
            'email' => $data['email'],
            'telefone' => $data['telefone'],
            'principal' => $data['principal'] == "true" ? 1 : 0
        ]);

    }

    public function editContato(RequestContato $request, Contato $id)
    {
        $data = $request->only(['name', 'cpf', 'email', 'telefone', 'principal']);
        $id->update([
            'name' => $data['name'],
            'cpf' => $data['cpf'],
            'email' => $data['email'],
            'telefone' => $data['telefone'],
            'principal' => $data['principal'] == 'true' ? 1 : 0
        ]);
        return $id->save();
    }

    public function destroyContato(Contato $id)
    {
        return $id->delete();
    }
}
