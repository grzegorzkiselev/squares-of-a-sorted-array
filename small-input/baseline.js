var nums = Array
    .from({length: 40000}, () => Math.ceil(Math.random() * 20) - 10)
    .sort((a, b) => a - b);

var sortedSquares = (nums) => {
    let leftPointer = 0;
    let rightPointer = nums.length - 1;
    let index = rightPointer;
    let result = [];

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