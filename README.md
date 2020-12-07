# DataStory
Alpha in development

![image](https://user-images.githubusercontent.com/3457668/100412714-af94bf00-3075-11eb-9f6b-143fe77e4592.png)

## Installation
This is still just a standard Laravel app

## Create custom node
Run the command
```bash
php artisan story:node Translate
```

To generate a node boilerplate:

```php
<?php

namespace App\DataStory\Nodes;

use App\DataStory\NodeModel;

class Translate extends NodeModel
{
    public function run()
    {
        $items = $this->input();

        $this->output($items);
    }
}
```

After refreshing the page it is available in the story workbench.