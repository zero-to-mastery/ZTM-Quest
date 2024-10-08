import { k } from '../../../kplayCtx';
import { isAlreadyImported, setImportCacheState } from '../../../utils/imports-cache.storage';

const TO_ROOT = '../../../';

export const enterMap = async (pathToSceneFile, name, spawnPoint) => {
  if (isAlreadyImported(name)) {
    k.go(name, spawnPoint);
  }

  import(`${TO_ROOT}${pathToSceneFile}`).then((_) => {
    setImportCacheState(name);
    k.go(name, spawnPoint);
  });
}