<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;

class ResultsController extends Controller
{
    public function index()
    {
        $results = Result::orderBy('id', 'DESC')->get();

        return response()->json([
            'results' => $results
        ], 200);
    }
}
