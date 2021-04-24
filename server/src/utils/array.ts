/**
 * @public
 *
 * Given an array and itemToSearch params returns the
 * count of total occurrence of itemToSearch in array
 *
 * @param itemToSearch
 * @param array
 */
const totalOccurrenceOfItemInArray = (
  itemToSearch: string,
  array: string[]
) => {
  let count = 0;

  for (const item of array) {
    if (itemToSearch === item) {
      count += 1;
    }
  }

  return count;
};

/**
 * @public
 *
 * Given an input array returns most occurred item inside the
 * array along with the occurrence count
 *
 * @param array
 */
const mostCommonItemInArray = (array: string[]) => {
  const itemToCountMap: Record<string, number> = {};
  const itemWithMaxCount = { item: '', count: 0 };

  for (const item of array) {
    itemToCountMap[item] = itemToCountMap[item] ? itemToCountMap[item] + 1 : 1;

    if (itemWithMaxCount.count < itemToCountMap[item]) {
      itemWithMaxCount.item = item;
      itemWithMaxCount.count = itemToCountMap[item];
    }
  }

  return itemWithMaxCount;
};

export { mostCommonItemInArray, totalOccurrenceOfItemInArray };
