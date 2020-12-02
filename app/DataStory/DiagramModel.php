<?php

namespace App\DataStory;

use stdClass;

class DiagramModel
{
    public function __construct(stdClass $data)
    {
        $this->data = $data;
    }

    public function find($id)
    {
        return $this->data->layers[1]->models->$id;    
    }
}