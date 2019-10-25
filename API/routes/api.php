<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('marcadores', 'MarcadoresController@listarTodos');
Route::get('marcadores/{id}', 'MarcadoresController@listar');
Route::post('marcadores', 'MarcadoresController@incluir');
Route::get('categorias', 'MarcadoresCategoriaController@listarTodos');

