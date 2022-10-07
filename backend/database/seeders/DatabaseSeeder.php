<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\GroupClass;
use App\Models\Level;
use App\Models\School;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        Level::create([
            'name' => '>N1',
        ]);

        Level::create([
            'name' => 'N1',
        ]);

        Level::create([
            'name' => 'N2',
        ]);

        Level::create([
            'name' => 'N3',
        ]);

        Level::create([
            'name' => 'N4',
        ]);

        Level::create([
            'name' => 'N5',
        ]);

        Level::create([
            'name' => '<N5',
        ]);

        Tag::create([
            'name' => 'Nghe hiểu',
        ]);

        Tag::create([
            'name' => 'Đọc hiểu',
        ]);

        Tag::create([
            'name' => 'Từ vựng',
        ]);

        Tag::create([
            'name' => 'Ngữ pháp',
        ]);

        Tag::create([
            'name' => 'Tiếng Nhật chuyên ngành',
        ]);

        Tag::create([
            'name' => 'N1',
        ]);

        Tag::create([
            'name' => 'N2',
        ]);

        Tag::create([
            'name' => 'N3',
        ]);

        Tag::create([
            'name' => 'N4',
        ]);

        Tag::create([
            'name' => 'N5',
        ]);

        School::create([
            'name' => 'UET',
        ]);

        School::create([
            'name' => 'HUST',
        ]);

        School::create([
            'name' => 'PKA',
        ]);

        School::create([
            'name' => 'UIT',
        ]);

        School::create([
            'name' => 'DUT',
        ]);

        User::create([
            'username' => 'teacher uet',
            'email' => 'teacher-uet@gmail.com',
            'password' => 'teacher-uet123',
            'school_id' => 1,
            'level_id' => 1,
            'role' => 1,
            'avatar' => 'https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-cho-co-nang-nghien-tra-sua.jpg',
        ]);

        User::create([
            'username' => 'teacher pka',
            'email' => 'teacher-pka@gmail.com',
            'password' => 'teacher-pka123',
            'school_id' => 1,
            'level_id' => 1,
            'role' => 1,
            'avatar' => 'https://o.vdoc.vn/data/image/2022/08/25/avatar-cute-cho-co-nang-nghien-tra-sua.jpg',
        ]);

        User::create([
            'username' => 'uet 1',
            'email' => 'uet@gmail.com',
            'password' => 'student1123',
            'school_id' => 1,
            'level_id' => 3,
            'role' => 0,
            'avatar' => 'https://linhkiem.vn/nhung-tam-hinh-cute/imager_4_46921_700.jpg',
        ]);

        User::create([
            'username' => 'uet 2',
            'email' => 'uet2@gmail.com',
            'password' => 'student1123',
            'school_id' => 1,
            'level_id' => 3,
            'role' => 0,
            'avatar' => 'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cute.jpg',
        ]);

        User::create([
            'username' => 'pka 1',
            'email' => 'pka2@gmail.com',
            'password' => 'student1123',
            'school_id' => 1,
            'level_id' => 3,
            'role' => 0,
            'avatar' => 'https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-cute.jpg',
        ]);

        GroupClass::create([
            'name' => 'uet class',
            'teacher_id' => 1,
        ]);

        GroupClass::create([
            'name' => 'pka class',
            'teacher_id' => 2,
        ]);
    }
}
