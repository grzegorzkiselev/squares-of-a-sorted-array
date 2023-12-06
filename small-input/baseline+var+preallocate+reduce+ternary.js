var nums = Array
    .from({length: 50000}, () => Math.ceil(Math.random() * 20) - 10)
    .sort((a, b) => a - b);

var sortedSquares = (nums) => {
    var size = nums.length;
    var leftPointer = 0;
    var rightPointer = size - 1;

    return nums.reduceRight((result, number, index) => {
        result[index] = Math.abs(nums[leftPointer]) > Math.abs(nums[rightPointer])
        ? nums[leftPointer] * nums[leftPointer++]
        : nums[rightPointer] * nums[rightPointer--]
        return result;
    }, [...nums]);
};

sortedSquares(nums)
