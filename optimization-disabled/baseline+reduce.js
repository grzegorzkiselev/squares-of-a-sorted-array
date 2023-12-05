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

%NeverOptimizeFunction(sortedSquares)
sortedSquares(nums)