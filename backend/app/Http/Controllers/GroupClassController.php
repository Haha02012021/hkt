<?php

namespace App\Http\Controllers;

use App\Models\GroupClass;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

class GroupClassController extends Controller
{
    public function getAllClasses() {
        try {
            $classes = GroupClass::with('teacher')->get();

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
            $class = GroupClass::with('teacher', 'students')->where('id', $id)->get();

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
    
    public function getClassesByUserId($id) {
        try {
            $user = User::find($id);

            $data = [];
            if ($user->role === 0) {
                $data = $user->groupClass()->with('teacher')->get();
            } else if ($user->role === 1) {
                $data = $user->classes()->with('teacher')->get();
            }

            return response()->json([
                'statusCode' => 0,
                'data' => $data,
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
            $user = $request->user();
            $fields = $request->validate(
                [
                    'name' => 'required|string',
                ]
            );

            $newClass = GroupClass::create([
                'name' => $fields['name'],
                'teacher_id' => $user->id,
            ]);

            if ($request->student_ids) {
                $newClass->students()->attach($request->student_ids);
            }

            $newClass->teacher;
            $newClass->students;

            return response()->json([
                'statusCode' => 0,
                'message' => 'Create successfully!',
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
