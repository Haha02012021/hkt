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
        Schema::create('student_answer', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('student_id');
            $table->bigInteger('homework_id');
            $table->bigInteger('class_id');
            $table->string('answer_file')->nullable();
            $table->mediumText('comment')->nullable();
            $table->integer('status')->default(-1)->comment('-1: not done, 1: not checked, 0: checked');
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
        Schema::dropIfExists('student_answers');
    }
};
