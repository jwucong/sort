// 冒泡排序
function bubbleSort(array) {
  console.log('bubbleSort from book i--')
  var t1 = Date.now();
  var desk;
  for (var i = array.length - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      if (array[j] > array[j + 1]) {
        desk = array[j];
        array[j] = array[j + 1];
        array[j + 1] = desk;
      }
    }
  }
  console.log('delta: %o', Date.now() - t1);
  return array;
}


// 快速排序
function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }
  var pivotIndex = Math.floor(array.length / 2);
  var pivot = array.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < array.length; i++) {
    if (array[i] < pivot) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}


// 选择排序
function selectionSort(array) {
  var
    size = array.length,
    minIndex,
    minValue,
    i, j, desk;
  for (i = 0; i < size - 1; i++) {
    minIndex = i;
    minValue = array[minIndex];
    for (j = i + 1; j < size; j++) {
      if (array[j] < minValue) {
        minIndex = j;
        minValue = array[minIndex];
      }
    }
    desk = array[i];
    array[i] = minValue;
    array[minIndex] = desk;
  }
  return array;
}


// 堆排序
function heapSort(array) {
  function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  function maxHeapify(array, index, heapSize) {
    var iMax,
      iLeft,
      iRight;
    while (true) {
      iMax = index;
      iLeft = 2 * index + 1;
      iRight = 2 * (index + 1);
      if (iLeft < heapSize && array[index] < array[iLeft]) {
        iMax = iLeft;
      }
      if (iRight < heapSize && array[iMax] < array[iRight]) {
        iMax = iRight;
      }
      if (iMax != index) {
        swap(array, iMax, index);
        index = iMax;
      } else {
        break;
      }
    }
  }

  function buildMaxHeap(array) {
    var i,
      iParent = Math.floor(array.length / 2) - 1;
    for (i = iParent; i >= 0; i--) {
      maxHeapify(array, i, array.length);
    }
  }

  function sort(array) {
    buildMaxHeap(array);
    for (var i = array.length - 1; i > 0; i--) {
      swap(array, 0, i);
      maxHeapify(array, 0, i);
    }
    return array;
  }

  return sort(array);
}


// 插入排序
function insertionSort(array) {
  var
    size = array.length,
    i, j, desk;
  for (i = 1; i < size; i++) {
    desk = array[i];
    for (j = i; j >= 0; j--) {
      if (array[j - 1] > desk) {
        array[j] = array[j - 1];
      } else {
        array[j] = desk;
        break;
      }
    }
  }
  return array;
}


// 希尔排序
function shellSort(array) {
  function swap(array, i, j) {
    var desk = array[i];
    array[i] = array[j];
    array[j] = desk;
  }
  var
    size = array.length,
    gap = Math.floor(size / 2);
  while (gap > 0) {
    for (var i = gap; i < size; i++) {
      for (var j = i; 0 < j; j -= gap) {
        if (array[j - gap] > array[j]) {
          swap(array, j - gap, j);
        } else {
          break;
        }
      }
    }
    gap = Math.floor(gap / 2);
  }
  return array;
}


// 归并排序
function mergeSort(array) {
  function sort(array, first, last) {
    first = (first === undefined) ? 0 : first
    last = (last === undefined) ? array.length - 1 : last
    if (last - first < 1) {
      return;
    }
    var middle = Math.floor((first + last) / 2);
    sort(array, first, middle);
    sort(array, middle + 1, last);
    var f = first, m = middle, i, desk;
    while (f <= m && m + 1 <= last) {
      if (array[f] >= array[m + 1]) {
        desk = array[m + 1];
        for (i = m; i >= f; i--) {
          array[i + 1] = array[i];
        }
        array[f] = desk;
        m++
      } else {
        f++
      }
    }
    return array;
  }
  return sort(array);
}


