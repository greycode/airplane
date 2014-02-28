/**
 * Created by Administrator on 14-2-28.
 */

/**
 * 获取介于min 与 max 之间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 *
 * @param min
 * @param max
 * @returns {number|string}
 */
function getRandomNum(min, max) {
    return Math.random() * (max - min + 1) + min;
}