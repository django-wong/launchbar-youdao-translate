const NO_EXPLANATION = [{title: '没有结果'}];

const ENDPOINT = 'http://fanyi.youdao.com';

/**
 * Wait for given ms and check if can continue to proform things
 *
 * @param      {number}  [ms=1000]  The milliseconds
 * @return     {boolean}
 */
function throttle(ms = 1000) {
    const FILE = Action.cachePath + 'throttle';
    const time = Date.now();
    File.writeText(time.toString(), FILE);
    while (Date.now() - time < ms) {
        continue;
    }
    return time.toString() === File.readText(
        FILE
    );
}