// 摇摆排序
function shakerSort(array) {
  function swap(array, i, j) {
    var desk = array[i];
    array[i] = array[j];
    array[j] = desk;
  }
  var length = array.length,
    left = 0,
    right = length - 1,
    lastSwappedLeft = left,
    lastSwappedRight = right,
    i,
    j;
  while (left < right) {
    // 从左到右
    lastSwappedRight = 0;
    for (i = left; i < right; i++) {
      if (array[i] > array[i + 1]) {
        swap(array, i, i + 1);
        lastSwappedRight = i;
      }
    }
    right = lastSwappedRight;
    // 从右到左
    lastSwappedLeft = length - 1;
    for (j = right; left < j; j--) {
      if (array[j - 1] > array[j]) {
        swap(array, j - 1, j)
        lastSwappedLeft = j
      }
    }
    left = lastSwappedLeft;
  }
  return array;
}


// 猴子排序
function bogoSort(array) {
  function swap(array, i, j) {
    var desk = array[i];
    array[i] = array[j];
    array[j] = desk;
  }

  // 随机交换顺序
  function shuffle(array) {
    var i = 0, size = array.length;
    for (; i < size; i++) {
      var j = Math.floor(Math.random() * size)
      swap(array, i, j)
    }
  }

  // 判断是否已经排好序
  function isSorted(array) {
    var i = 1, size = array.length;
    for (; i < size; i++) {
      if (array[i - 1] > array[i]) {
        return false;
      }
    }
    return true;
  }

  var sorted = false;
  while (sorted === false) { // 效率低下的位置
    shuffle(array);
    sorted = isSorted(array);
  }
  return array;
}


// 桶排序
function bucketSort(array, step) {
  step = step || 1;
  var result = [],
    bucket = [],
    bucketCount,
    l = array.length,
    i,
    j,
    k,
    s,
    max = array[0],
    min = array[0],
    temp;
  for (i = 1; i < l; i++) {
    if (array[i] > max) {
      max = array[i]
    }
    if (array[i] < min) {
      min = array[i];
    }
  }
  min = min - 1;
  bucketCount = Math.ceil((max - min) / step); // 需要桶的数量
  for (i = 0; i < l; i++) {
    temp = array[i];
    for (j = 0; j < bucketCount; j++) {
      if (temp > (min + step * j) && temp <= (min + step * (j + 1))) {
        // 判断放入哪个桶
        if (!bucket[j]) {
          bucket[j] = [];
        }
        // 通过插入排序将数字插入到桶中的合适位置
        s = bucket[j].length;
        if (s > 0) {
          for (k = s - 1; k >= 0; k--) {
            if (bucket[j][k] > temp) {
              bucket[j][k + 1] = bucket[j][k];
            } else {
              break;
            }
          }
          bucket[j][k + 1] = temp;
        } else {
          bucket[j].push(temp);
        }
      }
    }
  }
  for (i = 0; i < bucketCount; i++) { // 循环取出桶中数据
    if (bucket[i]) {
      k = bucket[i].length;
      for (j = 0; j < k; j++) {
        result.push(bucket[i][j]);
      }
    }
  }
  return result;
}


// 基数排序
function radixSort(array) {
  var bucket = [],
    l = array.length,
    loop,
    str,
    i,
    j,
    k,
    t,
    max = array[0];
  for (i = 1; i < l; i++) {
    if (array[i] > max) {
      max = array[i]
    }
  }
  loop = (max + '').length;
  for (i = 0; i < 10; i++) {
    bucket[i] = [];
  }
  for (i = 0; i < loop; i++) {
    for (j = 0; j < l; j++) {
      str = array[j] + '';
      if (str.length >= i + 1) {
        k = parseInt(str[str.length - i - 1]);
        bucket[k].push(array[j]);
      } else { // 高位为 0
        bucket[0].push(array[j]);
      }
    }
    array.splice(0, l);
    for (j = 0; j < 10; j++) {
      t = bucket[j].length;
      for (k = 0; k < t; k++) {
        array.push(bucket[j][k]);
      }
      bucket[j] = [];
    }
  }
  return array;
}
