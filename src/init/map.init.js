import { k } from '../kplayCtx';

import { scaleFactor } from '../constants';
let uiLoaded = false;
import { setCamScale } from '../utils';

export const initMap = async (
    objectConfig,
    pathToMapPng,
    pathToMapJson,
    shapeOffset = null,
    mapConfig = { additionalProperties: {} }
) => {
    k.loadSprite('map', pathToMapPng);
    k.setBackground(k.Color.fromHex('#311047'));
    setCamScale(k);

    const mapData = await (await fetch(pathToMapJson)).json();
    const { layers } = mapData;

    shapeOffset = shapeOffset || k.vec2(0, 0);

    // Convert the map name from the file path
    const mapFileName = pathToMapJson.split('/').pop(); // Extract 'map_start.json'
    const mapName = mapFileName.replace('map_', '').replace('.json', ''); // Get 'start

    const map = k.make([
        k.sprite('map'),
        k.pos(mapConfig.mapOffset ? mapConfig.mapOffset : 0),
        k.scale(scaleFactor),
        k.layer('map'),
        'main_map',
        mapConfig.additionalProperties,
        {
            png: pathToMapPng,
            name: mapName,
        },
    ]);
    k.onLoad(() => {
        if (!uiLoaded) {
            const app = document.getElementById('app');
            app.classList.add('loaded');
            const matchesMobile = matchMedia(
                '(max-width: 768px), (max-width: 900px) and (orientation: landscape)'
            );
            const controlText = `
                    <p id="controlNote" class="d-mobile-hide note">
                        Tap/Click/&uarr;&darr;&larr;&rarr; around to move
                    </p>
                    <p class="d-desktop-hide note">Tap to move around</p>
                    <p id="interaction-info" class='note' style='display: none'>
                        ${matchesMobile.matches ? 'Tap to Interact' : 'T - Interact with NPC/Object'}
                    </p>
                    `;
            const div = document.createElement('div');
            div.classList.add('control-text-container');
            div.innerHTML = controlText;

            if (matchesMobile.matches) {
                const footer = document.getElementById('text-info');
                footer.appendChild(div);
            } else {
                const leftPanel = document.getElementById('left-panel');
                leftPanel.appendChild(div);
            }
            uiLoaded = true;
        }
    });

    const spawnpointsCharacters = {};

    for (const layer of layers) {
        const isStaticObject = objectConfig.static.includes(layer.name);
        const isInteractionObject = objectConfig.interactionObjects.includes(
            layer.name
        );

        if (isStaticObject || isInteractionObject) {
            const isStaticProp = layer?.properties?.filter(
                (prop) => prop.name === 'isStatic'
            );
            const isStatic =
                isStaticProp.length > 0 ? isStaticProp[0].value : true;

            for (const staticBodyObj of layer.objects) {
                /**
                 * Setup hidden boundaries for the player to collide with on the map
                 * The data gets loaded from mapData which in fact got created by Tiled
                 */
                const tiledPropsObj = {
                    id: staticBodyObj.id,
                    name: staticBodyObj.name,
                    x: staticBodyObj.x,
                    y: staticBodyObj.y,
                    width: staticBodyObj.width,
                    height: staticBodyObj.height,
                    type: staticBodyObj.type,
                    ...staticBodyObj?.properties?.reduce((acc, prop) => {
                        acc[prop.name] = prop.value;
                        return acc;
                    }, {}),
                };

                const components = [
                    k.area({
                        /**
                         * The shape of the boundary which has the dimensions from Tiled map, pos x and y got figured out
                         * by try/fail method to match the boundaries on the map
                         */
                        shape: new k.Rect(
                            shapeOffset,
                            staticBodyObj.width,
                            staticBodyObj.height
                        ),
                    }),
                    k.pos(staticBodyObj.x, staticBodyObj.y),
                    staticBodyObj.name,
                    {
                        tiledProps: JSON.stringify(tiledPropsObj, null, 2),
                    },
                ];

                if (isStatic) {
                    components.push(k.body({ isStatic: true }));
                }

                if (isInteractionObject) {
                    components.push('interaction_object');
                }

                map.add(components);
            }
            continue;
        }

        /**
         * Spawnpoints are used to place entities in the map, in this case the main game character
         * here we set the player position on start once the map object got parsed
         */
        if (objectConfig.spawnpoints.includes(layer.name)) {
            for (const entity of layer.objects) {
                spawnpointsCharacters[entity.name] = mapConfig.characterOffset
                    ? mapConfig.characterOffset(entity.x, entity.y)
                    : k.vec2(
                          (map.pos.x + entity.x) * scaleFactor,
                          (map.pos.y + entity.y) * scaleFactor
                      );
            }
        }
    }

    return [map, spawnpointsCharacters];
};
