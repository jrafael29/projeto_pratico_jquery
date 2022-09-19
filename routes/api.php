<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Contato\ContatoController;


Route::post('/contato/novo', [ContatoController::class, 'addContato'])->name('addContato');
Route::get('/contatos', [ContatoController::class, 'allContatos'])->name('allContatos');
Route::get('/contato/{id}', [ContatoController::class, 'singleContato'])->name('singleContato');
Route::post('/contato/{id}/excluir', [ContatoController::class, 'destroyContato'])->name('destroyContato');
Route::post('/contato/{id}/editar', [ContatoController::class, 'editContato'])->name('editContato');