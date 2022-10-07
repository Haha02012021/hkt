<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    //
    public function getAllTags() {
        return response()->json([
            'statusCode' => 0,
            'data' => Tag::all(),
            'message' => 'get all tag'
        ]);
    }
}
