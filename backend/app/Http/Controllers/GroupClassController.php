<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use Illuminate\Http\Request;

class GroupClassController extends Controller
{
    public function create(Request $request) {
        try {
            $fields = $request->validate(
                [
                    'name' => 'required|string',
                    'teacher_id' => 'required|integer',
                ]
            );

            $newClass = GroupClass::create([
                'name' => $fields['name'],
                'teacher_id' => $fields['teacher_id'],
            ]);

            return response()->json([
                'statusCode' => 0,
                'data' => $newClass,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
