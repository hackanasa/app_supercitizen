<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Marcadores;

class MarcadoresController extends Controller
{

    public function listar($id){
        return Marcadores::select('a.id','a.latitude','a.longitude','a.categoria as categoria_id','b.nome as categoria','a.descricao')
            ->from('marcadores as a')
            ->join('marcadores_categoria as b','a.categoria','=','b.id')
            ->where('a.id',$id)
            ->first();
    }

    public function listarTodos(){

        return Marcadores::select('a.id','a.latitude','a.longitude','a.categoria as categoria_id','b.nome as categoria','a.descricao')
                          ->from('marcadores as a')
                          ->join('marcadores_categoria as b','a.categoria','=','b.id')
                          ->get();
    }

    public function incluir(Request $request){

        $validator = Validator::make($request->all(), [
            'latitude'       => 'required',
            'longitude'      => 'required',
            'categoria'      => 'required',
            'descricao'      => 'required',

        ]);

        if($validator->fails())
        {
            return $validator->errors();
        }

        $marcador = new Marcadores();

        $marcador->latitude  = $request->input('latitude');
        $marcador->longitude = $request->input('longitude');
        $marcador->categoria = $request->input('categoria');
        $marcador->descricao = $request->input('descricao');


        if($marcador->save()){
            return [
                'resultado' => true,
                'mensagem' => 'Marcador cadastrado com sucesso'
            ];
        }


    }
}
