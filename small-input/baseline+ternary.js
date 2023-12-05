var nums = Array
    .from({length: 40000}, () => Math.ceil(Math.random() * 20) - 10)
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