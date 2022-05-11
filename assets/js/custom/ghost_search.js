const GHOST_SEARCH_VESION = '1.0.0';
const GHOST_SEARCH_VESION_KEY = 'GHOST_SEARCH_VESION_KEY';
var localVersion = localStorage.getItem(GHOST_SEARCH_VESION_KEY);
if (!localVersion || localVersion !== GHOST_SEARCH_VESION) {
    for (const key in localStorage) {
        if (key.startsWith('ghost')) {
            console.log(`${key}: ${localStorage.getItem(key)}`);
            localStorage.setItem(key, '');
        }
    }
    localStorage.setItem(GHOST_SEARCH_VESION_KEY, GHOST_SEARCH_VESION);
}
