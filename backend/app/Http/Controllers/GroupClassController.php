<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use Exception;
use Illuminate\Http\Request;

class GroupClassController extends Controller
{
    public function getAllClasses() {
        try {
            $classes = GroupClass::all();

            return response()->json([
                'successCode' => 0,
                'data' => $classes,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function getClassById($id) {
        try {
            $class = GroupClass::find($id)->with('teacher', 'students')->get();

            return response()->json([
                'statusCode' => 0,
                'data' => $class,
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

    public function edit($id, Request $request) {
        try {
            $class = GroupClass::find($id);
            if ($class) {
                if ($request->name) {
                    $class->name = $request->name;
                    $class->save();
                }
                if ($request->student_ids) {
                    $class->students()->attach($request->student_ids);
                }

                $class->teacher;
                $class->students;
                return response()->json([
                    'statusCode' => 0,
                    'data' => $class,
                ]);
            }

            return response()->json([
                'statusCode' => 1,
                'message' => 'Class is not exist!',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }

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

    public function deleteClassById($id) {
        try {
            $class = GroupClass::find($id);

            $class->delete();

            return response()->json([
                'statusCode' => 0,
                'message' => 'delete class successfully',
            ]);
        } catch (Exception $e) {
            return response()->json([
                'statusCode' => -1,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
