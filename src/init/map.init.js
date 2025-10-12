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
                        tiledProps: {
                            ...staticBodyObj?.properties?.reduce(
                                (acc, prop) => {
                                    acc[prop.name] = prop.value;
                                    return acc;
                                },
                                {}
                            ),
                        },
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
