<?php

namespace App\DataStory\Nodes;

use App\DataStory\Categories\Workflow;
use App\DataStory\NodeModel;

class Pass extends NodeModel
{
    const CATEGORY = Workflow::class;

    public function run()
    {
        $features = $this->getDataAtPortNamed('Input');

        // Pass does nothing!

        $this->portNamed('Output')->data = $features;
    }
}