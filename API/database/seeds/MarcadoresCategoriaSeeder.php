<?php

use Illuminate\Database\Seeder;
use App\MarcadoresCategoria;

class MarcadoresCategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $dados = [
            ['nome' => 'Entulho na calçada'],
            ['nome' => 'Descarte irregular'],
            ['nome' => 'Bueiro entupido'],
            ['nome' => 'Descarte irregular'],
        ];

        MarcadoresCategoria::insert($dados);
    }
}
