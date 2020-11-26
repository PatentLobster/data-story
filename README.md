## How to use React Diagrams with Laravel
As of 22th november 2020.

### Setup up React
```
laravel new diagram-app
cd diagram-app
composer require laravel/ui
php artisan ui react
yarn && yarn watch
```

In welcome.blade.php do the following changes
* ```<div id="app"></div>```

* ```<script type="text/javascript" src="/js/app.js"></script>```
* ```<link href="/css/app.css" rel="stylesheet">```
* ```<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">```
        


### Installing the package
```
yarn add @projectstorm/react-diagrams@next
npm install closest lodash react dagre pathfinding paths-js resize-observer-polyfill ml-matrix @emotion/core@10.1.1 @emotion/styled@10.0.3
```

### Adding a diagram!
Copy [this sample](https://github.com/projectstorm/react-diagrams/blob/master/packages/diagrams-demo-gallery/demos/demo-simple/index.tsx) from the demos and save it as a component `Diagram.js`

Make the following modifications
* Remove the `DemoCanvasWidget` import & wrapper in `render`
* Remove ts typehint `<DefaultLinkModel>`
* Add a style `fullsize` in app.scss:
```css
.fullsize {
    width: 100vw;
    height: 70vh;
}
```
* Apply that class to `CanvasWidget` in your `Diagram` component.

* Finally rename `ExampleComponent` to `App` and render the Diagram inside :rocket:


## Terms
* Free usage for everyone
* Please no redistribution or large scale code replication
* Copyright retained by ajthinking








## License DataStory Profesional
### Contributorware
* Version `v0.0.1`.
* Read in full [here]().
* Free usage for everyone
* Copyright retained by ajthinking
