<?php

namespace App\Http\Controllers;

use App\Models\School;
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
    public function getAllSchool() {
        return response()->json([
            'statusCode' => 0,
            'data' => School::all(),
            'message' => 'get all tag'
        ]);
    }
}
