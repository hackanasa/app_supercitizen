<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\MarcadoresCategoria;

class MarcadoresCategoriaController extends Controller
{
    public function listarTodos(){

        return MarcadoresCategoria::get();

    }
}
