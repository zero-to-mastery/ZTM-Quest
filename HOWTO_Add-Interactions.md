# Guide adding interactions

## Adding interactions - Files & Directories

The directory structure looks as follows:

```md
  src
  ├── interactions
  │   ├── map name
  │       ├── index.js
  │       ├── game-object.interaction.js
```

Usually, we have issues which contain feature requests to add interactions to a existing map.

## Adding interactions

In order to add new interactions to a map which you usually want to trigger from the point where the main character interacts with objects, you have to follow the following file structure and contents:

- add a new file `gameObjectName.interaction.js`where `gameObjectName` is the name of the object which the player should interact with
  - in this file, export a function which accepts three parameters in given order, namely
      - `player` => the main character instance
      - `k` => kaplay context instance
      - `map` => map instance which contains all objects like boundaries

  - add your logic into the exported function
```javascript
// src/interactions/map_start/something.interaction.js
export const interactionWithSomething = (player, k, map) => {
  player.onCollide('somethingTag', () => {
      // your logic here
  });
};
```
  - import your function into the `index.js` file in `src/interactions/map_name/index.js` where `map_name` is the map where you want to add the interaction
  - add your function name to the `interactions` array in `index.js`
```javascript
// src/interactions/map_start/index.js
import { interactionWithSomething } from './something.interactions';

const interactions = [
    // ... existing interactions
    // Add more interactions here
    interactionWithSomething,
];
```

After finishing all steps, your interactions will get executed and attached to the map automatically.

The easiest way is to use the `onCollide` method which means, once the player has hit-area contact with the object, the logic will get triggered. To get an idea, have a look at one of the existing files in [map_start](./src/interactions/map_start/).
