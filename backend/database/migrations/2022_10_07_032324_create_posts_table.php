<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->longText('content');
            $table->tinyInteger('type')->comment('0: chia se, 1: hoi dap');
            $table->bigInteger('class_id')->nullable();
            $table->bigInteger('user_id');
            $table->tinyInteger('completed')->nullable()->comment('0:chua xong, 1:da xong');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
