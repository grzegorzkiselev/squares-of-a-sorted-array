var nums = Array
    .from({length: 1000000}, () => Math.ceil(Math.random() * 20) - 10)
    .sort((a, b) => a - b);

var sortedSquares = (nums) => {
    var leftPointer = 0;
    var rightPointer = nums.length - 1;
    var index = rightPointer;
    var result = [...nums];

    while (index > -1) {
        if (Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])) {
            result[index--] = nums[leftPointer] * nums[leftPointer];
            leftPointer++;
        } else {
            result[index--] = nums[rightPointer] * nums[rightPointer];
            rightPointer--;
        }
    }
    return result;
};

sortedSquares(nums)