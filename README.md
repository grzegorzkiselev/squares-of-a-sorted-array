## Сама задача

[https://leetcode.com/problems/squares-of-a-sorted-array/description/](https://leetcode.com/problems/squares-of-a-sorted-array/description/)

## Начальный код

Я использовал код из [этого](https://leetcode.com/problems/squares-of-a-sorted-array/solutions/2672974/js-two-pointers-85-with-explanation/) решения, немного поправив наименования:

```js
var nums = Array
	.from({length: 1000000}, () => Math.ceil(Math.random() * 20) - 10)
	.sort((a, b) => a - b);

var sortedSquares = (nums) => {
	let start = 0;
	let end = nums.length - 1;
	let idx = end;
	let sortPowArr = [];
	
	while (idx > -1) {
  		if (Math.abs(nums[start]) > Math.abs(nums[end])) {
    			sortPowArr[idx--] = nums[start] * nums[start];
    			start++;
  		} else {
    			sortPowArr[idx--] = nums[end] * nums[end];
    			end--;
  		}
	}
	
	return sortPowArr;
};

sortedSquares(nums)
```


### Подход

Я решил протестировать несколько гипотез, которые могли бы сделать код быстрее.

Платформа macos64. Тестировал с помощью команды:
```bash
hyperfine "v8 ./filename.js"
```

#### 1. Использовать метод reduce вместо while:

код:

```js
var nums = Array
	.from({length: 1000000}, () => Math.ceil(Math.random() * 20) - 10)
	.sort((a, b) => a - b);

var sortedSquares = (nums) => {
	let size = nums.length;
	let leftPointer = 0;
	let rightPointer = size - 1;
	
	return nums.reduce((result, number, index) => {
		if (Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])) {
			result[size - 1 - index] = nums[leftPointer] * nums[leftPointer];
			leftPointer++;
		} else {
			result[size - 1 - index] = nums[rightPointer] * nums[rightPointer];
			rightPointer--;
		}
	
		return result;
	}, [])
};

sortedSquares(nums)
```

| Изначальный | Изначальный + reduce |
|-------------|----------------------|
| 374.6       | 376.0                |
| 367.6       | 377.7                |
| 369.6       | 376.1                |


Стало хуже, откатываюсь.

#### 2. Использовать тернарный оператор вместо if/else:

код:

```js
var nums = Array
	.from({length: 1000000}, () => Math.ceil(Math.random() * 20) - 10)
	.sort((a, b) => a - b);

var sortedSquares = (nums) => {
	let leftPointer = 0;
	let rightPointer = nums.length - 1;
	let index = rightPointer;	
	let result = [];

	while (index > -1) {
		result[index--] = Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])
		? nums[leftPointer] * nums[leftPointer++]
		: nums[rightPointer] * nums[rightPointer--]
	}
	return result;
};

sortedSquares(nums)
```

| Изначальный | Изначальный + тернарник |
|-------------|-------------------------|
| 367.4       | 369.9                   |
| 366.5       | 368.9                   |
| 367.3       | 366.7                   |


Похоже, что это погрешность.

#### 3. Использовать var вместо let:

| Изначальный | Изначальный + var |
|-------------|-------------------|
| 365.4       | 368.2             |
| 364.7       | 368.0             |
| 367.0       | 367.2             |

Тоже похоже на погрешность. Но останусь на var, потому что __должно__ быть не медленнее.

#### 4. Заранее выделить место под результирующий массив.

| Изначальный + var | Изначальный + var + предвыделенное место |
|-------------------|------------------------------------------|
| 365.9             | 322.2                                    |
| 367.1             | 322.1                                    |
| 366.0             | 325.3                                    |

Это уже похоже на улучшение производительности.

## Финальный код

```js
/**
* @param {number[]} nums
* @return {number[]}
*/

var sortedSquares = (nums) => {
  var leftPointer = 0;
  var rightPointer = nums.length - 1;
  var index = rightPointer;
  var result = [...nums];
  
  while (index >= 0) {
    if (Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])) {
      result[index--] = nums[leftPointer] * nums[leftPointer++];
    } else {
      result[index--] = nums[rightPointer] * nums[rightPointer--];
    }
  }
  
  return result;
};

```
