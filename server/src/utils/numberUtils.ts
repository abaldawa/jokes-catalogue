/**
 * User: abhijit.baldawa
 *
 * Numbers util module
 */

/**
 * @private
 *
 * This method returns random number between 'min' (inclusive) and 'max' (inclusive)
 *
 * @param {Number} min - start number of the range which is inclusive
 * @param {Number} max - end number of the range which is inclusive
 * @returns {Number} random number
 */
const getRandomInt = (min: number, max: number): number => {
  const start = Math.ceil(min);
  const end = Math.floor(max);
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

/**
 * @public
 *
 * Given 'arrOfIds' extracts and returns array of unique ids from it
 * based on 'start' and 'end' index and 'size' params.
 *
 * @param arrOfIds - array of unique ids
 * @param start - start number of the range which is inclusive
 * @param end - end number of the range which is inclusive
 * @param size - Length of array
 */
const getRandomUniqueIds = (
  arrOfIds: string[],
  start: number,
  end: number,
  size: number
): string[] => {
  const arrayOfUniqueExtractedIds: string[] = [];

  while (arrayOfUniqueExtractedIds.length < size) {
    const newId = arrOfIds[getRandomInt(start, end)];

    if (!arrayOfUniqueExtractedIds.includes(newId)) {
      arrayOfUniqueExtractedIds.push(newId);
    }
  }

  return arrayOfUniqueExtractedIds;
};

export { getRandomUniqueIds };
