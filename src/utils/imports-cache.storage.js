const LOCAL_STORAGE_IMPORT_CACHE_IDX = 'mapsLoaded';

const initialState = () => (
  {
    start: true,
  }
);


export const clearImportCache = () => {
  localStorage.removeItem(LOCAL_STORAGE_IMPORT_CACHE_IDX);
};

export const isAlreadyImported = (name) => {

  const stringifiedState =
    localStorage.getItem(LOCAL_STORAGE_IMPORT_CACHE_IDX) || null;

  if (!stringifiedState) {
    return false;
  }

  const parsed = JSON.parse(stringifiedState);

  if (parsed[name]) {
    return true;
  }

  return false;
};

export const setImportCacheState = (name) => {
  const stringifiedState =
    localStorage.getItem(LOCAL_STORAGE_IMPORT_CACHE_IDX) || JSON.stringify(initialState());


  const importCacheState = JSON.parse(stringifiedState);

  importCacheState[name] = true;

  localStorage.setItem(
    LOCAL_STORAGE_IMPORT_CACHE_IDX,
    JSON.stringify(importCacheState)
  );

};

export const initImportCacheState = () => {

  const stringifiedState =
    localStorage.getItem(LOCAL_STORAGE_IMPORT_CACHE_IDX) || null;

  if (stringifiedState) {
    clearImportCache();
  }


  const savedState = initialState();

  localStorage.setItem(
    LOCAL_STORAGE_IMPORT_CACHE_IDX,
    JSON.stringify(savedState)
  );

  return savedState;
}
