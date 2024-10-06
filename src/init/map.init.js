import { scaleFactor } from '../constants';
import { setCamScale } from '../utils';

export const initMap = async (
    k,
    objectConfig,
    pathToMapPng,
    pathToMapJson,
    shapeOffset = null
) => {
    k.loadSprite('map', pathToMapPng);
    k.setBackground(k.Color.fromHex('#311047'));
    setCamScale(k);

    const mapData = await (await fetch(pathToMapJson)).json();
    const { layers } = mapData;

    const map = k.make([
        k.sprite('map'),
        k.pos(0),
        k.scale(scaleFactor),
        'main_map',
    ]);

    const spawnpointsCharacters = {};

    layers.forEach(layer => {
        const { name, objects, properties } = layer;
        const isStaticObject = objectConfig.static.includes(name);
        const isInteractionObject = objectConfig.interactionObjects.includes(name);

        if (isStaticObject || isInteractionObject) {
            const isStatic = properties?.some(prop => prop.name === 'isStatic' && prop.value) ?? true;

            objects.forEach(staticBodyObj => {
                const components = [
                    k.area({
                        shape: new k.Rect(shapeOffset, staticBodyObj.width, staticBodyObj.height),
                    }),
                    k.pos(staticBodyObj.x, staticBodyObj.y),
                    staticBodyObj.name,
                    {
                        tiledProps: properties?.reduce((acc, prop) => {
                            acc[prop.name] = prop.value;
                            return acc;
                        }, {}),
                    },
                ];

                if (isStatic) components.push(k.body({ isStatic: true }));
                if (isInteractionObject) components.push('interaction_object');

                map.add(components);
            });
        }

        if (objectConfig.spawnpoints.includes(name)) {
            objects.forEach(entity => {
                spawnpointsCharacters[entity.name] = k.vec2(
                    (map.pos.x + entity.x) * scaleFactor,
                    (map.pos.y + entity.y) * scaleFactor
                );
            });
        }
    });

    return [map, spawnpointsCharacters];
};
