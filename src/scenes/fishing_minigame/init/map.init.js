import { k } from '../../../kplayCtx';
import { scaleFactor } from '../../../constants';

export const initMap = async (objectConfig, pathToMapPng, pathToMapJson) => {
    k.setBackground(k.Color.fromHex('#311047'));

    k.loadSprite('fishing_map', pathToMapPng);

    const mapData = await (await fetch(pathToMapJson)).json();
    const { layers } = mapData;

    const leftPanel = document.getElementById('left-panel');

    let map;

    if (!k.isTouchscreen()) {
        map = k.make([
            k.sprite('fishing_map'),
            k.pos(
                leftPanel.offsetWidth * 2 + leftPanel.offsetWidth / 4,
                header.offsetHeight
            ),
            k.scale(scaleFactor),
            k.layer('map'),
            'main_map',
            {
                pressed: false,
                pressedTwice: false,
                fishSpawnTimer: Math.random() * 5,
                score: 0,
            },
        ]);
    } else {
        console.log(window.innerWidth);
        map = k.make([
            k.sprite('fishing_map'),
            k.pos(-window.innerWidth / 2, header.offsetHeight),
            k.scale(scaleFactor * 2),
            k.layer('map'),
            'main_map',
            {
                pressed: false,
                pressedTwice: false,
                fishSpawnTimer: Math.random() * 5,
                score: 0,
            },
        ]);
    }

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
                            k.vec2(0, 0),
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

        if (objectConfig.spawnpoints.includes(layer.name)) {
            for (const entity of layer.objects) {
                spawnpointsCharacters[entity.name] = k.vec2(entity.x, entity.y);
            }
        }
    }

    return [map, spawnpointsCharacters];
};
