# Guide adding game objects

## Adding game objects - Files & Directories

The directory structure looks as follows:

```md
  src
  ├── gameObjects
  │   ├── map name
  │       ├── index.js
  │       ├── game-object.interaction.js
```

Usually, we have issues which contain feature requests to add game objects to a existing map.

## Adding game objects

In order to add new game objects to a map, you have to follow the following file structure and contents:

- add a new file `gameObjectName.gameObject.js` where `gameObjectName` is the name of the object which you want to add
  - in this file, export a function which accepts three parameters in given order, namely
      - `k` => kaplay context instance
      - `map` => map instance which contains all objects like boundaries
      - `spawnpoints` => object of spawnpoints which got add by tiled map object
  - add your logic into the exported function
  - import your function into the `index.js` file in `src/gameObjects/map_name/index.js` where `map_name` is the map where you want to add the game object
  - add your function name to the `gameObjects` array in `index.js`

After finishing all steps, your game objects will get added to the map automatically.

To get an idea, have a look at one of the existing files in [map_start](./src/gameObjects/map_start/).
