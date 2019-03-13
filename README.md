# <p id="list">排序算法</p>

01. <a href="#bubbleSort">冒泡排序(bubbleSort)</a>
02. <a href="#quickSort">快速排序(quickSort)</a>
03. <a href="#selectionSort">选择排序(selectionSort)</a>
04. <a href="#heapSort">堆排序(heapSort)</a>
05. <a href="#insertionSort">插入排序(insertionSort)</a>
06. <a href="#shellSort">希尔排序(shellSort)</a>
07. <a href="#mergeSort">归并排序(mergeSort)</a>
08. <a href="#shakerSort">摇摆排序(shakerSort)</a>
09. <a href="#bogoSort">猴子排序(bogoSort)</a>
10. <a href="#bucketSort">桶排序(bucketSort)</a>
11. <a href="#radixSort">基数排序(radixSort)</a>



01. <a id="bubbleSort" href="#list">**冒泡排序(bubbleSort)**</a>  
    > "冒泡"名字的由来是因为在该算法中，越小的元素经交换后慢慢"浮"到最前面。  
     
    **原理：**
    冒泡排序（Bubble Sort）是一种简单的排序算法。它重复地走访过要排序的数列，
    每次比较相邻的两个元素，如果左边的元素大于右边的元素，则交换位置，
    不断重复地进行比较，直到该数列已经排序完成。
    
    **时间复杂度：O(n<sup>2</sup>)**
    
    **算法流程：**  
        a. 比较相邻的元素。如果第一个比第二个大，则两元素互换位置；  
        b. 重复步骤a，直到比较完最后两个相邻的元素，此时，最后一个元素是最大的元素；  
        c. 重复步骤b，直到排序完成；
    
    **代码实现:**
    ```javascript
    function bubbleSort(array) {
      var n = array.length - 1, desk;
      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n - i; j++) {
          if (array[j] > array[j + 1]) {
            desk = array[j];
            array[j] = array[j + 1];
            array[j + 1] = desk;
          }
        }
      }
      return array;
    }
    ```

02. <a id="quickSort" href="#list">**快速排序(quickSort)**</a>  
    ```javascript
    function quickSort(array) {
      var size = array.length;
      if (size <= 1) {
        return array;
      }
      var
        index = Math.floor(size / 2),
        pivot = array.splice(index, 1)[0],
        left = [],
        right = [],
        n = array.length;
      for (var i = 0; i < n; i++) {
        if (array[i] < pivot) {
          left.push(array[i]);
        } else {
          right.push(array[i]);
        }
      }
      return quickSort(left).concat([pivot], quickSort(right));
    }
    ```
    
03. <a id="selectionSort" href="#list">**选择排序(selectionSort)**</a> 
    ```javascript
    function selectionSort(array) {
      var
        size = array.length,
        minIndex, minValue, i, j, desk;
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
    ```
    
04. <a id="heapSort" href="#list">**堆排序(heapSort)**</a> 
    ```javascript
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
    ```

05. <a id="insertionSort" href="#list">**插入排序(insertionSort)**</a>
    ```javascript
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
    ```
    
06. <a id="shellSort" href="#list">**希尔排序(shellSort)**</a>
    ```javascript
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
    ```
    
07. <a id="mergeSort" href="#list">**归并排序(mergeSort)**</a>
    ```javascript
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
    ```
    
08. <a id="shakerSort" href="#list">**摇摆排序(shakerSort)**</a>
    ```javascript
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
    ```
    
09. <a id="bogoSort" href="#list">**猴子排序(bogoSort)**</a>  
    >佛系随缘排序法，这、这、这就尴尬了...  
    猴子山中坐，锅从天上来，为什么受伤的总是猴子...
     
    **时间复杂度：随缘，O(∞)**
    
    ```javascript
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
    ```
    
10. <a id="bucketSort" href="#list">**桶排序(bucketSort)**</a>
    ```javascript
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
    ```
    
11. <a id="radixSort" href="#list">**基数排序(radixSort)**</a>
    ```javascript
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
    ```

