import { CodingQuestion } from '../types/coding';

export const CODING_QUESTIONS: CodingQuestion[] = [
  // ==========================================
  // 1. ARRAYS (5 Questions)
  // ==========================================
  {
    id: 'arr-1-largest-element',
    title: 'Find the Largest Element in an Array',
    topic: 'arrays',
    difficulty: 'Easy',
    tags: ['Arrays', 'Fundamentals', 'Traversal'],
    description: `Given an integer array \`nums\` of size \`n\`, find and return the largest element present in the array.

Your algorithm should examine the elements and determine the maximum value with an optimal single-pass traversal.`,
    inputFormat: `The first line contains an integer \`n\` representing the size of the array.
The second line contains \`n\` space-separated integers representing the array elements.`,
    outputFormat: `Print a single integer representing the maximum value found in the array.`,
    constraints: [
      '1 <= n <= 10^5',
      '-10^9 <= nums[i] <= 10^9',
    ],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: [
      'Initialize a variable `maxVal` with the first element of the array.',
      'Iterate through the rest of the array from index 1 to n-1.',
      'If any element is greater than `maxVal`, update `maxVal`.',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

int findLargestElement(int n, const vector<int>& nums) {
    // Write your code here
    int maxVal = nums[0];
    for (int i = 1; i < n; ++i) {
        if (nums[i] > maxVal) {
            maxVal = nums[i];
        }
    }
    return maxVal;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << findLargestElement(n, nums) << endl;
    return 0;
}`,
      python: `import sys

def find_largest_element(n, nums):
    # Write your code here
    max_val = nums[0]
    for x in nums[1:]:
        if x > max_val:
            max_val = x
    return max_val

def main():
    input_data = sys.stdin.read().split()
    if not input_data:
        return
    n = int(input_data[0])
    nums = [int(x) for x in input_data[1:n+1]]
    print(find_largest_element(n, nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');

function findLargestElement(n, nums) {
    let maxVal = nums[0];
    for (let i = 1; i < n; i++) {
        if (nums[i] > maxVal) maxVal = nums[i];
    }
    return maxVal;
}

const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    console.log(findLargestElement(n, nums));
}`,
    },
    sampleCases: [
      {
        id: 'arr-1-s1',
        input: '5\n1 8 7 56 90',
        expectedOutput: '90',
        isSample: true,
        explanation: 'The maximum value among [1, 8, 7, 56, 90] is 90.',
      },
      {
        id: 'arr-1-s2',
        input: '4\n-10 -40 -25 -2',
        expectedOutput: '-2',
        isSample: true,
        explanation: 'All elements are negative. The largest is -2.',
      },
    ],
    hiddenTestCases: [
      { id: 'arr-1-h1', input: '1\n42', expectedOutput: '42', isSample: false },
      { id: 'arr-1-h2', input: '6\n5 5 5 5 5 5', expectedOutput: '5', isSample: false },
      { id: 'arr-1-h3', input: '7\n100 20 30 40 50 60 70', expectedOutput: '100', isSample: false },
      { id: 'arr-1-h4', input: '5\n-5 0 10 -20 15', expectedOutput: '15', isSample: false },
      { id: 'arr-1-h5', input: '8\n-1000000000 0 50000 999999999 -4 10 20 1000000000', expectedOutput: '1000000000', isSample: false },
    ],
  },
  {
    id: 'arr-2-second-largest',
    title: 'Find the Second Largest Distinct Element',
    topic: 'arrays',
    difficulty: 'Easy',
    tags: ['Arrays', 'Logic'],
    description: `Given an array of integers \`nums\` of size \`n\`, find the second largest distinct element in the array.
If no second largest distinct element exists (for example, if all elements are identical), return \`-1\`.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the second largest distinct element, or \`-1\` if it does not exist.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: [
      'Maintain two variables: `largest` and `secondLargest`.',
      'If the current element is greater than `largest`, update `secondLargest = largest` and `largest = current`.',
      'If it is smaller than `largest` but greater than `secondLargest`, update `secondLargest`.',
    ],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <climits>
using namespace std;

long long findSecondLargest(int n, const vector<long long>& nums) {
    if (n < 2) return -1;
    long long largest = -3e18, secondLargest = -3e18;
    for (long long x : nums) {
        if (x > largest) {
            secondLargest = largest;
            largest = x;
        } else if (x < largest && x > secondLargest) {
            secondLargest = x;
        }
    }
    return (secondLargest <= -2e18) ? -1 : secondLargest;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << findSecondLargest(n, nums) << endl;
    return 0;
}`,
      python: `import sys

def find_second_largest(n, nums):
    largest = -float('inf')
    second_largest = -float('inf')
    for x in nums:
        if x > largest:
            second_largest = largest
            largest = x
        elif largest > x > second_largest:
            second_largest = x
    return second_largest if second_largest != -float('inf') else -1

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    print(find_second_largest(n, nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    let largest = -Infinity, second = -Infinity;
    for (const x of nums) {
        if (x > largest) {
            second = largest;
            largest = x;
        } else if (x < largest && x > second) {
            second = x;
        }
    }
    console.log(second === -Infinity ? -1 : second);
}`,
    },
    sampleCases: [
      { id: 'arr-2-s1', input: '6\n12 35 1 10 34 1', expectedOutput: '34', isSample: true, explanation: 'The largest is 35 and the second largest distinct is 34.' },
      { id: 'arr-2-s2', input: '3\n10 10 10', expectedOutput: '-1', isSample: true, explanation: 'All elements are identical, so there is no distinct second largest.' },
    ],
    hiddenTestCases: [
      { id: 'arr-2-h1', input: '2\n5 10', expectedOutput: '5', isSample: false },
      { id: 'arr-2-h2', input: '5\n-5 -2 -1 -20 -3', expectedOutput: '-2', isSample: false },
      { id: 'arr-2-h3', input: '1\n100', expectedOutput: '-1', isSample: false },
      { id: 'arr-2-h4', input: '7\n4 4 4 3 2 1 4', expectedOutput: '3', isSample: false },
      { id: 'arr-2-h5', input: '4\n100 200 200 150', expectedOutput: '150', isSample: false },
    ],
  },
  {
    id: 'arr-3-reverse-array',
    title: 'Reverse an Array In-Place',
    topic: 'arrays',
    difficulty: 'Easy',
    tags: ['Arrays', 'Two Pointers'],
    description: `Given an array \`nums\` of size \`n\`, reverse the array in-place using the two-pointer technique.
Print the reversed array elements separated by spaces.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the reversed array elements separated by a space.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Place one pointer `left = 0` and another pointer `right = n - 1`.', 'Swap `nums[left]` and `nums[right]`, then increment `left` and decrement `right` until `left >= right`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    int left = 0, right = n - 1;
    while (left < right) {
        swap(nums[left++], nums[right--]);
    }

    for (int i = 0; i < n; ++i) {
        cout << nums[i] << (i + 1 == n ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    left, right = 0, n - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1
    print(*(nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    let l = 0, r = n - 1;
    while (l < r) {
        let temp = nums[l];
        nums[l] = nums[r];
        nums[r] = temp;
        l++; r--;
    }
    console.log(nums.join(' '));
}`,
    },
    sampleCases: [
      { id: 'arr-3-s1', input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', isSample: true, explanation: 'Reversing [1, 2, 3, 4, 5] yields [5, 4, 3, 2, 1].' },
      { id: 'arr-3-s2', input: '2\n10 20', expectedOutput: '20 10', isSample: true, explanation: 'Reversing [10, 20] yields [20, 10].' },
    ],
    hiddenTestCases: [
      { id: 'arr-3-h1', input: '1\n99', expectedOutput: '99', isSample: false },
      { id: 'arr-3-h2', input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1', isSample: false },
      { id: 'arr-3-h3', input: '6\n1 0 1 0 1 0', expectedOutput: '0 1 0 1 0 1', isSample: false },
      { id: 'arr-3-h4', input: '3\n7 7 7', expectedOutput: '7 7 7', isSample: false },
      { id: 'arr-3-h5', input: '5\n10 0 -10 50 -100', expectedOutput: '-100 50 -10 sloved -> -10 0 10'.replace('sloved -> ', ''), isSample: false },
    ],
  },
  {
    id: 'arr-4-remove-duplicates',
    title: 'Remove Duplicates from Sorted Array',
    topic: 'arrays',
    difficulty: 'Easy',
    tags: ['Arrays', 'Two Pointers'],
    description: `Given an integer array \`nums\` sorted in non-decreasing order, remove the duplicates in-place such that each unique element appears only once.
Print the number of unique elements \`k\`, followed on the next line by the first \`k\` unique elements separated by space.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers in non-decreasing order.`,
    outputFormat: `First line: integer \`k\` (count of unique elements).
Second line: the \`k\` unique elements separated by spaces.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Since the array is already sorted, duplicate elements will be adjacent.', 'Use a write pointer `k = 1`. Whenever `nums[i] != nums[k-1]`, copy `nums[k] = nums[i]` and advance `k`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }

    int k = 1;
    for (int i = 1; i < n; ++i) {
        if (nums[i] != nums[k - 1]) {
            nums[k++] = nums[i];
        }
    }

    cout << k << endl;
    for (int i = 0; i < k; ++i) {
        cout << nums[i] << (i + 1 == k ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    if n == 0:
        print(0)
        return
    k = 1
    for i in range(1, n):
        if nums[i] != nums[k - 1]:
            nums[k] = nums[i]
            k += 1
    print(k)
    print(*(nums[:k]))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    if (n === 0) {
        console.log(0);
        process.exit(0);
    }
    let k = 1;
    for (let i = 1; i < n; i++) {
        if (nums[i] !== nums[k - 1]) {
            nums[k++] = nums[i];
        }
    }
    console.log(k);
    console.log(nums.slice(0, k).join(' '));
}`,
    },
    sampleCases: [
      { id: 'arr-4-s1', input: '6\n1 1 2 2 3 4', expectedOutput: '4\n1 2 3 4', isSample: true, explanation: 'The 4 unique elements are 1, 2, 3, 4.' },
      { id: 'arr-4-s2', input: '3\n0 0 0', expectedOutput: '1\n0', isSample: true, explanation: 'Only 0 is unique.' },
    ],
    hiddenTestCases: [
      { id: 'arr-4-h1', input: '1\n10', expectedOutput: '1\n10', isSample: false },
      { id: 'arr-4-h2', input: '5\n1 2 3 4 5', expectedOutput: '5\n1 2 3 4 5', isSample: false },
      { id: 'arr-4-h3', input: '5\n-3 -3 -1 0 0', expectedOutput: '3\n-3 -1 0', isSample: false },
      { id: 'arr-4-h4', input: '4\n-10 -10 -10 -10', expectedOutput: '1\n-10', isSample: false },
      { id: 'arr-4-h5', input: '7\n1 2 2 2 3 3 4', expectedOutput: '4\n1 2 3 4', isSample: false },
    ],
  },
  {
    id: 'arr-5-two-sum',
    title: 'Two Sum — Pair with Target Sum',
    topic: 'arrays',
    difficulty: 'Medium',
    tags: ['Arrays', 'Hash Map', 'Two Pointers'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, find the 0-based indices of two distinct elements that sum to \`target\`.
Print the two indices in increasing order separated by a space. It is guaranteed that exactly one valid solution exists.`,
    inputFormat: `The first line contains two integers \`n\` and \`target\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the two 0-based indices separated by a space (e.g. \`0 1\`).`,
    constraints: ['2 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9', '-2 * 10^9 <= target <= 2 * 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Use an unordered_map / dictionary to store each value and its index as you iterate.', 'For each number `x`, check if `target - x` is already present in the map.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    long long target;
    if (!(cin >> n >> target)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    unordered_map<long long, int> seen;
    for (int i = 0; i < n; ++i) {
        long long complement = target - nums[i];
        if (seen.find(complement) != seen.end()) {
            int idx1 = seen[complement];
            int idx2 = i;
            if (idx1 > idx2) swap(idx1, idx2);
            cout << idx1 << " " << idx2 << endl;
            return 0;
        }
        seen[nums[i]] = i;
    }
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    target = int(data[1])
    nums = [int(x) for x in data[2:n+2]]

    seen = {}
    for i, x in enumerate(nums):
        comp = target - x
        if comp in seen:
            print(f"{seen[comp]} {i}")
            return
        seen[x] = i

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    const seen = new Map();
    for (let i = 0; i < n; i++) {
        const comp = target - nums[i];
        if (seen.has(comp)) {
            console.log(seen.get(comp) + ' ' + i);
            process.exit(0);
        }
        seen.set(nums[i], i);
    }
}`,
    },
    sampleCases: [
      { id: 'arr-5-s1', input: '4 9\n2 7 11 15', expectedOutput: '0 1', isSample: true, explanation: 'nums[0] + nums[1] = 2 + 7 = 9.' },
      { id: 'arr-5-s2', input: '3 6\n3 2 4', expectedOutput: '1 2', isSample: true, explanation: 'nums[1] + nums[2] = 2 + 4 = 6.' },
    ],
    hiddenTestCases: [
      { id: 'arr-5-h1', input: '2 6\n3 3', expectedOutput: '0 1', isSample: false },
      { id: 'arr-5-h2', input: '5 0\n-5 2 5 -2 10', expectedOutput: '0 2', isSample: false },
      { id: 'arr-5-h3', input: '4 -8\n-2 -6 10 4', expectedOutput: '0 1', isSample: false },
      { id: 'arr-5-h4', input: '5 100\n10 20 30 70 80', expectedOutput: '2 3', isSample: false },
      { id: 'arr-5-h5', input: '6 14\n1 4 6 7 8 10', expectedOutput: '2 4', isSample: false },
    ],
  },

  // ==========================================
  // 2. SEARCHING (5 Questions)
  // ==========================================
  {
    id: 'search-1-linear-search',
    title: 'Implement Linear Search',
    topic: 'searching',
    difficulty: 'Easy',
    tags: ['Searching', 'Linear Scan'],
    description: `Given an array \`nums\` of size \`n\` and a target value \`target\`, find the 0-based index of the first occurrence of \`target\`.
If \`target\` is not present in \`nums\`, return \`-1\`.`,
    inputFormat: `The first line contains \`n\` and \`target\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the 0-based index of the target, or \`-1\` if not found.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Loop from i = 0 to n - 1.', 'If nums[i] == target, immediately return or print i and stop.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    int ans = -1;
    for (int i = 0; i < n; ++i) {
        cin >> nums[i];
        if (ans == -1 && nums[i] == target) {
            ans = i;
        }
    }
    cout << ans << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    for i in range(n):
        if nums[i] == target:
            print(i)
            return
    print(-1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    let ans = -1;
    for (let i = 0; i < n; i++) {
        if (nums[i] === target) { ans = i; break; }
    }
    console.log(ans);
}`,
    },
    sampleCases: [
      { id: 'srch-1-s1', input: '5 7\n1 3 5 7 9', expectedOutput: '3', isSample: true, explanation: '7 is at index 3.' },
      { id: 'srch-1-s2', input: '4 10\n2 4 6 8', expectedOutput: '-1', isSample: true, explanation: '10 is not in the array.' },
    ],
    hiddenTestCases: [
      { id: 'srch-1-h1', input: '1 5\n5', expectedOutput: '0', isSample: false },
      { id: 'srch-1-h2', input: '4 2\n2 2 2 2', expectedOutput: '0', isSample: false },
      { id: 'srch-1-h3', input: '5 -5\n10 20 -5 30 40', expectedOutput: '2', isSample: false },
      { id: 'srch-1-h4', input: '3 99\n10 20 30', expectedOutput: '-1', isSample: false },
      { id: 'srch-1-h5', input: '6 100\n1 2 3 4 5 100', expectedOutput: '5', isSample: false },
    ],
  },
  {
    id: 'search-2-binary-search',
    title: 'Binary Search on a Sorted Array',
    topic: 'searching',
    difficulty: 'Easy',
    tags: ['Binary Search', 'Divide and Conquer'],
    description: `Given a sorted array of integers \`nums\` in ascending order and an integer \`target\`, search for \`target\` using Binary Search.
Return the 0-based index if \`target\` exists; otherwise, return \`-1\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    inputFormat: `First line contains \`n\` and \`target\`.
Second line contains \`n\` sorted integers.`,
    outputFormat: `Print the 0-based index or \`-1\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Set `low = 0` and `high = n - 1`.', 'Calculate `mid = low + (high - low) / 2`.', 'If `nums[mid] == target`, return `mid`. If `nums[mid] < target`, `low = mid + 1`. Else `high = mid - 1`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int binarySearch(int n, const vector<int>& nums, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << binarySearch(n, nums, target) << endl;
    return 0;
}`,
      python: `import sys

def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    print(binary_search(nums, target))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    let low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) { ans = mid; break; }
        else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    console.log(ans);
}`,
    },
    sampleCases: [
      { id: 'srch-2-s1', input: '6 9\n-1 0 3 5 9 12', expectedOutput: '4', isSample: true, explanation: '9 exists at index 4.' },
      { id: 'srch-2-s2', input: '6 2\n-1 0 3 5 9 12', expectedOutput: '-1', isSample: true, explanation: '2 does not exist in nums.' },
    ],
    hiddenTestCases: [
      { id: 'srch-2-h1', input: '1 5\n5', expectedOutput: '0', isSample: false },
      { id: 'srch-2-h2', input: '1 3\n5', expectedOutput: '-1', isSample: false },
      { id: 'srch-2-h3', input: '5 -10\n-20 -15 -10 -5 0', expectedOutput: '2', isSample: false },
      { id: 'srch-2-h4', input: '5 50\n10 20 30 40 50', expectedOutput: '4', isSample: false },
      { id: 'srch-2-h5', input: '5 10\n10 20 30 40 50', expectedOutput: '0', isSample: false },
    ],
  },
  {
    id: 'search-3-first-occurrence',
    title: 'Find First Occurrence in Sorted Array',
    topic: 'searching',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Lower Bound'],
    description: `Given a sorted array \`nums\` of \`n\` integers that may contain duplicates, find the 0-based index of the FIRST occurrence of \`target\`.
If the target is not present, return \`-1\`.`,
    inputFormat: `First line contains \`n\` and \`target\`.
Second line contains \`n\` space-separated integers in sorted order.`,
    outputFormat: `Print the index of the first occurrence of target or \`-1\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['When nums[mid] == target, save mid as a candidate answer and continue searching left: `high = mid - 1`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findFirstOccurrence(int n, const vector<int>& nums, int target) {
    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            ans = mid;
            high = mid - 1; // Keep searching left for earlier occurrence
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return ans;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << findFirstOccurrence(n, nums, target) << endl;
    return 0;
}`,
      python: `import sys

def first_occurrence(nums, target):
    low, high, ans = 0, len(nums) - 1, -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            high = mid - 1
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return ans

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    print(first_occurrence(nums, target))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    let low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (nums[mid] === target) {
            ans = mid;
            high = mid - 1;
        } else if (nums[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    console.log(ans);
}`,
    },
    sampleCases: [
      { id: 'srch-3-s1', input: '7 2\n1 2 2 2 3 4 5', expectedOutput: '1', isSample: true, explanation: 'Target 2 first appears at index 1.' },
      { id: 'srch-3-s2', input: '5 6\n1 2 3 4 5', expectedOutput: '-1', isSample: true, explanation: '6 is not present.' },
    ],
    hiddenTestCases: [
      { id: 'srch-3-h1', input: '5 4\n4 4 4 4 4', expectedOutput: '0', isSample: false },
      { id: 'srch-3-h2', input: '4 10\n1 2 3 10', expectedOutput: '3', isSample: false },
      { id: 'srch-3-h3', input: '6 -2\n-5 -2 -2 0 1 2', expectedOutput: '1', isSample: false },
      { id: 'srch-3-h4', input: '1 7\n7', expectedOutput: '0', isSample: false },
      { id: 'srch-3-h5', input: '8 8\n2 4 6 8 8 8 9 10', expectedOutput: '3', isSample: false },
    ],
  },
  {
    id: 'search-4-count-occurrences',
    title: 'Count Occurrences in a Sorted Array',
    topic: 'searching',
    difficulty: 'Medium',
    tags: ['Binary Search', 'Divide and Conquer'],
    description: `Given a sorted array of integers \`nums\` and an integer \`target\`, count the total number of times \`target\` appears in \`nums\`.
Solve in \`O(log n)\` time using binary search.`,
    inputFormat: `First line contains \`n\` and \`target\`.
Second line contains \`n\` space-separated integers in sorted order.`,
    outputFormat: `Print an integer representing the frequency of \`target\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Find the first occurrence index `first` and the last occurrence index `last` using binary search.', 'The count is `last - first + 1` if target is present, else 0.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int findBound(int n, const vector<int>& nums, int target, bool first) {
    int low = 0, high = n - 1, ans = -1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) {
            ans = mid;
            if (first) high = mid - 1;
            else low = mid + 1;
        } else if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return ans;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    int first = findBound(n, nums, target, true);
    if (first == -1) {
        cout << 0 << endl;
    } else {
        int last = findBound(n, nums, target, false);
        cout << (last - first + 1) << endl;
    }
    return 0;
}`,
      python: `import sys

def find_bound(nums, target, is_first):
    low, high, ans = 0, len(nums) - 1, -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            if is_first: high = mid - 1
            else: low = mid + 1
        elif nums[mid] < target: low = mid + 1
        else: high = mid - 1
    return ans

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    first = find_bound(nums, target, True)
    if first == -1:
        print(0)
    else:
        last = find_bound(nums, target, False)
        print(last - first + 1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);

    function findBound(first) {
        let l = 0, r = n - 1, ans = -1;
        while (l <= r) {
            const m = Math.floor((l + r) / 2);
            if (nums[m] === target) {
                ans = m;
                if (first) r = m - 1;
                else l = m + 1;
            } else if (nums[m] < target) l = m + 1;
            else r = m - 1;
        }
        return ans;
    }

    const first = findBound(true);
    if (first === -1) console.log(0);
    else console.log(findBound(false) - first + 1);
}`,
    },
    sampleCases: [
      { id: 'srch-4-s1', input: '7 2\n1 1 2 2 2 2 3', expectedOutput: '4', isSample: true, explanation: '2 appears 4 times.' },
      { id: 'srch-4-s2', input: '5 10\n1 2 3 4 5', expectedOutput: '0', isSample: true, explanation: '10 appears 0 times.' },
    ],
    hiddenTestCases: [
      { id: 'srch-4-h1', input: '1 5\n5', expectedOutput: '1', isSample: false },
      { id: 'srch-4-h2', input: '6 3\n3 3 3 3 3 3', expectedOutput: '6', isSample: false },
      { id: 'srch-4-h3', input: '6 -1\n-5 -3 -1 -1 0 2', expectedOutput: '2', isSample: false },
      { id: 'srch-4-h4', input: '4 7\n1 2 3 7', expectedOutput: '1', isSample: false },
      { id: 'srch-4-h5', input: '5 0\n-2 -1 0 1 2', expectedOutput: '1', isSample: false },
    ],
  },
  {
    id: 'search-5-search-insert-position',
    title: 'Search Insert Position',
    topic: 'searching',
    difficulty: 'Easy',
    tags: ['Binary Search'],
    description: `Given a sorted array of distinct integers \`nums\` and a target value \`target\`, return the index if the target is found.
If not, return the index where it would be if it were inserted in order. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    inputFormat: `First line contains \`n\` and \`target\`.
Second line contains \`n\` distinct sorted integers.`,
    outputFormat: `Print the 0-based insert index.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i], target <= 10^9'],
    expectedTimeComplexity: 'O(log n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Run standard binary search. If the target is not found, the variable `low` points exactly to the insertion position!'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int searchInsert(int n, const vector<int>& nums, int target) {
    int low = 0, high = n - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (nums[mid] == target) return mid;
        if (nums[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    cout << searchInsert(n, nums, target) << endl;
    return 0;
}`,
      python: `import sys

def search_insert(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return low

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    print(search_insert(nums, target))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    let l = 0, r = n - 1;
    while (l <= r) {
        const m = Math.floor((l + r) / 2);
        if (nums[m] === target) { console.log(m); process.exit(0); }
        else if (nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    console.log(l);
}`,
    },
    sampleCases: [
      { id: 'srch-5-s1', input: '4 5\n1 3 5 6', expectedOutput: '2', isSample: true, explanation: '5 is found at index 2.' },
      { id: 'srch-5-s2', input: '4 2\n1 3 5 6', expectedOutput: '1', isSample: true, explanation: '2 is inserted between 1 and 3 at index 1.' },
    ],
    hiddenTestCases: [
      { id: 'srch-5-h1', input: '4 7\n1 3 5 6', expectedOutput: '4', isSample: false },
      { id: 'srch-5-h2', input: '4 0\n1 3 5 6', expectedOutput: '0', isSample: false },
      { id: 'srch-5-h3', input: '1 0\n0', expectedOutput: '0', isSample: false },
      { id: 'srch-5-h4', input: '3 4\n1 3 5', expectedOutput: '2', isSample: false },
      { id: 'srch-5-h5', input: '5 25\n10 20 30 40 50', expectedOutput: '2', isSample: false },
    ],
  },

  // ==========================================
  // 3. SORTING (5 Questions)
  // ==========================================
  {
    id: 'sort-1-bubble-sort',
    title: 'Implement Bubble Sort',
    topic: 'sorting',
    difficulty: 'Easy',
    tags: ['Sorting', 'Comparison Sort'],
    description: `Given an array of \`n\` integers, sort the array in ascending order using the Bubble Sort algorithm.
Print the sorted array elements separated by spaces.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the sorted array elements separated by a space.`,
    constraints: ['1 <= n <= 1000', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n^2)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Perform n - 1 passes. In each pass, swap adjacent elements if nums[j] > nums[j+1].', 'Add a swapped flag to terminate early if no swaps occurred in a pass.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void bubbleSort(int n, vector<int>& nums) {
    for (int i = 0; i < n - 1; ++i) {
        bool swapped = false;
        for (int j = 0; j < n - 1 - i; ++j) {
            if (nums[j] > nums[j + 1]) {
                swap(nums[j], nums[j + 1]);
                swapped = true;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];
    bubbleSort(n, nums);
    for (int i = 0; i < n; ++i) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << endl;
    return 0;
}`,
      python: `import sys

def bubble_sort(n, nums):
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if nums[j] > nums[j + 1]:
                nums[j], nums[j + 1] = nums[j + 1], nums[j]
                swapped = True
        if not swapped:
            break
    return nums

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    sorted_nums = bubble_sort(n, nums)
    print(*(sorted_nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (nums[j] > nums[j + 1]) {
                let temp = nums[j];
                nums[j] = nums[j + 1];
                nums[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    console.log(nums.join(' '));
}`,
    },
    sampleCases: [
      { id: 'srt-1-s1', input: '5\n5 1 4 2 8', expectedOutput: '1 2 4 5 8', isSample: true, explanation: 'Sorted order is [1, 2, 4, 5, 8].' },
      { id: 'srt-1-s2', input: '3\n3 2 1', expectedOutput: '1 2 3', isSample: true, explanation: 'Sorted order is [1, 2, 3].' },
    ],
    hiddenTestCases: [
      { id: 'srt-1-h1', input: '1\n10', expectedOutput: '10', isSample: false },
      { id: 'srt-1-h2', input: '4\n-1 -5 2 0', expectedOutput: '-5 -1 0 2', isSample: false },
      { id: 'srt-1-h3', input: '5\n2 2 2 2 2', expectedOutput: '2 2 2 2 2', isSample: false },
      { id: 'srt-1-h4', input: '6\n10 9 8 7 6 5', expectedOutput: '5 6 7 8 9 10', isSample: false },
      { id: 'srt-1-h5', input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', isSample: false },
    ],
  },
  {
    id: 'sort-2-selection-sort',
    title: 'Implement Selection Sort',
    topic: 'sorting',
    difficulty: 'Easy',
    tags: ['Sorting', 'In-Place'],
    description: `Given an array of \`n\` integers, sort the array in ascending order using Selection Sort.
Print the sorted array.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the sorted array separated by spaces.`,
    constraints: ['1 <= n <= 1000', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n^2)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['For each index i from 0 to n-2, find the index of the minimum element in nums[i...n-1] and swap it with nums[i].'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    for (int i = 0; i < n - 1; ++i) {
        int minIdx = i;
        for (int j = i + 1; j < n; ++j) {
            if (nums[j] < nums[minIdx]) minIdx = j;
        }
        swap(nums[i], nums[minIdx]);
    }

    for (int i = 0; i < n; ++i) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if nums[j] < nums[min_idx]:
                min_idx = j
        nums[i], nums[min_idx] = nums[min_idx], nums[i]
    print(*(nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[minIdx]) minIdx = j;
        }
        let temp = nums[i];
        nums[i] = nums[minIdx];
        nums[minIdx] = temp;
    }
    console.log(nums.join(' '));
}`,
    },
    sampleCases: [
      { id: 'srt-2-s1', input: '5\n64 25 12 22 11', expectedOutput: '11 12 22 25 64', isSample: true, explanation: 'Selection sort orders from minimum to maximum.' },
      { id: 'srt-2-s2', input: '4\n4 3 2 1', expectedOutput: '1 2 3 4', isSample: true, explanation: 'Sorted order is 1 2 3 4.' },
    ],
    hiddenTestCases: [
      { id: 'srt-2-h1', input: '1\n5', expectedOutput: '5', isSample: false },
      { id: 'srt-2-h2', input: '5\n0 -1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1 0', isSample: false },
      { id: 'srt-2-h3', input: '3\n5 5 5', expectedOutput: '5 5 5', isSample: false },
      { id: 'srt-2-h4', input: '6\n10 2 8 6 7 3', expectedOutput: '2 3 6 7 8 10', isSample: false },
      { id: 'srt-2-h5', input: '4\n-10 10 -20 20', expectedOutput: '-20 -10 10 20', isSample: false },
    ],
  },
  {
    id: 'sort-3-insertion-sort',
    title: 'Implement Insertion Sort',
    topic: 'sorting',
    difficulty: 'Easy',
    tags: ['Sorting', 'Adaptive'],
    description: `Given an array of \`n\` integers, sort the array in ascending order using Insertion Sort.
Print the sorted array.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the sorted array separated by spaces.`,
    constraints: ['1 <= n <= 1000', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n^2)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Pick each element `key = nums[i]`, then shift larger elements to the right before placing `key` in its correct sorted position.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    for (int i = 1; i < n; ++i) {
        int key = nums[i];
        int j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }

    for (int i = 0; i < n; ++i) cout << nums[i] << (i + 1 == n ? "" : " ");
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    for i in range(1, n):
        key = nums[i]
        j = i - 1
        while j >= 0 and nums[j] > key:
            nums[j + 1] = nums[j]
            j -= 1
        nums[j + 1] = key
    print(*(nums))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    for (let i = 1; i < n; i++) {
        const key = nums[i];
        let j = i - 1;
        while (j >= 0 && nums[j] > key) {
            nums[j + 1] = nums[j];
            j--;
        }
        nums[j + 1] = key;
    }
    console.log(nums.join(' '));
}`,
    },
    sampleCases: [
      { id: 'srt-3-s1', input: '6\n12 11 13 5 6 7', expectedOutput: '5 6 7 11 12 13', isSample: true, explanation: 'Insertion sort places 5, 6, 7 in front.' },
      { id: 'srt-3-s2', input: '3\n2 1 3', expectedOutput: '1 2 3', isSample: true, explanation: 'Sorted order is 1 2 3.' },
    ],
    hiddenTestCases: [
      { id: 'srt-3-h1', input: '1\n42', expectedOutput: '42', isSample: false },
      { id: 'srt-3-h2', input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'srt-3-h3', input: '5\n5 4 3 2 1', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'srt-3-h4', input: '4\n-1 -3 -2 0', expectedOutput: '-3 -2 -1 0', isSample: false },
      { id: 'srt-3-h5', input: '5\n10 10 10 10 10', expectedOutput: '10 10 10 10 10', isSample: false },
    ],
  },
  {
    id: 'sort-4-merge-sorted-arrays',
    title: 'Merge Two Sorted Arrays',
    topic: 'sorting',
    difficulty: 'Easy',
    tags: ['Two Pointers', 'Merge Sort'],
    description: `Given two sorted arrays \`A\` of size \`n\` and \`B\` of size \`m\`, merge them into a single sorted array of size \`n + m\`.
Print the merged sorted elements separated by spaces.`,
    inputFormat: `The first line contains \`n\` and \`m\`.
The second line contains \`n\` sorted integers for \`A\`.
The third line contains \`m\` sorted integers for \`B\`.`,
    outputFormat: `Print the merged sorted array on a single line.`,
    constraints: ['1 <= n, m <= 5 * 10^4', '-10^9 <= A[i], B[j] <= 10^9'],
    expectedTimeComplexity: 'O(n + m)',
    expectedSpaceComplexity: 'O(n + m)',
    hints: ['Use two pointers `i` and `j` starting at 0 for both arrays.', 'Compare A[i] and B[j], append the smaller element to the result, and advance its pointer.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    vector<int> A(n), B(m);
    for (int i = 0; i < n; ++i) cin >> A[i];
    for (int i = 0; i < m; ++i) cin >> B[i];

    vector<int> res;
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (A[i] <= B[j]) res.push_back(A[i++]);
        else res.push_back(B[j++]);
    }
    while (i < n) res.push_back(A[i++]);
    while (j < m) res.push_back(B[j++]);

    for (int k = 0; k < (int)res.size(); ++k) {
        cout << res[k] << (k + 1 == (int)res.size() ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, m = int(data[0]), int(data[1])
    A = [int(x) for x in data[2:2+n]]
    B = [int(x) for x in data[2+n:2+n+m]]

    res = []
    i, j = 0, 0
    while i < n and j < m:
        if A[i] <= B[j]:
            res.append(A[i])
            i += 1
        else:
            res.append(B[j])
            j += 1
    res.extend(A[i:])
    res.extend(B[j:])
    print(*(res))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const m = parseInt(input[1], 10);
    const A = input.slice(2, 2 + n).map(Number);
    const B = input.slice(2 + n, 2 + n + m).map(Number);
    const res = [];
    let i = 0, j = 0;
    while (i < n && j < m) {
        if (A[i] <= B[j]) res.push(A[i++]);
        else res.push(B[j++]);
    }
    while (i < n) res.push(A[i++]);
    while (j < m) res.push(B[j++]);
    console.log(res.join(' '));
}`,
    },
    sampleCases: [
      { id: 'srt-4-s1', input: '3 3\n1 3 5\n2 4 6', expectedOutput: '1 2 3 4 5 6', isSample: true, explanation: 'Merged sorted array is [1, 2, 3, 4, 5, 6].' },
      { id: 'srt-4-s2', input: '2 3\n10 20\n5 15 25', expectedOutput: '5 10 15 20 25', isSample: true, explanation: 'Merged sorted sequence.' },
    ],
    hiddenTestCases: [
      { id: 'srt-4-h1', input: '1 1\n5\n3', expectedOutput: '3 5', isSample: false },
      { id: 'srt-4-h2', input: '3 2\n1 2 3\n4 5', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'srt-4-h3', input: '2 2\n-5 -2\n-10 0', expectedOutput: '-10 -5 -2 0', isSample: false },
      { id: 'srt-4-h4', input: '3 3\n2 2 2\n2 2 2', expectedOutput: '2 2 2 2 2 2', isSample: false },
      { id: 'srt-4-h5', input: '4 1\n10 20 30 40\n0', expectedOutput: '0 10 20 30 40', isSample: false },
    ],
  },
  {
    id: 'sort-5-merge-sort',
    title: 'Implement Merge Sort',
    topic: 'sorting',
    difficulty: 'Medium',
    tags: ['Sorting', 'Divide and Conquer', 'Recursion'],
    description: `Given an array of \`n\` integers, sort the array in ascending order using Merge Sort with guaranteed \`O(n log n)\` worst-case time complexity.
Print the sorted array.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the sorted array on a single line separated by spaces.`,
    constraints: ['1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n log n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Recursively split array into left half (0..mid) and right half (mid+1..n-1).', 'Merge the two sorted halves back into the array.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin() + l, arr.begin() + m + 1);
    vector<int> right(arr.begin() + m + 1, arr.begin() + r + 1);
    int i = 0, j = 0, k = l;
    while (i < (int)left.size() && j < (int)right.size()) {
        if (left[i] <= right[j]) arr[k++] = left[i++];
        else arr[k++] = right[j++];
    }
    while (i < (int)left.size()) arr[k++] = left[i++];
    while (j < (int)right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; ++i) cin >> arr[i];
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; ++i) cout << arr[i] << (i + 1 == n ? "" : " ");
    cout << endl;
    return 0;
}`,
      python: `import sys

def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    res = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            res.append(left[i])
            i += 1
        else:
            res.append(right[j])
            j += 1
    res.extend(left[i:])
    res.extend(right[j:])
    return res

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    arr = [int(x) for x in data[1:n+1]]
    sorted_arr = merge_sort(arr)
    print(*(sorted_arr))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const arr = input.slice(1, n + 1).map(Number);
    function ms(a) {
        if (a.length <= 1) return a;
        const mid = Math.floor(a.length / 2);
        const left = ms(a.slice(0, mid));
        const right = ms(a.slice(mid));
        const res = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) res.push(left[i++]);
            else res.push(right[j++]);
        }
        while (i < left.length) res.push(left[i++]);
        while (j < right.length) res.push(right[j++]);
        return res;
    }
    console.log(ms(arr).join(' '));
}`,
    },
    sampleCases: [
      { id: 'srt-5-s1', input: '6\n38 27 43 3 9 82', expectedOutput: '3 9 27 38 43 82', isSample: true, explanation: 'Merge sort produces [3, 9, 27, 38, 43, 82].' },
      { id: 'srt-5-s2', input: '4\n-5 10 -2 0', expectedOutput: '-5 -2 0 10', isSample: true, explanation: 'Negative numbers sorted properly.' },
    ],
    hiddenTestCases: [
      { id: 'srt-5-h1', input: '1\n99', expectedOutput: '99', isSample: false },
      { id: 'srt-5-h2', input: '5\n5 4 3 2 1', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'srt-5-h3', input: '6\n1 2 3 4 5 6', expectedOutput: '1 2 3 4 5 6', isSample: false },
      { id: 'srt-5-h4', input: '5\n10 10 10 10 10', expectedOutput: '10 10 10 10 10', isSample: false },
      { id: 'srt-5-h5', input: '7\n100 -50 200 -100 0 50 -200', expectedOutput: '-200 -100 -50 0 50 100 200', isSample: false },
    ],
  },

  // ==========================================
  // 4. LINKED LISTS (5 Questions)
  // ==========================================
  {
    id: 'll-1-insert-head',
    title: 'Insert a Node at the Beginning of a Linked List',
    topic: 'linked-lists',
    difficulty: 'Easy',
    tags: ['Linked Lists', 'Pointers'],
    description: `Given a sequence of \`n\` integers to insert at the beginning (head) of a singly linked list one by one, output the resulting list from head to tail.
Inserting at the head takes \`O(1)\` time per node.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers in the order they are inserted at the head.`,
    outputFormat: `Print the elements of the final linked list from head to tail separated by spaces.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Each new node becomes the new head, pointing to the previous head.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    Node* head = nullptr;
    for (int i = 0; i < n; ++i) {
        int val;
        cin >> val;
        Node* newNode = new Node(val);
        newNode->next = head;
        head = newNode;
    }

    Node* curr = head;
    while (curr) {
        cout << curr->data << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    values = [int(x) for x in data[1:n+1]]
    head = None
    for val in values:
        new_node = Node(val)
        new_node.next = head
        head = new_node
    
    out = []
    curr = head
    while curr:
        out.append(curr.data)
        curr = curr.next
    print(*(out))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const values = input.slice(1, n + 1).map(Number);
    let head = null;
    for (const val of values) {
        head = { data: val, next: head };
    }
    const out = [];
    let curr = head;
    while (curr) {
        out.push(curr.data);
        curr = curr.next;
    }
    console.log(out.join(' '));
}`,
    },
    sampleCases: [
      { id: 'll-1-s1', input: '3\n10 20 30', expectedOutput: '30 20 10', isSample: true, explanation: '10 is inserted, then 20 becomes head, then 30 becomes head.' },
      { id: 'll-1-s2', input: '1\n5', expectedOutput: '5', isSample: true, explanation: 'Single node.' },
    ],
    hiddenTestCases: [
      { id: 'll-1-h1', input: '4\n1 2 3 4', expectedOutput: '4 3 2 1', isSample: false },
      { id: 'll-1-h2', input: '2\n-10 20', expectedOutput: '20 -10', isSample: false },
      { id: 'll-1-h3', input: '5\n0 0 0 0 1', expectedOutput: '1 0 0 0 0', isSample: false },
      { id: 'll-1-h4', input: '3\n9 8 7', expectedOutput: '7 8 9', isSample: false },
      { id: 'll-1-h5', input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1', isSample: false },
    ],
  },
  {
    id: 'll-2-insert-end',
    title: 'Insert a Node at the End of a Linked List',
    topic: 'linked-lists',
    difficulty: 'Easy',
    tags: ['Linked Lists', 'Pointers'],
    description: `Given a sequence of \`n\` integers to insert at the end (tail) of a singly linked list one by one, output the resulting list from head to tail.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers in insertion order.`,
    outputFormat: `Print the elements of the final linked list from head to tail separated by spaces.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Maintain both `head` and `tail` pointers to append each node in O(1) time.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    Node* head = nullptr;
    Node* tail = nullptr;

    for (int i = 0; i < n; ++i) {
        int val;
        cin >> val;
        Node* newNode = new Node(val);
        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
    }

    Node* curr = head;
    while (curr) {
        cout << curr->data << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    values = [int(x) for x in data[1:n+1]]
    head = tail = None
    for v in values:
        node = Node(v)
        if not head:
            head = tail = node
        else:
            tail.next = node
            tail = node
    out = []
    curr = head
    while curr:
        out.append(curr.data)
        curr = curr.next
    print(*(out))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const values = input.slice(1, n + 1).map(Number);
    let head = null, tail = null;
    for (const v of values) {
        const node = { data: v, next: null };
        if (!head) { head = tail = node; }
        else { tail.next = node; tail = node; }
    }
    const out = [];
    let curr = head;
    while (curr) { out.push(curr.data); curr = curr.next; }
    console.log(out.join(' '));
}`,
    },
    sampleCases: [
      { id: 'll-2-s1', input: '3\n1 2 3', expectedOutput: '1 2 3', isSample: true, explanation: 'Inserting at end preserves FIFO order.' },
      { id: 'll-2-s2', input: '2\n10 20', expectedOutput: '10 20', isSample: true, explanation: 'Order is 10 20.' },
    ],
    hiddenTestCases: [
      { id: 'll-2-h1', input: '1\n99', expectedOutput: '99', isSample: false },
      { id: 'll-2-h2', input: '4\n-1 -2 -3 -4', expectedOutput: '-1 -2 -3 -4', isSample: false },
      { id: 'll-2-h3', input: '5\n5 1 4 2 8', expectedOutput: '5 1 4 2 8', isSample: false },
      { id: 'll-2-h4', input: '3\n0 0 0', expectedOutput: '0 0 0', isSample: false },
      { id: 'll-2-h5', input: '4\n100 200 300 400', expectedOutput: '100 200 300 400', isSample: false },
    ],
  },
  {
    id: 'll-3-search-node',
    title: 'Search for a Value in a Linked List',
    topic: 'linked-lists',
    difficulty: 'Easy',
    tags: ['Linked Lists', 'Traversal'],
    description: `Given a singly linked list of \`n\` integers and a target value \`key\`, return the 0-based index of the first occurrence of \`key\`.
If the key does not exist in the list, return \`-1\`.`,
    inputFormat: `The first line contains \`n\` and \`key\`.
The second line contains \`n\` space-separated integers representing the linked list nodes.`,
    outputFormat: `Print the 0-based index or \`-1\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= val, key <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Traverse with pointer `curr` from `head` and an integer counter `idx = 0`. If `curr->data == key`, return `idx`.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

int main() {
    int n, key;
    if (!(cin >> n >> key)) return 0;
    Node* head = nullptr;
    Node* tail = nullptr;
    for (int i = 0; i < n; ++i) {
        int val; cin >> val;
        Node* node = new Node(val);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }

    int idx = 0, foundIdx = -1;
    Node* curr = head;
    while (curr) {
        if (curr->data == key) {
            foundIdx = idx;
            break;
        }
        idx++;
        curr = curr->next;
    }
    cout << foundIdx << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, key = int(data[0]), int(data[1])
    values = [int(x) for x in data[2:n+2]]
    for idx, v in enumerate(values):
        if v == key:
            print(idx)
            return
    print(-1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const key = parseInt(input[1], 10);
    const values = input.slice(2, n + 2).map(Number);
    let ans = -1;
    for (let i = 0; i < n; i++) {
        if (values[i] === key) { ans = i; break; }
    }
    console.log(ans);
}`,
    },
    sampleCases: [
      { id: 'll-3-s1', input: '5 30\n10 20 30 40 50', expectedOutput: '2', isSample: true, explanation: '30 is located at index 2.' },
      { id: 'll-3-s2', input: '4 99\n1 2 3 4', expectedOutput: '-1', isSample: true, explanation: '99 is not in the list.' },
    ],
    hiddenTestCases: [
      { id: 'll-3-h1', input: '1 5\n5', expectedOutput: '0', isSample: false },
      { id: 'll-3-h2', input: '4 10\n10 10 10 10', expectedOutput: '0', isSample: false },
      { id: 'll-3-h3', input: '3 -5\n0 1 -5', expectedOutput: '2', isSample: false },
      { id: 'll-3-h4', input: '5 100\n10 20 30 40 100', expectedOutput: '4', isSample: false },
      { id: 'll-3-h5', input: '2 7\n1 2', expectedOutput: '-1', isSample: false },
    ],
  },
  {
    id: 'll-4-delete-value',
    title: 'Delete First Occurrence of a Value from Linked List',
    topic: 'linked-lists',
    difficulty: 'Medium',
    tags: ['Linked Lists', 'Pointer Manipulation'],
    description: `Given a singly linked list of \`n\` integers and a value \`val\`, delete the FIRST node containing \`val\`.
If the list becomes empty, print \`EMPTY\`. If \`val\` is not found, print the unchanged list.`,
    inputFormat: `The first line contains \`n\` and \`val\`.
The second line contains \`n\` space-separated integers representing the list.`,
    outputFormat: `Print the remaining list elements separated by space, or \`EMPTY\` if no nodes remain.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= node val, val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Check if head itself contains val: if so, `head = head->next`.', 'Otherwise, traverse with a `prev` pointer. When `curr->data == val`, set `prev->next = curr->next`.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int v) : data(v), next(nullptr) {}
};

int main() {
    int n, val;
    if (!(cin >> n >> val)) return 0;
    Node* head = nullptr;
    Node* tail = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        Node* node = new Node(x);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }

    if (head && head->data == val) {
        Node* toDel = head;
        head = head->next;
        delete toDel;
    } else {
        Node* curr = head;
        while (curr && curr->next) {
            if (curr->next->data == val) {
                Node* toDel = curr->next;
                curr->next = curr->next->next;
                delete toDel;
                break;
            }
            curr = curr->next;
        }
    }

    if (!head) {
        cout << "EMPTY" << endl;
    } else {
        Node* curr = head;
        while (curr) {
            cout << curr->data << (curr->next ? " " : "");
            curr = curr->next;
        }
        cout << endl;
    }
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, val = int(data[0]), int(data[1])
    values = [int(x) for x in data[2:n+2]]
    if val in values:
        values.remove(val)
    if not values:
        print("EMPTY")
    else:
        print(*(values))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const val = parseInt(input[1], 10);
    const values = input.slice(2, n + 2).map(Number);
    const idx = values.indexOf(val);
    if (idx !== -1) values.splice(idx, 1);
    if (values.length === 0) console.log('EMPTY');
    else console.log(values.join(' '));
}`,
    },
    sampleCases: [
      { id: 'll-4-s1', input: '4 30\n10 20 30 40', expectedOutput: '10 20 40', isSample: true, explanation: 'Node 30 is removed.' },
      { id: 'll-4-s2', input: '1 5\n5', expectedOutput: 'EMPTY', isSample: true, explanation: 'Removing the only node leaves the list empty.' },
    ],
    hiddenTestCases: [
      { id: 'll-4-h1', input: '4 10\n10 20 30 40', expectedOutput: '20 30 40', isSample: false },
      { id: 'll-4-h2', input: '4 40\n10 20 30 40', expectedOutput: '10 20 30', isSample: false },
      { id: 'll-4-h3', input: '3 99\n1 2 3', expectedOutput: '1 2 3', isSample: false },
      { id: 'll-4-h4', input: '5 2\n1 2 2 2 3', expectedOutput: '1 2 2 3', isSample: false },
      { id: 'll-4-h5', input: '2 1\n1 2', expectedOutput: '2', isSample: false },
    ],
  },
  {
    id: 'll-5-reverse-list',
    title: 'Reverse a Singly Linked List',
    topic: 'linked-lists',
    difficulty: 'Medium',
    tags: ['Linked Lists', 'Pointers'],
    description: `Given the head of a singly linked list, reverse the list in-place and return the reversed list.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the elements of the reversed list separated by spaces.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Maintain three pointers: `prev = nullptr`, `curr = head`, and `next = nullptr`. In a loop, save `next = curr->next`, reverse `curr->next = prev`, then advance `prev = curr` and `curr = next`.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int v) : data(v), next(nullptr) {}
};

int main() {
    int n;
    if (!(cin >> n)) return 0;
    Node* head = nullptr;
    Node* tail = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        Node* node = new Node(x);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }

    Node* prev = nullptr;
    Node* curr = head;
    while (curr) {
        Node* nextNode = curr->next;
        curr->next = prev;
        prev = curr;
        curr = nextNode;
    }
    head = prev;

    curr = head;
    while (curr) {
        cout << curr->data << (curr->next ? " " : "");
        curr = curr->next;
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    values = [int(x) for x in data[1:n+1]]
    values.reverse()
    print(*(values))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const values = input.slice(1, n + 1).map(Number);
    values.reverse();
    console.log(values.join(' '));
}`,
    },
    sampleCases: [
      { id: 'll-5-s1', input: '5\n1 2 3 4 5', expectedOutput: '5 4 3 2 1', isSample: true, explanation: 'Reversing yields 5 4 3 2 1.' },
      { id: 'll-5-s2', input: '2\n1 2', expectedOutput: '2 1', isSample: true, explanation: 'Reversing yields 2 1.' },
    ],
    hiddenTestCases: [
      { id: 'll-5-h1', input: '1\n10', expectedOutput: '10', isSample: false },
      { id: 'll-5-h2', input: '4\n-1 -2 -3 -4', expectedOutput: '-4 -3 -2 -1', isSample: false },
      { id: 'll-5-h3', input: '3\n5 5 5', expectedOutput: '5 5 5', isSample: false },
      { id: 'll-5-h4', input: '6\n10 20 30 40 50 60', expectedOutput: '60 50 40 30 20 10', isSample: false },
      { id: 'll-5-h5', input: '4\n0 1 0 1', expectedOutput: '1 0 1 0', isSample: false },
    ],
  },

  // ==========================================
  // 5. STACKS (5 Questions)
  // ==========================================
  {
    id: 'stack-1-implement-array-stack',
    title: 'Implement Stack Operations',
    topic: 'stacks',
    difficulty: 'Easy',
    tags: ['Stacks', 'LIFO'],
    description: `Process \`q\` stack operations on an initially empty stack.
Operations:
- \`push x\`: Push integer \`x\` onto the stack.
- \`pop\`: Pop the top integer and print it. If the stack is empty, print \`-1\`.
- \`peek\`: Print the top integer without removing it. If empty, print \`-1\`.`,
    inputFormat: `The first line contains \`q\` (number of operations).
The next \`q\` lines each contain an operation.`,
    outputFormat: `For each \`pop\` and \`peek\` operation, print the resulting value on a new line.`,
    constraints: ['1 <= q <= 10^5', '-10^9 <= x <= 10^9'],
    expectedTimeComplexity: 'O(1) per operation',
    expectedSpaceComplexity: 'O(q)',
    hints: ['Use an array or std::vector with top pointer or push_back/pop_back.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    int q;
    if (!(cin >> q)) return 0;
    vector<int> st;
    while (q--) {
        string op;
        cin >> op;
        if (op == "push") {
            int x; cin >> x;
            st.push_back(x);
        } else if (op == "pop") {
            if (st.empty()) {
                cout << -1 << endl;
            } else {
                cout << st.back() << endl;
                st.pop_back();
            }
        } else if (op == "peek") {
            if (st.empty()) {
                cout << -1 << endl;
            } else {
                cout << st.back() << endl;
            }
        }
    }
    return 0;
}`,
      python: `import sys

def main():
    lines = sys.stdin.read().split()
    if not lines: return
    q = int(lines[0])
    idx = 1
    st = []
    for _ in range(q):
        op = lines[idx]
        idx += 1
        if op == "push":
            x = int(lines[idx])
            idx += 1
            st.append(x)
        elif op == "pop":
            print(st.pop() if st else -1)
        elif op == "peek":
            print(st[-1] if st else -1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const q = parseInt(tokens[0], 10);
    let idx = 1;
    const st = [];
    for (let i = 0; i < q; i++) {
        const op = tokens[idx++];
        if (op === 'push') {
            const x = parseInt(tokens[idx++], 10);
            st.push(x);
        } else if (op === 'pop') {
            console.log(st.length ? st.pop() : -1);
        } else if (op === 'peek') {
            console.log(st.length ? st[st.length - 1] : -1);
        }
    }
}`,
    },
    sampleCases: [
      { id: 'stk-1-s1', input: '5\npush 10\npush 20\npeek\npop\npop', expectedOutput: '20\n20\n10', isSample: true, explanation: 'Peek sees 20, first pop removes 20, second pop removes 10.' },
      { id: 'stk-1-s2', input: '2\npop\npeek', expectedOutput: '-1\n-1', isSample: true, explanation: 'Stack underflow prints -1.' },
    ],
    hiddenTestCases: [
      { id: 'stk-1-h1', input: '3\npush 5\npeek\npop', expectedOutput: '5\n5', isSample: false },
      { id: 'stk-1-h2', input: '4\npush 1\npush 2\npush 3\npop', expectedOutput: '3', isSample: false },
      { id: 'stk-1-h3', input: '4\npop\npush 100\npeek\npop', expectedOutput: '-1\n100\n100', isSample: false },
      { id: 'stk-1-h4', input: '6\npush -5\npush -10\npop\npeek\npop\npop', expectedOutput: '-10\n-5\n-5\n-1', isSample: false },
      { id: 'stk-1-h5', input: '3\npush 42\npeek\npeek', expectedOutput: '42\n42', isSample: false },
    ],
  },
  {
    id: 'stack-2-balanced-parentheses',
    title: 'Validate Balanced Parentheses',
    topic: 'stacks',
    difficulty: 'Easy',
    tags: ['Stacks', 'Strings'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.
A string is valid if:
1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
Print \`true\` if valid, else \`false\`.`,
    inputFormat: `A single line containing the string \`s\`.`,
    outputFormat: `Print \`true\` or \`false\`.`,
    constraints: ['1 <= s.length <= 10^5', 's consists of parentheses only: ()[]{}'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Push opening brackets onto stack.', 'When encountering a closing bracket, check if top of stack matches; if so pop, else return false.', 'At the end, stack must be empty.'],
    starterCode: {
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

bool isValid(const string& s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            char top = st.top();
            st.pop();
            if ((c == ')' && top != '(') ||
                (c == '}' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return st.empty();
}

int main() {
    string s;
    if (cin >> s) {
        cout << (isValid(s) ? "true" : "false") << endl;
    }
    return 0;
}`,
      python: `import sys

def is_valid(s):
    st = []
    mapping = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in '({[':
            st.append(c)
        elif c in mapping:
            if not st or st[-1] != mapping[c]:
                return False
            st.pop()
    return len(st) == 0

def main():
    s = sys.stdin.read().strip()
    if s:
        print("true" if is_valid(s) else "false")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
    const st = [];
    const map = { ')': '(', '}': '{', ']': '[' };
    let ok = true;
    for (const c of s) {
        if (c === '(' || c === '{' || c === '[') {
            st.push(c);
        } else if (map[c]) {
            if (!st.length || st.pop() !== map[c]) {
                ok = false;
                break;
            }
        }
    }
    console.log(ok && st.length === 0 ? 'true' : 'false');
}`,
    },
    sampleCases: [
      { id: 'stk-2-s1', input: '()[]{}', expectedOutput: 'true', isSample: true, explanation: 'All brackets match correctly.' },
      { id: 'stk-2-s2', input: '(]', expectedOutput: 'false', isSample: true, explanation: 'Bracket types do not match.' },
    ],
    hiddenTestCases: [
      { id: 'stk-2-h1', input: '([{}])', expectedOutput: 'true', isSample: false },
      { id: 'stk-2-h2', input: '(((((', expectedOutput: 'false', isSample: false },
      { id: 'stk-2-h3', input: '))))', expectedOutput: 'false', isSample: false },
      { id: 'stk-2-h4', input: '{[()]}', expectedOutput: 'true', isSample: false },
      { id: 'stk-2-h5', input: '([)]', expectedOutput: 'false', isSample: false },
    ],
  },
  {
    id: 'stack-3-reverse-string',
    title: 'Reverse a String Using a Stack',
    topic: 'stacks',
    difficulty: 'Easy',
    tags: ['Stacks', 'Strings'],
    description: `Given a string \`s\`, reverse the string by pushing all characters onto a stack and then popping them off one by one.`,
    inputFormat: `A single line containing the string \`s\`.`,
    outputFormat: `Print the reversed string.`,
    constraints: ['1 <= s.length <= 10^5'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Push all chars onto a stack, then pop them to construct the reversed string.'],
    starterCode: {
      cpp: `#include <iostream>
#include <string>
#include <stack>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    stack<char> st;
    for (char c : s) st.push(c);
    string res = "";
    while (!st.empty()) {
        res += st.top();
        st.pop();
    }
    cout << res << endl;
    return 0;
}`,
      python: `import sys

def main():
    s = sys.stdin.read().strip()
    if s:
        st = list(s)
        out = []
        while st:
            out.append(st.pop())
        print("".join(out))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
    const st = s.split('');
    const res = [];
    while (st.length) res.push(st.pop());
    console.log(res.join(''));
}`,
    },
    sampleCases: [
      { id: 'stk-3-s1', input: 'hello', expectedOutput: 'olleh', isSample: true, explanation: 'Characters reversed via LIFO.' },
      { id: 'stk-3-s2', input: 'dsa', expectedOutput: 'asd', isSample: true, explanation: 'Reversed.' },
    ],
    hiddenTestCases: [
      { id: 'stk-3-h1', input: 'a', expectedOutput: 'a', isSample: false },
      { id: 'stk-3-h2', input: 'racecar', expectedOutput: 'racecar', isSample: false },
      { id: 'stk-3-h3', input: '123456', expectedOutput: '654321', isSample: false },
      { id: 'stk-3-h4', input: 'Structures', expectedOutput: 'serutcurtS', isSample: false },
      { id: 'stk-3-h5', input: 'Algorithms', expectedOutput: 'smhtiroglA', isSample: false },
    ],
  },
  {
    id: 'stack-4-next-greater-element',
    title: 'Next Greater Element',
    topic: 'stacks',
    difficulty: 'Medium',
    tags: ['Stacks', 'Monotonic Stack'],
    description: `Given an array of \`n\` integers, find the Next Greater Element (NGE) for every element.
The Next Greater Element for an element \`x\` is the first greater element to its right in the array. If no greater element exists to its right, output \`-1\`.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the next greater element for each index separated by a space.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Traverse the array from right to left (index n-1 down to 0).', 'Maintain a monotonic decreasing stack of elements.', 'While stack is not empty and stack.top <= nums[i], pop from stack. If stack is empty NGE is -1, else stack.top. Then push nums[i].'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    vector<long long> nge(n);
    stack<long long> st;
    for (int i = n - 1; i >= 0; --i) {
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        nge[i] = st.empty() ? -1 : st.top();
        st.push(nums[i]);
    }

    for (int i = 0; i < n; ++i) {
        cout << nge[i] << (i + 1 == n ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]

    nge = [-1] * n
    st = []
    for i in range(n - 1, -1, -1):
        while st and st[-1] <= nums[i]:
            st.pop()
        nge[i] = st[-1] if st else -1
        st.append(nums[i])

    print(*(nge))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    const nge = new Array(n).fill(-1);
    const st = [];
    for (let i = n - 1; i >= 0; i--) {
        while (st.length && st[st.length - 1] <= nums[i]) {
            st.pop();
        }
        nge[i] = st.length ? st[st.length - 1] : -1;
        st.push(nums[i]);
    }
    console.log(nge.join(' '));
}`,
    },
    sampleCases: [
      { id: 'stk-4-s1', input: '4\n4 5 2 25', expectedOutput: '5 25 25 -1', isSample: true, explanation: 'For 4 it is 5, for 5 it is 25, for 2 it is 25, for 25 none (-1).' },
      { id: 'stk-4-s2', input: '4\n13 7 6 12', expectedOutput: '-1 12 12 -1', isSample: true, explanation: 'NGE calculated.' },
    ],
    hiddenTestCases: [
      { id: 'stk-4-h1', input: '1\n10', expectedOutput: '-1', isSample: false },
      { id: 'stk-4-h2', input: '5\n5 4 3 2 1', expectedOutput: '-1 -1 -1 -1 -1', isSample: false },
      { id: 'stk-4-h3', input: '5\n1 2 3 4 5', expectedOutput: '2 3 4 5 -1', isSample: false },
      { id: 'stk-4-h4', input: '4\n2 2 2 2', expectedOutput: '-1 -1 -1 -1', isSample: false },
      { id: 'stk-4-h5', input: '6\n6 8 0 1 3 10', expectedOutput: '8 10 1 3 10 -1', isSample: false },
    ],
  },
  {
    id: 'stack-5-evaluate-postfix',
    title: 'Evaluate Postfix (Reverse Polish) Expression',
    topic: 'stacks',
    difficulty: 'Medium',
    tags: ['Stacks', 'Math'],
    description: `Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix).
Valid operators are \`+\`, \`-\`, \`*\`, and \`/\`. Each operand is an integer. Division between two integers truncates toward zero.`,
    inputFormat: `The first line contains \`n\` (number of tokens).
The second line contains \`n\` space-separated tokens.`,
    outputFormat: `Print the evaluated integer value.`,
    constraints: ['1 <= n <= 10^4', 'Valid postfix expression'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['If token is an integer, push it onto stack.', 'If token is an operator, pop operand2 then operand1, apply operator, push result back.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <stack>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    stack<long long> st;
    for (int i = 0; i < n; ++i) {
        string token;
        cin >> token;
        if (token == "+" || token == "-" || token == "*" || token == "/") {
            long long op2 = st.top(); st.pop();
            long long op1 = st.top(); st.pop();
            if (token == "+") st.push(op1 + op2);
            else if (token == "-") st.push(op1 - op2);
            else if (token == "*") st.push(op1 * op2);
            else if (token == "/") st.push(op1 / op2);
        } else {
            st.push(stoll(token));
        }
    }
    cout << st.top() << endl;
    return 0;
}`,
      python: `import sys

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    n = int(tokens[0])
    st = []
    for token in tokens[1:n+1]:
        if token in "+-*/":
            op2 = st.pop()
            op1 = st.pop()
            if token == '+': st.append(op1 + op2)
            elif token == '-': st.append(op1 - op2)
            elif token == '*': st.append(op1 * op2)
            elif token == '/': st.append(int(op1 / op2))
        else:
            st.append(int(token))
    print(st[-1])

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const n = parseInt(tokens[0], 10);
    const st = [];
    for (let i = 1; i <= n; i++) {
        const token = tokens[i];
        if (token === '+' || token === '-' || token === '*' || token === '/') {
            const op2 = st.pop();
            const op1 = st.pop();
            if (token === '+') st.push(op1 + op2);
            else if (token === '-') st.push(op1 - op2);
            else if (token === '*') st.push(op1 * op2);
            else if (token === '/') st.push(Math.trunc(op1 / op2));
        } else {
            st.push(parseInt(token, 10));
        }
    }
    console.log(st[st.length - 1]);
}`,
    },
    sampleCases: [
      { id: 'stk-5-s1', input: '5\n2 1 + 3 *', expectedOutput: '9', isSample: true, explanation: '((2 + 1) * 3) = 9.' },
      { id: 'stk-5-s2', input: '5\n4 13 5 / +', expectedOutput: '6', isSample: true, explanation: '(4 + (13 / 5)) = 4 + 2 = 6.' },
    ],
    hiddenTestCases: [
      { id: 'stk-5-h1', input: '1\n42', expectedOutput: '42', isSample: false },
      { id: 'stk-5-h2', input: '3\n5 3 -', expectedOutput: '2', isSample: false },
      { id: 'stk-5-h3', input: '3\n10 2 /', expectedOutput: '5', isSample: false },
      { id: 'stk-5-h4', input: '7\n10 6 9 3 + -11 * / *', expectedOutput: '0', isSample: false },
      { id: 'stk-5-h5', input: '5\n15 7 1 1 + - /', expectedOutput: '3', isSample: false },
    ],
  },

  // ==========================================
  // 6. QUEUES (5 Questions)
  // ==========================================
  {
    id: 'queue-1-implement-queue',
    title: 'Implement Queue Operations',
    topic: 'queues',
    difficulty: 'Easy',
    tags: ['Queues', 'FIFO'],
    description: `Process \`q\` operations on an initially empty queue.
Operations:
- \`enqueue x\`: Insert integer \`x\` at the rear.
- \`dequeue\`: Remove and print the front element. If empty, print \`-1\`.
- \`front\`: Print the front element without removing it. If empty, print \`-1\`.`,
    inputFormat: `The first line contains \`q\`.
The next \`q\` lines contain the operations.`,
    outputFormat: `Print the output for each \`dequeue\` and \`front\` operation on a new line.`,
    constraints: ['1 <= q <= 10^5', '-10^9 <= x <= 10^9'],
    expectedTimeComplexity: 'O(1) per operation',
    expectedSpaceComplexity: 'O(q)',
    hints: ['Use std::queue or a circular array with front and rear pointers.'],
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    int q;
    if (!(cin >> q)) return 0;
    queue<int> qu;
    while (q--) {
        string op;
        cin >> op;
        if (op == "enqueue") {
            int x; cin >> x;
            qu.push(x);
        } else if (op == "dequeue") {
            if (qu.empty()) {
                cout << -1 << endl;
            } else {
                cout << qu.front() << endl;
                qu.pop();
            }
        } else if (op == "front") {
            if (qu.empty()) {
                cout << -1 << endl;
            } else {
                cout << qu.front() << endl;
            }
        }
    }
    return 0;
}`,
      python: `import sys
from collections import deque

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    q = int(tokens[0])
    idx = 1
    qu = deque()
    for _ in range(q):
        op = tokens[idx]
        idx += 1
        if op == "enqueue":
            x = int(tokens[idx])
            idx += 1
            qu.append(x)
        elif op == "dequeue":
            print(qu.popleft() if qu else -1)
        elif op == "front":
            print(qu[0] if qu else -1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const q = parseInt(tokens[0], 10);
    let idx = 1;
    const qu = [];
    let head = 0;
    for (let i = 0; i < q; i++) {
        const op = tokens[idx++];
        if (op === 'enqueue') {
            const x = parseInt(tokens[idx++], 10);
            qu.push(x);
        } else if (op === 'dequeue') {
            if (head < qu.length) console.log(qu[head++]);
            else console.log(-1);
        } else if (op === 'front') {
            if (head < qu.length) console.log(qu[head]);
            else console.log(-1);
        }
    }
}`,
    },
    sampleCases: [
      { id: 'qu-1-s1', input: '5\nenqueue 10\nenqueue 20\nfront\ndequeue\ndequeue', expectedOutput: '10\n10\n20', isSample: true, explanation: 'FIFO order: 10 dequeued before 20.' },
      { id: 'qu-1-s2', input: '2\ndequeue\nfront', expectedOutput: '-1\n-1', isSample: true, explanation: 'Queue underflow prints -1.' },
    ],
    hiddenTestCases: [
      { id: 'qu-1-h1', input: '3\nenqueue 5\nfront\ndequeue', expectedOutput: '5\n5', isSample: false },
      { id: 'qu-1-h2', input: '4\nenqueue 1\nenqueue 2\nenqueue 3\ndequeue', expectedOutput: '1', isSample: false },
      { id: 'qu-1-h3', input: '4\ndequeue\nenqueue 99\nfront\ndequeue', expectedOutput: '-1\n99\n99', isSample: false },
      { id: 'qu-1-h4', input: '6\nenqueue -1\nenqueue -2\ndequeue\nfront\ndequeue\ndequeue', expectedOutput: '-1\n-2\n-2\n-1', isSample: false },
      { id: 'qu-1-h5', input: '3\nenqueue 77\nfront\nfront', expectedOutput: '77\n77', isSample: false },
    ],
  },
  {
    id: 'queue-2-circular-queue',
    title: 'Implement Circular Queue Array',
    topic: 'queues',
    difficulty: 'Medium',
    tags: ['Queues', 'Circular Buffer'],
    description: `Design a circular queue of fixed capacity \`k\`.
Operations:
- \`enq x\`: Add \`x\` if not full; print \`true\` if successful, or \`false\` if full.
- \`deq\`: Remove front element; print \`true\` if successful, or \`false\` if empty.
- \`front\`: Return front item or \`-1\` if empty.
- \`rear\`: Return rear item or \`-1\` if empty.`,
    inputFormat: `The first line contains \`k\` (capacity) and \`m\` (number of operations).
The next \`m\` lines contain operations.`,
    outputFormat: `Print the result of each operation on a new line.`,
    constraints: ['1 <= k <= 1000', '1 <= m <= 10^4'],
    expectedTimeComplexity: 'O(1) per operation',
    expectedSpaceComplexity: 'O(k)',
    hints: ['Use an array of size k, maintain front, rear, and current count.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class MyCircularQueue {
    vector<int> data;
    int head = 0, tail = 0, count = 0, capacity;
public:
    MyCircularQueue(int k) : data(k), capacity(k) {}

    bool enq(int value) {
        if (count == capacity) return false;
        data[tail] = value;
        tail = (tail + 1) % capacity;
        count++;
        return true;
    }

    bool deq() {
        if (count == 0) return false;
        head = (head + 1) % capacity;
        count--;
        return true;
    }

    int Front() {
        return count == 0 ? -1 : data[head];
    }

    int Rear() {
        return count == 0 ? -1 : data[(tail - 1 + capacity) % capacity];
    }
};

int main() {
    int k, m;
    if (!(cin >> k >> m)) return 0;
    MyCircularQueue cq(k);
    while (m--) {
        string op; cin >> op;
        if (op == "enq") {
            int x; cin >> x;
            cout << (cq.enq(x) ? "true" : "false") << endl;
        } else if (op == "deq") {
            cout << (cq.deq() ? "true" : "false") << endl;
        } else if (op == "front") {
            cout << cq.Front() << endl;
        } else if (op == "rear") {
            cout << cq.Rear() << endl;
        }
    }
    return 0;
}`,
      python: `import sys

class CircularQueue:
    def __init__(self, k):
        self.data = [0] * k
        self.cap = k
        self.head = 0
        self.tail = 0
        self.count = 0

    def enq(self, x):
        if self.count == self.cap: return False
        self.data[self.tail] = x
        self.tail = (self.tail + 1) % self.cap
        self.count += 1
        return True

    def deq(self):
        if self.count == 0: return False
        self.head = (self.head + 1) % self.cap
        self.count -= 1
        return True

    def front(self):
        return -1 if self.count == 0 else self.data[self.head]

    def rear(self):
        return -1 if self.count == 0 else self.data[(self.tail - 1 + self.cap) % self.cap]

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    k, m = int(tokens[0]), int(tokens[1])
    cq = CircularQueue(k)
    idx = 2
    for _ in range(m):
        op = tokens[idx]; idx += 1
        if op == "enq":
            x = int(tokens[idx]); idx += 1
            print("true" if cq.enq(x) else "false")
        elif op == "deq":
            print("true" if cq.deq() else "false")
        elif op == "front":
            print(cq.front())
        elif op == "rear":
            print(cq.rear())

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const k = parseInt(tokens[0], 10);
    const m = parseInt(tokens[1], 10);
    const data = new Array(k);
    let head = 0, tail = 0, count = 0;
    let idx = 2;
    for (let i = 0; i < m; i++) {
        const op = tokens[idx++];
        if (op === 'enq') {
            const x = parseInt(tokens[idx++], 10);
            if (count === k) console.log('false');
            else {
                data[tail] = x;
                tail = (tail + 1) % k;
                count++;
                console.log('true');
            }
        } else if (op === 'deq') {
            if (count === 0) console.log('false');
            else {
                head = (head + 1) % k;
                count--;
                console.log('true');
            }
        } else if (op === 'front') {
            console.log(count === 0 ? -1 : data[head]);
        } else if (op === 'rear') {
            console.log(count === 0 ? -1 : data[(tail - 1 + k) % k]);
        }
    }
}`,
    },
    sampleCases: [
      { id: 'qu-2-s1', input: '3 6\nenq 1\nenq 2\nenq 3\nenq 4\nrear\ndeq', expectedOutput: 'true\ntrue\ntrue\nfalse\n3\ntrue', isSample: true, explanation: 'Enqueuing 4 fails because capacity 3 is reached.' },
      { id: 'qu-2-s2', input: '2 3\nfront\nrear\ndeq', expectedOutput: '-1\n-1\nfalse', isSample: true, explanation: 'Empty conditions.' },
    ],
    hiddenTestCases: [
      { id: 'qu-2-h1', input: '2 4\nenq 10\nenq 20\nfront\nrear', expectedOutput: 'true\ntrue\n10\n20', isSample: false },
      { id: 'qu-2-h2', input: '3 5\nenq 1\nenq 2\ndeq\nenq 3\nfront', expectedOutput: 'true\ntrue\ntrue\ntrue\n2', isSample: false },
      { id: 'qu-2-h3', input: '1 4\nenq 5\nenq 10\nfront\ndeq', expectedOutput: 'true\nfalse\n5\ntrue', isSample: false },
      { id: 'qu-2-h4', input: '2 5\nenq 1\ndeq\nenq 2\nrear\nfront', expectedOutput: 'true\ntrue\ntrue\n2\n2', isSample: false },
      { id: 'qu-2-h5', input: '3 4\nenq 100\nenq 200\nenq 300\nrear', expectedOutput: 'true\ntrue\ntrue\n300', isSample: false },
    ],
  },
  {
    id: 'queue-3-reverse-first-k',
    title: 'Reverse First K Elements of a Queue',
    topic: 'queues',
    difficulty: 'Medium',
    tags: ['Queues', 'Stacks'],
    description: `Given a queue containing \`n\` integers and an integer \`k\` (k <= n), reverse the order of the first \`k\` elements while maintaining the relative order of the remaining elements.`,
    inputFormat: `The first line contains \`n\` and \`k\`.
The second line contains \`n\` space-separated integers in initial queue order.`,
    outputFormat: `Print the modified queue elements from front to rear separated by spaces.`,
    constraints: ['1 <= k <= n <= 10^5', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(k)',
    hints: ['Dequeue the first k elements and push them onto a stack.', 'Pop from the stack and enqueue them back into the queue.', 'Then dequeue and enqueue the remaining (n - k) elements to restore their relative positions.'],
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    queue<int> q;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        q.push(x);
    }

    stack<int> s;
    for (int i = 0; i < k; ++i) {
        s.push(q.front());
        q.pop();
    }
    while (!s.empty()) {
        q.push(s.top());
        s.pop();
    }
    for (int i = 0; i < n - k; ++i) {
        q.push(q.front());
        q.pop();
    }

    while (!q.empty()) {
        cout << q.front() << (q.size() == 1 ? "" : " ");
        q.pop();
    }
    cout << endl;
    return 0;
}`,
      python: `import sys
from collections import deque

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    vals = [int(x) for x in data[2:n+2]]
    first_k = vals[:k]
    first_k.reverse()
    res = first_k + vals[k:]
    print(*(res))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const k = parseInt(input[1], 10);
    const vals = input.slice(2, n + 2).map(Number);
    const firstK = vals.slice(0, k).reverse();
    const res = firstK.concat(vals.slice(k));
    console.log(res.join(' '));
}`,
    },
    sampleCases: [
      { id: 'qu-3-s1', input: '5 3\n1 2 3 4 5', expectedOutput: '3 2 1 4 5', isSample: true, explanation: 'The first 3 elements [1, 2, 3] become [3, 2, 1].' },
      { id: 'qu-3-s2', input: '4 4\n10 20 30 40', expectedOutput: '40 30 20 10', isSample: true, explanation: 'All 4 elements reversed.' },
    ],
    hiddenTestCases: [
      { id: 'qu-3-h1', input: '5 1\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'qu-3-h2', input: '3 2\n5 10 15', expectedOutput: '10 5 15', isSample: false },
      { id: 'qu-3-h3', input: '6 4\n-1 -2 -3 -4 5 6', expectedOutput: '-4 -3 -2 -1 5 6', isSample: false },
      { id: 'qu-3-h4', input: '1 1\n42', expectedOutput: '42', isSample: false },
      { id: 'qu-3-h5', input: '5 2\n100 200 300 400 500', expectedOutput: '200 100 300 400 500', isSample: false },
    ],
  },
  {
    id: 'queue-4-queue-using-two-stacks',
    title: 'Implement Queue Using Two Stacks',
    topic: 'queues',
    difficulty: 'Medium',
    tags: ['Queues', 'Stacks', 'Amortized Analysis'],
    description: `Implement a FIFO queue using two LIFO stacks.
Operations:
- \`push x\`: Pushes \`x\` to the back of the queue.
- \`pop\`: Removes and prints element from front. If empty, print \`-1\`.
- \`peek\`: Prints front element. If empty, print \`-1\`.`,
    inputFormat: `The first line contains \`q\`.
The next \`q\` lines contain operations.`,
    outputFormat: `Print results of \`pop\` and \`peek\` operations on new lines.`,
    constraints: ['1 <= q <= 10^5'],
    expectedTimeComplexity: 'Amortized O(1) per operation',
    expectedSpaceComplexity: 'O(q)',
    hints: ['Stack 1 for input, Stack 2 for output.', 'When Stack 2 is empty, pop everything from Stack 1 into Stack 2.'],
    starterCode: {
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

class MyQueue {
    stack<int> inSt, outSt;
    void transfer() {
        if (outSt.empty()) {
            while (!inSt.empty()) {
                outSt.push(inSt.top());
                inSt.pop();
            }
        }
    }
public:
    void push(int x) { inSt.push(x); }
    int pop() {
        transfer();
        if (outSt.empty()) return -1;
        int val = outSt.top(); outSt.pop();
        return val;
    }
    int peek() {
        transfer();
        return outSt.empty() ? -1 : outSt.top();
    }
};

int main() {
    int q;
    if (!(cin >> q)) return 0;
    MyQueue mq;
    while (q--) {
        string op; cin >> op;
        if (op == "push") { int x; cin >> x; mq.push(x); }
        else if (op == "pop") { cout << mq.pop() << endl; }
        else if (op == "peek") { cout << mq.peek() << endl; }
    }
    return 0;
}`,
      python: `import sys

class MyQueue:
    def __init__(self):
        self.s1 = []
        self.s2 = []
    def transfer(self):
        if not self.s2:
            while self.s1:
                self.s2.append(self.s1.pop())
    def push(self, x):
        self.s1.append(x)
    def pop(self):
        self.transfer()
        return self.s2.pop() if self.s2 else -1
    def peek(self):
        self.transfer()
        return self.s2[-1] if self.s2 else -1

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    q = int(tokens[0])
    idx = 1
    mq = MyQueue()
    for _ in range(q):
        op = tokens[idx]; idx += 1
        if op == "push":
            x = int(tokens[idx]); idx += 1
            mq.push(x)
        elif op == "pop":
            print(mq.pop())
        elif op == "peek":
            print(mq.peek())

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const q = parseInt(tokens[0], 10);
    let idx = 1;
    const s1 = [], s2 = [];
    function transfer() {
        if (!s2.length) {
            while (s1.length) s2.push(s1.pop());
        }
    }
    for (let i = 0; i < q; i++) {
        const op = tokens[idx++];
        if (op === 'push') {
            s1.push(parseInt(tokens[idx++], 10));
        } else if (op === 'pop') {
            transfer();
            console.log(s2.length ? s2.pop() : -1);
        } else if (op === 'peek') {
            transfer();
            console.log(s2.length ? s2[s2.length - 1] : -1);
        }
    }
}`,
    },
    sampleCases: [
      { id: 'qu-4-s1', input: '5\npush 1\npush 2\npeek\npop\npop', expectedOutput: '1\n1\n2', isSample: true, explanation: 'Two stacks provide true FIFO behavior.' },
      { id: 'qu-4-s2', input: '2\npop\npeek', expectedOutput: '-1\n-1', isSample: true, explanation: 'Empty.' },
    ],
    hiddenTestCases: [
      { id: 'qu-4-h1', input: '3\npush 10\npeek\npop', expectedOutput: '10\n10', isSample: false },
      { id: 'qu-4-h2', input: '5\npush 5\npush 15\npop\npush 25\npeek', expectedOutput: '5\n15', isSample: false },
      { id: 'qu-4-h3', input: '4\npush 1\npush 2\npop\npop', expectedOutput: '1\n2', isSample: false },
      { id: 'qu-4-h4', input: '3\npush 100\npop\npop', expectedOutput: '100\n-1', isSample: false },
      { id: 'qu-4-h5', input: '6\npush -1\npush -2\npeek\npop\npeek\npop', expectedOutput: '-1\n-1\n-2\n-2', isSample: false },
    ],
  },
  {
    id: 'queue-5-generate-binary-numbers',
    title: 'Generate Binary Numbers from 1 to N Using a Queue',
    topic: 'queues',
    difficulty: 'Easy',
    tags: ['Queues', 'Binary Representation'],
    description: `Given a number \`n\`, generate all binary numbers from 1 to \`n\` using a queue.
Print the generated binary strings separated by spaces.`,
    inputFormat: `A single integer \`n\`.`,
    outputFormat: `Print the binary numbers from 1 to \`n\` separated by spaces.`,
    constraints: ['1 <= n <= 1000'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Enqueue "1".', 'In each step up to n, dequeue `curr`, print it, then enqueue `curr + "0"` and `curr + "1"`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <string>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    queue<string> q;
    q.push("1");
    for (int i = 0; i < n; ++i) {
        string curr = q.front();
        q.pop();
        cout << curr << (i + 1 == n ? "" : " ");
        q.push(curr + "0");
        q.push(curr + "1");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys
from collections import deque

def main():
    n_str = sys.stdin.read().strip()
    if not n_str: return
    n = int(n_str)
    q = deque(["1"])
    out = []
    for _ in range(n):
        curr = q.popleft()
        out.append(curr)
        q.append(curr + "0")
        q.append(curr + "1")
    print(*(out))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const nStr = fs.readFileSync(0, 'utf-8').trim();
if (nStr) {
    const n = parseInt(nStr, 10);
    const q = ['1'];
    const out = [];
    for (let i = 0; i < n; i++) {
        const curr = q.shift();
        out.push(curr);
        q.push(curr + '0');
        q.push(curr + '1');
    }
    console.log(out.join(' '));
}`,
    },
    sampleCases: [
      { id: 'qu-5-s1', input: '5', expectedOutput: '1 10 11 100 101', isSample: true, explanation: 'Binary numbers for 1 through 5.' },
      { id: 'qu-5-s2', input: '2', expectedOutput: '1 10', isSample: true, explanation: '1 and 2 in binary.' },
    ],
    hiddenTestCases: [
      { id: 'qu-5-h1', input: '1', expectedOutput: '1', isSample: false },
      { id: 'qu-5-h2', input: '3', expectedOutput: '1 10 11', isSample: false },
      { id: 'qu-5-h3', input: '6', expectedOutput: '1 10 11 100 101 110', isSample: false },
      { id: 'qu-5-h4', input: '7', expectedOutput: '1 10 11 100 101 110 111', isSample: false },
      { id: 'qu-5-h5', input: '4', expectedOutput: '1 10 11 100', isSample: false },
    ],
  },

  // ==========================================
  // 7. BINARY SEARCH TREES (5 Questions)
  // ==========================================
  {
    id: 'bst-1-inorder-traversal',
    title: 'Insert into BST and Print Inorder Traversal',
    topic: 'trees',
    difficulty: 'Easy',
    tags: ['Trees', 'BST', 'Recursion'],
    description: `Given \`n\` integers, insert them sequentially into an initially empty Binary Search Tree (BST).
Then perform an Inorder Traversal (Left, Root, Right) and print the nodes visited.
Recall that for a valid BST, the inorder traversal prints keys in ascending sorted order.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers to insert into the BST.`,
    outputFormat: `Print the inorder traversal of the BST separated by spaces.`,
    constraints: ['1 <= n <= 10^4', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n log n) average',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Recursively insert: if key < node->key, insert left; else insert right.', 'Inorder is inorder(left), visit(root), inorder(right).'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

void inorder(Node* root, vector<int>& out) {
    if (!root) return;
    inorder(root->left, out);
    out.push_back(root->data);
    inorder(root->right, out);
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    Node* root = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        root = insert(root, x);
    }
    vector<int> out;
    inorder(root, out);
    for (int i = 0; i < (int)out.size(); ++i) {
        cout << out[i] << (i + 1 == (int)out.size() ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

class Node:
    def __init__(self, v):
        self.v = v
        self.left = None
        self.right = None

def insert(root, v):
    if not root: return Node(v)
    if v < root.v: root.left = insert(root.left, v)
    else: root.right = insert(root.right, v)
    return root

def inorder(root, out):
    if not root: return
    inorder(root.left, out)
    out.append(root.v)
    inorder(root.right, out)

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    vals = [int(x) for x in data[1:n+1]]
    root = None
    for v in vals:
        root = insert(root, v)
    out = []
    inorder(root, out)
    print(*(out))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const vals = input.slice(1, n + 1).map(Number);
    class Node { constructor(v) { this.v = v; this.left = null; this.right = null; } }
    function insert(root, v) {
        if (!root) return new Node(v);
        if (v < root.v) root.left = insert(root.left, v);
        else root.right = insert(root.right, v);
        return root;
    }
    let root = null;
    for (const v of vals) root = insert(root, v);
    const out = [];
    function inorder(node) {
        if (!node) return;
        inorder(node.left);
        out.push(node.v);
        inorder(node.right);
    }
    inorder(root);
    console.log(out.join(' '));
}`,
    },
    sampleCases: [
      { id: 'bst-1-s1', input: '5\n5 3 7 2 4', expectedOutput: '2 3 4 5 7', isSample: true, explanation: 'Inorder of BST produces sorted elements.' },
      { id: 'bst-1-s2', input: '3\n10 5 15', expectedOutput: '5 10 15', isSample: true, explanation: 'Inorder traversal.' },
    ],
    hiddenTestCases: [
      { id: 'bst-1-h1', input: '1\n42', expectedOutput: '42', isSample: false },
      { id: 'bst-1-h2', input: '4\n1 2 3 4', expectedOutput: '1 2 3 4', isSample: false },
      { id: 'bst-1-h3', input: '4\n4 3 2 1', expectedOutput: '1 2 3 4', isSample: false },
      { id: 'bst-1-h4', input: '5\n-5 10 0 -10 20', expectedOutput: '-10 -5 0 10 20', isSample: false },
      { id: 'bst-1-h5', input: '6\n15 10 20 8 12 25', expectedOutput: '8 10 12 15 20 25', isSample: false },
    ],
  },
  {
    id: 'bst-2-search-key',
    title: 'Search in a Binary Search Tree',
    topic: 'trees',
    difficulty: 'Easy',
    tags: ['Trees', 'BST'],
    description: `Given \`n\` integers inserted into a BST and a target key \`target\`, determine if \`target\` exists in the BST.
Print \`true\` if found, else \`false\`.`,
    inputFormat: `The first line contains \`n\` and \`target\`.
The second line contains \`n\` space-separated integers inserted into the BST.`,
    outputFormat: `Print \`true\` or \`false\`.`,
    constraints: ['1 <= n <= 10^4', '-10^9 <= val, target <= 10^9'],
    expectedTimeComplexity: 'O(log n) average',
    expectedSpaceComplexity: 'O(log n)',
    hints: ['If target == node->val return true.', 'If target < node->val recurse left, else recurse right.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

bool search(Node* root, int target) {
    if (!root) return false;
    if (root->data == target) return true;
    if (target < root->data) return search(root->left, target);
    return search(root->right, target);
}

int main() {
    int n, target;
    if (!(cin >> n >> target)) return 0;
    Node* root = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        root = insert(root, x);
    }
    cout << (search(root, target) ? "true" : "false") << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, target = int(data[0]), int(data[1])
    vals = set(int(x) for x in data[2:n+2])
    print("true" if target in vals else "false")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const target = parseInt(input[1], 10);
    const vals = new Set(input.slice(2, n + 2).map(Number));
    console.log(vals.has(target) ? 'true' : 'false');
}`,
    },
    sampleCases: [
      { id: 'bst-2-s1', input: '5 4\n5 3 7 2 4', expectedOutput: 'true', isSample: true, explanation: '4 is present in the BST.' },
      { id: 'bst-2-s2', input: '4 99\n10 5 15 20', expectedOutput: 'false', isSample: true, explanation: '99 is not in the tree.' },
    ],
    hiddenTestCases: [
      { id: 'bst-2-h1', input: '1 5\n5', expectedOutput: 'true', isSample: false },
      { id: 'bst-2-h2', input: '5 0\n-10 -5 0 5 10', expectedOutput: 'true', isSample: false },
      { id: 'bst-2-h3', input: '4 1\n2 3 4 5', expectedOutput: 'false', isSample: false },
      { id: 'bst-2-h4', input: '3 30\n10 20 30', expectedOutput: 'true', isSample: false },
      { id: 'bst-2-h5', input: '5 -20\n-10 0 10 20 30', expectedOutput: 'false', isSample: false },
    ],
  },
  {
    id: 'bst-3-min-max',
    title: 'Find Minimum and Maximum in a BST',
    topic: 'trees',
    difficulty: 'Easy',
    tags: ['Trees', 'BST'],
    description: `Given \`n\` integers inserted into a BST, find both the minimum and maximum values in the tree.
Print the minimum value and maximum value separated by a space.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print \`minVal maxVal\`.`,
    constraints: ['1 <= n <= 10^4', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(h) where h is tree height',
    expectedSpaceComplexity: 'O(1)',
    hints: ['To find min: keep moving to `left` child until NULL.', 'To find max: keep moving to `right` child until NULL.'],
    starterCode: {
      cpp: `#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    Node* root = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        root = insert(root, x);
    }

    Node* curr = root;
    while (curr && curr->left) curr = curr->left;
    int minVal = curr->data;

    curr = root;
    while (curr && curr->right) curr = curr->right;
    int maxVal = curr->data;

    cout << minVal << " " << maxVal << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    vals = [int(x) for x in data[1:n+1]]
    print(f"{min(vals)} {max(vals)}")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const vals = input.slice(1, n + 1).map(Number);
    let mn = vals[0], mx = vals[0];
    for (const v of vals) {
        if (v < mn) mn = v;
        if (v > mx) mx = v;
    }
    console.log(mn + ' ' + mx);
}`,
    },
    sampleCases: [
      { id: 'bst-3-s1', input: '5\n20 10 30 5 15', expectedOutput: '5 30', isSample: true, explanation: 'Min is 5, Max is 30.' },
      { id: 'bst-3-s2', input: '1\n100', expectedOutput: '100 100', isSample: true, explanation: 'Single node is both min and max.' },
    ],
    hiddenTestCases: [
      { id: 'bst-3-h1', input: '3\n1 2 3', expectedOutput: '1 3', isSample: false },
      { id: 'bst-3-h2', input: '3\n3 2 1', expectedOutput: '1 3', isSample: false },
      { id: 'bst-3-h3', input: '5\n-10 -20 0 10 20', expectedOutput: '-20 20', isSample: false },
      { id: 'bst-3-h4', input: '4\n50 25 75 10', expectedOutput: '10 75', isSample: false },
      { id: 'bst-3-h5', input: '2\n-5 5', expectedOutput: '-5 5', isSample: false },
    ],
  },
  {
    id: 'bst-4-delete-node',
    title: 'Delete a Node from a Binary Search Tree',
    topic: 'trees',
    difficulty: 'Hard',
    tags: ['Trees', 'BST', 'Recursion'],
    description: `Given \`n\` integers inserted into a BST and a key \`key\` to delete, delete the node containing \`key\` and print the Inorder traversal of the updated BST.
If the tree becomes empty, print \`EMPTY\`.
Three cases apply:
1. Node is a leaf: remove directly.
2. Node has 1 child: replace node with its child.
3. Node has 2 children: replace node's value with its inorder successor (smallest in right subtree), then delete the successor.`,
    inputFormat: `The first line contains \`n\` and \`key\`.
The second line contains \`n\` space-separated integers inserted into the BST.`,
    outputFormat: `Print the inorder traversal of the tree after deletion, or \`EMPTY\` if no nodes remain.`,
    constraints: ['1 <= n <= 10^4', '-10^9 <= val, key <= 10^9'],
    expectedTimeComplexity: 'O(h) where h is height',
    expectedSpaceComplexity: 'O(h)',
    hints: ['Find the node recursively.', 'In the 2-child case, find minNode(root->right), copy its data, then root->right = deleteNode(root->right, minNode->data).'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

struct Node {
    int data;
    Node* left;
    Node* right;
    Node(int v) : data(v), left(nullptr), right(nullptr) {}
};

Node* insert(Node* root, int val) {
    if (!root) return new Node(val);
    if (val < root->data) root->left = insert(root->left, val);
    else root->right = insert(root->right, val);
    return root;
}

Node* findMin(Node* root) {
    while (root && root->left) root = root->left;
    return root;
}

Node* deleteNode(Node* root, int key) {
    if (!root) return nullptr;
    if (key < root->data) {
        root->left = deleteNode(root->left, key);
    } else if (key > root->data) {
        root->right = deleteNode(root->right, key);
    } else {
        if (!root->left) {
            Node* temp = root->right;
            delete root;
            return temp;
        } else if (!root->right) {
            Node* temp = root->left;
            delete root;
            return temp;
        }
        Node* temp = findMin(root->right);
        root->data = temp->data;
        root->right = deleteNode(root->right, temp->data);
    }
    return root;
}

void inorder(Node* root, vector<int>& out) {
    if (!root) return;
    inorder(root->left, out);
    out.push_back(root->data);
    inorder(root->right, out);
}

int main() {
    int n, key;
    if (!(cin >> n >> key)) return 0;
    Node* root = nullptr;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        root = insert(root, x);
    }
    root = deleteNode(root, key);
    if (!root) {
        cout << "EMPTY" << endl;
        return 0;
    }
    vector<int> out;
    inorder(root, out);
    for (int i = 0; i < (int)out.size(); ++i) {
        cout << out[i] << (i + 1 == (int)out.size() ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, key = int(data[0]), int(data[1])
    vals = [int(x) for x in data[2:n+2]]
    if key in vals:
        vals.remove(key)
    vals.sort()
    if not vals:
        print("EMPTY")
    else:
        print(*(vals))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const key = parseInt(input[1], 10);
    const vals = input.slice(2, n + 2).map(Number);
    const idx = vals.indexOf(key);
    if (idx !== -1) vals.splice(idx, 1);
    vals.sort((a, b) => a - b);
    if (vals.length === 0) console.log('EMPTY');
    else console.log(vals.join(' '));
}`,
    },
    sampleCases: [
      { id: 'bst-4-s1', input: '6 3\n5 3 6 2 4 7', expectedOutput: '2 4 5 6 7', isSample: true, explanation: 'Node 3 is deleted. Inorder is 2 4 5 6 7.' },
      { id: 'bst-4-s2', input: '1 10\n10', expectedOutput: 'EMPTY', isSample: true, explanation: 'Deleting the only node leaves the tree EMPTY.' },
    ],
    hiddenTestCases: [
      { id: 'bst-4-h1', input: '5 7\n5 3 7 6 8', expectedOutput: '3 5 6 8', isSample: false },
      { id: 'bst-4-h2', input: '4 5\n5 3 2 4', expectedOutput: '2 3 4', isSample: false },
      { id: 'bst-4-h3', input: '3 99\n1 2 3', expectedOutput: '1 2 3', isSample: false },
      { id: 'bst-4-h4', input: '4 2\n5 3 2 4', expectedOutput: '3 4 5', isSample: false },
      { id: 'bst-4-h5', input: '6 10\n10 5 15 2 7 12', expectedOutput: '2 5 7 12 15', isSample: false },
    ],
  },
  {
    id: 'bst-5-validate-bst',
    title: 'Validate Binary Search Tree Property',
    topic: 'trees',
    difficulty: 'Medium',
    tags: ['Trees', 'BST', 'Recursion'],
    description: `Given the inorder traversal sequence of a proposed strictly increasing Binary Search Tree, verify if the sequence strictly satisfies the BST property (every element must be strictly greater than the preceding element).
Print \`true\` if valid, else \`false\`.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers representing the traversal.`,
    outputFormat: `Print \`true\` or \`false\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= val <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Check if arr[i] > arr[i-1] for every index i from 1 to n-1.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; ++i) cin >> arr[i];

    bool valid = true;
    for (int i = 1; i < n; ++i) {
        if (arr[i] <= arr[i - 1]) {
            valid = false;
            break;
        }
    }
    cout << (valid ? "true" : "false") << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    arr = [int(x) for x in data[1:n+1]]
    valid = all(arr[i] > arr[i - 1] for i in range(1, n))
    print("true" if valid else "false")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const arr = input.slice(1, n + 1).map(Number);
    let valid = true;
    for (let i = 1; i < n; i++) {
        if (arr[i] <= arr[i - 1]) { valid = false; break; }
    }
    console.log(valid ? 'true' : 'false');
}`,
    },
    sampleCases: [
      { id: 'bst-5-s1', input: '4\n1 2 3 4', expectedOutput: 'true', isSample: true, explanation: 'Strictly increasing inorder is valid BST.' },
      { id: 'bst-5-s2', input: '4\n1 3 2 4', expectedOutput: 'false', isSample: true, explanation: '3 > 2 violates BST ordering.' },
    ],
    hiddenTestCases: [
      { id: 'bst-5-h1', input: '1\n10', expectedOutput: 'true', isSample: false },
      { id: 'bst-5-h2', input: '3\n2 2 2', expectedOutput: 'false', isSample: false },
      { id: 'bst-5-h3', input: '5\n-10 -5 0 5 10', expectedOutput: 'true', isSample: false },
      { id: 'bst-5-h4', input: '4\n10 20 20 30', expectedOutput: 'false', isSample: false },
      { id: 'bst-5-h5', input: '5\n5 4 3 2 1', expectedOutput: 'false', isSample: false },
    ],
  },

  // ==========================================
  // 8. HEAPS (5 Questions)
  // ==========================================
  {
    id: 'heap-1-min-heap-operations',
    title: 'Implement Min-Heap Operations',
    topic: 'heaps',
    difficulty: 'Medium',
    tags: ['Heaps', 'Priority Queue'],
    description: `Implement a Min-Heap supporting:
- \`push x\`: Insert integer \`x\` and restore min-heap property.
- \`pop\`: Extract and print the minimum (root) element. If empty, print \`-1\`.
- \`peek\`: Print the minimum element without removing it. If empty, print \`-1\`.`,
    inputFormat: `The first line contains \`q\`.
The next \`q\` lines contain operations.`,
    outputFormat: `Print the result of each \`pop\` and \`peek\` on a new line.`,
    constraints: ['1 <= q <= 10^5', '-10^9 <= x <= 10^9'],
    expectedTimeComplexity: 'O(log n) for push/pop, O(1) for peek',
    expectedSpaceComplexity: 'O(q)',
    hints: ['Use std::priority_queue with greater<int> in C++ or heapq in Python.'],
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <vector>
#include <string>
using namespace std;

int main() {
    int q;
    if (!(cin >> q)) return 0;
    priority_queue<int, vector<int>, greater<int>> minHeap;
    while (q--) {
        string op; cin >> op;
        if (op == "push") {
            int x; cin >> x;
            minHeap.push(x);
        } else if (op == "pop") {
            if (minHeap.empty()) {
                cout << -1 << endl;
            } else {
                cout << minHeap.top() << endl;
                minHeap.pop();
            }
        } else if (op == "peek") {
            if (minHeap.empty()) {
                cout << -1 << endl;
            } else {
                cout << minHeap.top() << endl;
            }
        }
    }
    return 0;
}`,
      python: `import sys
import heapq

def main():
    tokens = sys.stdin.read().split()
    if not tokens: return
    q = int(tokens[0])
    idx = 1
    h = []
    for _ in range(q):
        op = tokens[idx]; idx += 1
        if op == "push":
            x = int(tokens[idx]); idx += 1
            heapq.heappush(h, x)
        elif op == "pop":
            print(heapq.heappop(h) if h else -1)
        elif op == "peek":
            print(h[0] if h else -1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const tokens = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (tokens.length > 0 && tokens[0] !== '') {
    const q = parseInt(tokens[0], 10);
    let idx = 1;
    const h = [];
    for (let i = 0; i < q; i++) {
        const op = tokens[idx++];
        if (op === 'push') {
            h.push(parseInt(tokens[idx++], 10));
            h.sort((a, b) => a - b);
        } else if (op === 'pop') {
            console.log(h.length ? h.shift() : -1);
        } else if (op === 'peek') {
            console.log(h.length ? h[0] : -1);
        }
    }
}`,
    },
    sampleCases: [
      { id: 'hp-1-s1', input: '5\npush 10\npush 5\npeek\npop\npop', expectedOutput: '5\n5\n10', isSample: true, explanation: 'Min-heap keeps minimum 5 at root.' },
      { id: 'hp-1-s2', input: '2\npop\npeek', expectedOutput: '-1\n-1', isSample: true, explanation: 'Empty heap returns -1.' },
    ],
    hiddenTestCases: [
      { id: 'hp-1-h1', input: '3\npush 42\npeek\npop', expectedOutput: '42\n42', isSample: false },
      { id: 'hp-1-h2', input: '5\npush 30\npush 10\npush 20\npop\npeek', expectedOutput: '10\n20', isSample: false },
      { id: 'hp-1-h3', input: '4\npush -5\npush -10\npop\npop', expectedOutput: '-10\n-5', isSample: false },
      { id: 'hp-1-h4', input: '4\npop\npush 1\npeek\npop', expectedOutput: '-1\n1\n1', isSample: false },
      { id: 'hp-1-h5', input: '6\npush 4\npush 2\npush 8\npop\npop\npop', expectedOutput: '2\n4\n8', isSample: false },
    ],
  },
  {
    id: 'heap-2-heap-sort',
    title: 'Implement Heap Sort',
    topic: 'heaps',
    difficulty: 'Medium',
    tags: ['Heaps', 'Sorting'],
    description: `Given an array of \`n\` integers, sort the array in ascending order using Heap Sort.
Print the sorted array separated by spaces.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the sorted array.`,
    constraints: ['1 <= n <= 5 * 10^4', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n log n)',
    expectedSpaceComplexity: 'O(1) auxiliary',
    hints: ['Build max-heap in O(n) time.', 'Repeatedly swap root with end element and call heapify-down on root.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void heapify(vector<int>& arr, int n, int i) {
    int largest = i;
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest != i) {
        swap(arr[i], arr[largest]);
        heapify(arr, n, largest);
    }
}

void heapSort(vector<int>& arr, int n) {
    for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
    for (int i = n - 1; i > 0; i--) {
        swap(arr[0], arr[i]);
        heapify(arr, i, 0);
    }
}

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<int> arr(n);
    for (int i = 0; i < n; ++i) cin >> arr[i];
    heapSort(arr, n);
    for (int i = 0; i < n; ++i) cout << arr[i] << (i + 1 == n ? "" : " ");
    cout << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    arr = [int(x) for x in data[1:n+1]]
    arr.sort()
    print(*(arr))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const arr = input.slice(1, n + 1).map(Number);
    arr.sort((a, b) => a - b);
    console.log(arr.join(' '));
}`,
    },
    sampleCases: [
      { id: 'hp-2-s1', input: '5\n12 11 13 5 6', expectedOutput: '5 6 11 12 13', isSample: true, explanation: 'Heap sort produces sorted array.' },
      { id: 'hp-2-s2', input: '3\n3 2 1', expectedOutput: '1 2 3', isSample: true, explanation: '1 2 3.' },
    ],
    hiddenTestCases: [
      { id: 'hp-2-h1', input: '1\n10', expectedOutput: '10', isSample: false },
      { id: 'hp-2-h2', input: '4\n-1 -5 2 0', expectedOutput: '-5 -1 0 2', isSample: false },
      { id: 'hp-2-h3', input: '5\n1 2 3 4 5', expectedOutput: '1 2 3 4 5', isSample: false },
      { id: 'hp-2-h4', input: '4\n100 50 150 25', expectedOutput: '25 50 100 150', isSample: false },
      { id: 'hp-2-h5', input: '5\n7 7 7 7 7', expectedOutput: '7 7 7 7 7', isSample: false },
    ],
  },
  {
    id: 'heap-3-kth-largest',
    title: 'Find Kth Largest Element',
    topic: 'heaps',
    difficulty: 'Medium',
    tags: ['Heaps', 'Priority Queue'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\`-th largest element in the array.
Note that it is the \`k\`-th largest in sorted order, not the \`k\`-th distinct element.`,
    inputFormat: `The first line contains \`n\` and \`k\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the \`k\`-th largest element.`,
    constraints: ['1 <= k <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n log k)',
    expectedSpaceComplexity: 'O(k)',
    hints: ['Maintain a min-heap of size k.', 'When heap size exceeds k, pop the smallest element.', 'After processing all elements, root is the kth largest.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int n, k;
    if (!(cin >> n >> k)) return 0;
    priority_queue<int, vector<int>, greater<int>> minHeap;
    for (int i = 0; i < n; ++i) {
        int x; cin >> x;
        minHeap.push(x);
        if ((int)minHeap.size() > k) minHeap.pop();
    }
    cout << minHeap.top() << endl;
    return 0;
}`,
      python: `import sys
import heapq

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]
    min_heap = []
    for x in nums:
        heapq.heappush(min_heap, x)
        if len(min_heap) > k:
            heapq.heappop(min_heap)
    print(min_heap[0])

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const k = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    nums.sort((a, b) => b - a);
    console.log(nums[k - 1]);
}`,
    },
    sampleCases: [
      { id: 'hp-3-s1', input: '6 2\n3 2 1 5 6 4', expectedOutput: '5', isSample: true, explanation: 'The 2nd largest element is 5.' },
      { id: 'hp-3-s2', input: '9 4\n3 2 3 1 2 4 5 5 6', expectedOutput: '4', isSample: true, explanation: 'The 4th largest is 4.' },
    ],
    hiddenTestCases: [
      { id: 'hp-3-h1', input: '1 1\n100', expectedOutput: '100', isSample: false },
      { id: 'hp-3-h2', input: '5 1\n1 2 3 4 5', expectedOutput: '5', isSample: false },
      { id: 'hp-3-h3', input: '5 5\n1 2 3 4 5', expectedOutput: '1', isSample: false },
      { id: 'hp-3-h4', input: '4 2\n-5 -2 -1 -10', expectedOutput: '-2', isSample: false },
      { id: 'hp-3-h5', input: '5 3\n10 10 10 10 10', expectedOutput: '10', isSample: false },
    ],
  },
  {
    id: 'heap-4-check-max-heap',
    title: 'Check if an Array Represents a Max-Heap',
    topic: 'heaps',
    difficulty: 'Easy',
    tags: ['Heaps'],
    description: `Given an array of \`n\` integers representing a complete binary tree, determine whether it satisfies the Max-Heap property.
Specifically, for every index \`i\` (0-based):
- If left child \`2*i + 1 < n\`, then \`arr[i] >= arr[2*i + 1]\`.
- If right child \`2*i + 2 < n\`, then \`arr[i] >= arr[2*i + 2]\`.
Print \`true\` if it is a valid Max-Heap, else \`false\`.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print \`true\` or \`false\`.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= arr[i] <= 10^9'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1)',
    hints: ['Loop from i = 0 up to (n - 2) / 2 and check child bounds and values.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    vector<long long> arr(n);
    for (int i = 0; i < n; ++i) cin >> arr[i];

    bool isMaxHeap = true;
    for (int i = 0; i <= (n - 2) / 2; ++i) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        if (left < n && arr[i] < arr[left]) { isMaxHeap = false; break; }
        if (right < n && arr[i] < arr[right]) { isMaxHeap = false; break; }
    }
    cout << (isMaxHeap ? "true" : "false") << endl;
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    arr = [int(x) for x in data[1:n+1]]
    is_heap = True
    for i in range((n - 2) // 2 + 1):
        l = 2 * i + 1
        r = 2 * i + 2
        if l < n and arr[i] < arr[l]: is_heap = False; break
        if r < n and arr[i] < arr[r]: is_heap = False; break
    print("true" if is_heap else "false")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const arr = input.slice(1, n + 1).map(Number);
    let ok = true;
    for (let i = 0; i <= Math.floor((n - 2) / 2); i++) {
        const l = 2 * i + 1, r = 2 * i + 2;
        if (l < n && arr[i] < arr[l]) { ok = false; break; }
        if (r < n && arr[i] < arr[r]) { ok = false; break; }
    }
    console.log(ok ? 'true' : 'false');
}`,
    },
    sampleCases: [
      { id: 'hp-4-s1', input: '6\n90 15 10 7 12 2', expectedOutput: 'true', isSample: true, explanation: 'Every parent is >= its children.' },
      { id: 'hp-4-s2', input: '6\n9 15 10 7 12 11', expectedOutput: 'false', isSample: true, explanation: 'Root 9 is smaller than child 15.' },
    ],
    hiddenTestCases: [
      { id: 'hp-4-h1', input: '1\n50', expectedOutput: 'true', isSample: false },
      { id: 'hp-4-h2', input: '3\n10 5 8', expectedOutput: 'true', isSample: false },
      { id: 'hp-4-h3', input: '3\n10 15 8', expectedOutput: 'false', isSample: false },
      { id: 'hp-4-h4', input: '5\n5 5 5 5 5', expectedOutput: 'true', isSample: false },
      { id: 'hp-4-h5', input: '4\n20 15 10 18', expectedOutput: 'false', isSample: false },
    ],
  },
  {
    id: 'heap-5-connect-ropes',
    title: 'Minimum Cost to Connect Ropes',
    topic: 'heaps',
    difficulty: 'Medium',
    tags: ['Heaps', 'Greedy'],
    description: `Given \`n\` ropes of different lengths, connect them into a single rope.
The cost to connect two ropes is equal to the sum of their lengths. Find the minimum total cost to connect all ropes.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers representing rope lengths.`,
    outputFormat: `Print the minimum total cost.`,
    constraints: ['1 <= n <= 10^5', '1 <= length <= 10^4'],
    expectedTimeComplexity: 'O(n log n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Greedy choice: always connect the two smallest ropes first.', 'Use a min-heap to repeatedly extract the two smallest elements, sum them, add to total cost, and push sum back.'],
    starterCode: {
      cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    priority_queue<long long, vector<long long>, greater<long long>> minHeap;
    for (int i = 0; i < n; ++i) {
        long long x; cin >> x;
        minHeap.push(x);
    }
    long long totalCost = 0;
    while (minHeap.size() > 1) {
        long long a = minHeap.top(); minHeap.pop();
        long long b = minHeap.top(); minHeap.pop();
        totalCost += (a + b);
        minHeap.push(a + b);
    }
    cout << totalCost << endl;
    return 0;
}`,
      python: `import sys
import heapq

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    ropes = [int(x) for x in data[1:n+1]]
    heapq.heapify(ropes)
    total_cost = 0
    while len(ropes) > 1:
        a = heapq.heappop(ropes)
        b = heapq.heappop(ropes)
        cost = a + b
        total_cost += cost
        heapq.heappush(ropes, cost)
    print(total_cost)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const ropes = input.slice(1, n + 1).map(Number);
    ropes.sort((a, b) => a - b);
    let totalCost = 0;
    while (ropes.length > 1) {
        const a = ropes.shift();
        const b = ropes.shift();
        const sum = a + b;
        totalCost += sum;
        // Insert back in sorted order
        let ins = 0;
        while (ins < ropes.length && ropes[ins] < sum) ins++;
        ropes.splice(ins, 0, sum);
    }
    console.log(totalCost);
}`,
    },
    sampleCases: [
      { id: 'hp-5-s1', input: '4\n4 3 2 6', expectedOutput: '29', isSample: true, explanation: 'Connect 2 and 3 (cost 5). Connect 4 and 5 (cost 9). Connect 6 and 9 (cost 15). Total = 5 + 9 + 15 = 29.' },
      { id: 'hp-5-s2', input: '1\n10', expectedOutput: '0', isSample: true, explanation: 'Single rope requires no connections.' },
    ],
    hiddenTestCases: [
      { id: 'hp-5-h1', input: '2\n5 10', expectedOutput: '15', isSample: false },
      { id: 'hp-5-h2', input: '5\n1 2 3 4 5', expectedOutput: '33', isSample: false },
      { id: 'hp-5-h3', input: '3\n2 2 2', expectedOutput: '10', isSample: false },
      { id: 'hp-5-h4', input: '4\n1 1 1 1', expectedOutput: '8', isSample: false },
      { id: 'hp-5-h5', input: '3\n10 20 30', expectedOutput: '90', isSample: false },
    ],
  },

  // ==========================================
  // 9. GRAPHS (5 Questions)
  // ==========================================
  {
    id: 'graph-1-bfs',
    title: 'Breadth-First Search (BFS) Traversal',
    topic: 'graphs',
    difficulty: 'Easy',
    tags: ['Graphs', 'BFS', 'Queue'],
    description: `Given an undirected graph with \`V\` vertices (0 to V-1) and \`E\` edges, print the Breadth-First Search (BFS) traversal starting from vertex \`0\`.
When exploring neighbors of any vertex, visit them in increasing numerical order.`,
    inputFormat: `The first line contains \`V\` and \`E\`.
The next \`E\` lines each contain two integers \`u\` and \`v\` representing an undirected edge.`,
    outputFormat: `Print the vertices visited by BFS separated by spaces.`,
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V)',
    hints: ['Sort neighbor lists so smaller vertices are visited first.', 'Use a boolean visited array and std::queue.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>
using namespace std;

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int i = 0; i < V; ++i) sort(adj[i].begin(), adj[i].end());

    vector<bool> visited(V, false);
    queue<int> q;
    vector<int> bfsOrder;

    visited[0] = true;
    q.push(0);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        bfsOrder.push_back(u);
        for (int v : adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }

    for (int i = 0; i < (int)bfsOrder.size(); ++i) {
        cout << bfsOrder[i] << (i + 1 == (int)bfsOrder.size() ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys
from collections import deque

def main():
    data = sys.stdin.read().split()
    if not data: return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
    for neighbors in adj:
        neighbors.sort()

    visited = [False] * V
    q = deque([0])
    visited[0] = True
    bfs_order = []

    while q:
        u = q.popleft()
        bfs_order.append(u)
        for v in adj[u]:
            if not visited[v]:
                visited[v] = True
                q.append(v)
    print(*(bfs_order))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const V = parseInt(input[0], 10);
    const E = parseInt(input[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(input[idx++], 10);
        const v = parseInt(input[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    adj.forEach(list => list.sort((a, b) => a - b));
    const visited = new Array(V).fill(false);
    const q = [0];
    visited[0] = true;
    const bfs = [];
    while (q.length) {
        const u = q.shift();
        bfs.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }
    console.log(bfs.join(' '));
}`,
    },
    sampleCases: [
      { id: 'gr-1-s1', input: '5 4\n0 1\n0 2\n0 3\n2 4', expectedOutput: '0 1 2 3 4', isSample: true, explanation: 'Level-order BFS traversal.' },
      { id: 'gr-1-s2', input: '3 2\n0 1\n1 2', expectedOutput: '0 1 2', isSample: true, explanation: 'Simple chain.' },
    ],
    hiddenTestCases: [
      { id: 'gr-1-h1', input: '1 0', expectedOutput: '0', isSample: false },
      { id: 'gr-1-h2', input: '4 3\n0 3\n0 1\n1 2', expectedOutput: '0 1 3 2', isSample: false },
      { id: 'gr-1-h3', input: '4 4\n0 1\n1 2\n2 3\n3 0', expectedOutput: '0 1 3 2', isSample: false },
      { id: 'gr-1-h4', input: '4 6\n0 1\n0 2\n0 3\n1 2\n1 3\n2 3', expectedOutput: '0 1 2 3', isSample: false },
      { id: 'gr-1-h5', input: '3 1\n0 2', expectedOutput: '0 2', isSample: false },
    ],
  },
  {
    id: 'graph-2-dfs',
    title: 'Depth-First Search (DFS) Traversal',
    topic: 'graphs',
    difficulty: 'Easy',
    tags: ['Graphs', 'DFS', 'Recursion'],
    description: `Given an undirected graph with \`V\` vertices (0 to V-1) and \`E\` edges, print the Depth-First Search (DFS) traversal starting from vertex \`0\`.
Explore neighbors in increasing numerical order.`,
    inputFormat: `The first line contains \`V\` and \`E\`.
The next \`E\` lines each contain two integers \`u\` and \`v\`.`,
    outputFormat: `Print the vertices visited by DFS separated by spaces.`,
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V)',
    hints: ['Sort neighbor lists.', 'Recursively visit unvisited neighbors.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    order.push_back(u);
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, adj, visited, order);
    }
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int i = 0; i < V; ++i) sort(adj[i].begin(), adj[i].end());

    vector<bool> visited(V, false);
    vector<int> order;
    dfs(0, adj, visited, order);

    for (int i = 0; i < (int)order.size(); ++i) {
        cout << order[i] << (i + 1 == (int)order.size() ? "" : " ");
    }
    cout << endl;
    return 0;
}`,
      python: `import sys
sys.setrecursionlimit(20000)

def dfs(u, adj, visited, order):
    visited[u] = True
    order.append(u)
    for v in adj[u]:
        if not visited[v]:
            dfs(v, adj, visited, order)

def main():
    data = sys.stdin.read().split()
    if not data: return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2
    for neighbors in adj: neighbors.sort()

    visited = [False] * V
    order = []
    dfs(0, adj, visited, order)
    print(*(order))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const V = parseInt(input[0], 10);
    const E = parseInt(input[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(input[idx++], 10);
        const v = parseInt(input[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    adj.forEach(l => l.sort((a, b) => a - b));
    const visited = new Array(V).fill(false);
    const order = [];
    function dfs(u) {
        visited[u] = true;
        order.push(u);
        for (const v of adj[u]) {
            if (!visited[v]) dfs(v);
        }
    }
    dfs(0);
    console.log(order.join(' '));
}`,
    },
    sampleCases: [
      { id: 'gr-2-s1', input: '5 4\n0 1\n0 2\n0 3\n2 4', expectedOutput: '0 1 2 4 3', isSample: true, explanation: 'DFS dives deep down branch 0 -> 2 -> 4 before backtracking.' },
      { id: 'gr-2-s2', input: '3 2\n0 1\n1 2', expectedOutput: '0 1 2', isSample: true, explanation: 'Chain.' },
    ],
    hiddenTestCases: [
      { id: 'gr-2-h1', input: '1 0', expectedOutput: '0', isSample: false },
      { id: 'gr-2-h2', input: '4 4\n0 1\n1 2\n2 3\n3 0', expectedOutput: '0 1 2 3', isSample: false },
      { id: 'gr-2-h3', input: '4 3\n0 3\n0 1\n1 2', expectedOutput: '0 1 2 3', isSample: false },
      { id: 'gr-2-h4', input: '3 3\n0 1\n1 2\n2 0', expectedOutput: '0 1 2', isSample: false },
      { id: 'gr-2-h5', input: '4 2\n0 2\n2 3', expectedOutput: '0 2 3', isSample: false },
    ],
  },
  {
    id: 'graph-3-connected-components',
    title: 'Count Connected Components in an Undirected Graph',
    topic: 'graphs',
    difficulty: 'Medium',
    tags: ['Graphs', 'BFS', 'DFS'],
    description: `Given \`V\` vertices numbered 0 to V-1 and \`E\` undirected edges, calculate the total number of connected components in the graph.`,
    inputFormat: `The first line contains \`V\` and \`E\`.
The next \`E\` lines each contain \`u\` and \`v\`.`,
    outputFormat: `Print the number of connected components.`,
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V)',
    hints: ['Iterate through all vertices 0 to V-1.', 'If a vertex is unvisited, increment count and launch BFS/DFS to mark all reachable vertices in that component.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

void dfs(int u, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) dfs(v, adj, visited);
    }
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<bool> visited(V, false);
    int components = 0;
    for (int i = 0; i < V; ++i) {
        if (!visited[i]) {
            components++;
            dfs(i, adj, visited);
        }
    }
    cout << components << endl;
    return 0;
}`,
      python: `import sys
sys.setrecursionlimit(20000)

def main():
    data = sys.stdin.read().split()
    if not data: return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2

    visited = [False] * V
    def dfs(u):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]: dfs(v)

    count = 0
    for i in range(V):
        if not visited[i]:
            count += 1
            dfs(i)
    print(count)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const V = parseInt(input[0], 10);
    const E = parseInt(input[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(input[idx++], 10);
        const v = parseInt(input[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    const visited = new Array(V).fill(false);
    function dfs(u) {
        visited[u] = true;
        for (const v of adj[u]) {
            if (!visited[v]) dfs(v);
        }
    }
    let count = 0;
    for (let i = 0; i < V; i++) {
        if (!visited[i]) { count++; dfs(i); }
    }
    console.log(count);
}`,
    },
    sampleCases: [
      { id: 'gr-3-s1', input: '5 3\n0 1\n1 2\n3 4', expectedOutput: '2', isSample: true, explanation: '{0, 1, 2} and {3, 4} form 2 separate components.' },
      { id: 'gr-3-s2', input: '3 0', expectedOutput: '3', isSample: true, explanation: 'No edges: each isolated vertex is its own component.' },
    ],
    hiddenTestCases: [
      { id: 'gr-3-h1', input: '4 3\n0 1\n1 2\n2 3', expectedOutput: '1', isSample: false },
      { id: 'gr-3-h2', input: '1 0', expectedOutput: '1', isSample: false },
      { id: 'gr-3-h3', input: '6 4\n0 1\n2 3\n4 5\n0 2', expectedOutput: '2', isSample: false },
      { id: 'gr-3-h4', input: '5 2\n0 1\n2 3', expectedOutput: '3', isSample: false },
      { id: 'gr-3-h5', input: '4 2\n0 1\n2 3', expectedOutput: '2', isSample: false },
    ],
  },
  {
    id: 'graph-4-detect-cycle',
    title: 'Detect Cycle in an Undirected Graph',
    topic: 'graphs',
    difficulty: 'Medium',
    tags: ['Graphs', 'DFS', 'Cycle Detection'],
    description: `Given an undirected graph with \`V\` vertices and \`E\` edges, determine if the graph contains any cycle.
Print \`true\` if a cycle exists, else \`false\`.`,
    inputFormat: `The first line contains \`V\` and \`E\`.
The next \`E\` lines contain \`u\` and \`v\`.`,
    outputFormat: `Print \`true\` or \`false\`.`,
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V)',
    hints: ['During DFS, pass the `parent` vertex.', 'If you encounter an already visited neighbor `v` and `v != parent`, a back-edge (cycle) is detected!'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
using namespace std;

bool hasCycleDFS(int u, int parent, const vector<vector<int>>& adj, vector<bool>& visited) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            if (hasCycleDFS(v, u, adj, visited)) return true;
        } else if (v != parent) {
            return true;
        }
    }
    return false;
}

int main() {
    int V, E;
    if (!(cin >> V >> E)) return 0;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<bool> visited(V, false);
    bool cycleFound = false;
    for (int i = 0; i < V; ++i) {
        if (!visited[i]) {
            if (hasCycleDFS(i, -1, adj, visited)) {
                cycleFound = true;
                break;
            }
        }
    }
    cout << (cycleFound ? "true" : "false") << endl;
    return 0;
}`,
      python: `import sys
sys.setrecursionlimit(20000)

def main():
    data = sys.stdin.read().split()
    if not data: return
    V, E = int(data[0]), int(data[1])
    adj = [[] for _ in range(V)]
    idx = 2
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2

    visited = [False] * V
    def dfs(u, parent):
        visited[u] = True
        for v in adj[u]:
            if not visited[v]:
                if dfs(v, u): return True
            elif v != parent:
                return True
        return False

    has_cycle = False
    for i in range(V):
        if not visited[i]:
            if dfs(i, -1):
                has_cycle = True
                break
    print("true" if has_cycle else "false")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const V = parseInt(input[0], 10);
    const E = parseInt(input[1], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 2;
    for (let i = 0; i < E; i++) {
        const u = parseInt(input[idx++], 10);
        const v = parseInt(input[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    const visited = new Array(V).fill(false);
    function dfs(u, parent) {
        visited[u] = true;
        for (const v of adj[u]) {
            if (!visited[v]) {
                if (dfs(v, u)) return true;
            } else if (v !== parent) {
                return true;
            }
        }
        return false;
    }
    let ok = false;
    for (let i = 0; i < V; i++) {
        if (!visited[i]) {
            if (dfs(i, -1)) { ok = true; break; }
        }
    }
    console.log(ok ? 'true' : 'false');
}`,
    },
    sampleCases: [
      { id: 'gr-4-s1', input: '4 4\n0 1\n1 2\n2 3\n3 0', expectedOutput: 'true', isSample: true, explanation: 'The 4 vertices form a cycle 0-1-2-3-0.' },
      { id: 'gr-4-s2', input: '3 2\n0 1\n1 2', expectedOutput: 'false', isSample: true, explanation: 'Tree structure with no cycle.' },
    ],
    hiddenTestCases: [
      { id: 'gr-4-h1', input: '1 0', expectedOutput: 'false', isSample: false },
      { id: 'gr-4-h2', input: '3 3\n0 1\n1 2\n2 0', expectedOutput: 'true', isSample: false },
      { id: 'gr-4-h3', input: '5 4\n0 1\n0 2\n0 3\n0 4', expectedOutput: 'false', isSample: false },
      { id: 'gr-4-h4', input: '5 5\n0 1\n0 2\n0 3\n0 4\n1 4', expectedOutput: 'true', isSample: false },
      { id: 'gr-4-h5', input: '4 1\n0 1', expectedOutput: 'false', isSample: false },
    ],
  },
  {
    id: 'graph-5-shortest-path-unweighted',
    title: 'Shortest Path in Unweighted Graph',
    topic: 'graphs',
    difficulty: 'Medium',
    tags: ['Graphs', 'BFS', 'Shortest Path'],
    description: `Given an unweighted undirected graph with \`V\` vertices and \`E\` edges, find the length of the shortest path (in number of edges) from vertex \`src\` to vertex \`dest\`.
If no path exists, return \`-1\`.`,
    inputFormat: `The first line contains \`V\`, \`E\`, \`src\`, and \`dest\`.
The next \`E\` lines each contain \`u\` and \`v\`.`,
    outputFormat: `Print the shortest path edge distance or \`-1\`.`,
    constraints: ['1 <= V <= 10^4', '0 <= E <= 2 * 10^4'],
    expectedTimeComplexity: 'O(V + E)',
    expectedSpaceComplexity: 'O(V)',
    hints: ['BFS computes single-source shortest paths in unweighted graphs in radial waves.', 'Maintain a distance array initialized to -1 with `dist[src] = 0`.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    int V, E, src, dest;
    if (!(cin >> V >> E >> src >> dest)) return 0;
    vector<vector<int>> adj(V);
    for (int i = 0; i < E; ++i) {
        int u, v; cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    vector<int> dist(V, -1);
    queue<int> q;
    dist[src] = 0;
    q.push(src);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (u == dest) break;
        for (int v : adj[u]) {
            if (dist[v] == -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    cout << dist[dest] << endl;
    return 0;
}`,
      python: `import sys
from collections import deque

def main():
    data = sys.stdin.read().split()
    if not data: return
    V, E, src, dest = int(data[0]), int(data[1]), int(data[2]), int(data[3])
    adj = [[] for _ in range(V)]
    idx = 4
    for _ in range(E):
        u, v = int(data[idx]), int(data[idx+1])
        adj[u].append(v)
        adj[v].append(u)
        idx += 2

    dist = [-1] * V
    q = deque([src])
    dist[src] = 0

    while q:
        u = q.popleft()
        if u == dest: break
        for v in adj[u]:
            if dist[v] == -1:
                dist[v] = dist[u] + 1
                q.append(v)
    print(dist[dest])

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const V = parseInt(input[0], 10);
    const E = parseInt(input[1], 10);
    const src = parseInt(input[2], 10);
    const dest = parseInt(input[3], 10);
    const adj = Array.from({ length: V }, () => []);
    let idx = 4;
    for (let i = 0; i < E; i++) {
        const u = parseInt(input[idx++], 10);
        const v = parseInt(input[idx++], 10);
        adj[u].push(v);
        adj[v].push(u);
    }
    const dist = new Array(V).fill(-1);
    const q = [src];
    dist[src] = 0;
    while (q.length) {
        const u = q.shift();
        if (u === dest) break;
        for (const v of adj[u]) {
            if (dist[v] === -1) {
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
    console.log(dist[dest]);
}`,
    },
    sampleCases: [
      { id: 'gr-5-s1', input: '5 5 0 4\n0 1\n1 2\n2 4\n0 3\n3 4', expectedOutput: '2', isSample: true, explanation: 'Path 0 -> 3 -> 4 has length 2.' },
      { id: 'gr-5-s2', input: '4 2 0 3\n0 1\n2 3', expectedOutput: '-1', isSample: true, explanation: 'Disconnected components.' },
    ],
    hiddenTestCases: [
      { id: 'gr-5-h1', input: '1 0 0 0', expectedOutput: '0', isSample: false },
      { id: 'gr-5-h2', input: '3 2 0 2\n0 1\n1 2', expectedOutput: '2', isSample: false },
      { id: 'gr-5-h3', input: '4 4 0 2\n0 1\n1 2\n0 3\n3 2', expectedOutput: '2', isSample: false },
      { id: 'gr-5-h4', input: '5 4 0 4\n0 1\n1 2\n2 3\n3 4', expectedOutput: '4', isSample: false },
      { id: 'gr-5-h5', input: '2 1 0 1\n0 1', expectedOutput: '1', isSample: false },
    ],
  },

  // ==========================================
  // 10. HASH TABLES (5 Questions)
  // ==========================================
  {
    id: 'hash-1-frequency-counter',
    title: 'Count Element Frequencies using Hash Map',
    topic: 'hash-tables',
    difficulty: 'Easy',
    tags: ['Hash Tables', 'Counting'],
    description: `Given an array of \`n\` integers, count the frequency of each unique element.
Print each unique element and its frequency in ascending order of element value.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `For each unique element in ascending order, print \`element frequency\` on a new line.`,
    constraints: ['1 <= n <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n log u) where u is unique count',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Use an unordered_map to count frequencies, then sort keys or use std::map directly.'],
    starterCode: {
      cpp: `#include <iostream>
#include <map>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    map<long long, int> freq;
    for (int i = 0; i < n; ++i) {
        long long x; cin >> x;
        freq[x]++;
    }
    for (const auto& pair : freq) {
        cout << pair.first << " " << pair.second << endl;
    }
    return 0;
}`,
      python: `import sys
from collections import Counter

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    nums = [int(x) for x in data[1:n+1]]
    counts = Counter(nums)
    for key in sorted(counts.keys()):
        print(f"{key} {counts[key]}")

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const nums = input.slice(1, n + 1).map(Number);
    const map = new Map();
    for (const x of nums) map.set(x, (map.get(x) || 0) + 1);
    const keys = Array.from(map.keys()).sort((a, b) => a - b);
    for (const k of keys) console.log(k + ' ' + map.get(k));
}`,
    },
    sampleCases: [
      { id: 'hash-1-s1', input: '6\n1 3 2 1 3 1', expectedOutput: '1 3\n2 1\n3 2', isSample: true, explanation: '1 appears 3 times, 2 appears once, 3 appears twice.' },
      { id: 'hash-1-s2', input: '3\n5 5 5', expectedOutput: '5 3', isSample: true, explanation: '5 appears 3 times.' },
    ],
    hiddenTestCases: [
      { id: 'hash-1-h1', input: '1\n10', expectedOutput: '10 1', isSample: false },
      { id: 'hash-1-h2', input: '4\n-1 2 -1 2', expectedOutput: '-1 2\n2 2', isSample: false },
      { id: 'hash-1-h3', input: '5\n10 20 30 40 50', expectedOutput: '10 1\n20 1\n30 1\n40 1\n50 1', isSample: false },
      { id: 'hash-1-h4', input: '4\n0 0 0 0', expectedOutput: '0 4', isSample: false },
      { id: 'hash-1-h5', input: '5\n100 -50 100 0 -50', expectedOutput: '-50 2\n0 1\n100 2', isSample: false },
    ],
  },
  {
    id: 'hash-2-first-non-repeating',
    title: 'First Non-Repeating Character in a String',
    topic: 'hash-tables',
    difficulty: 'Easy',
    tags: ['Hash Tables', 'Strings'],
    description: `Given a string \`s\` consisting of lowercase English letters, find the 0-based index of the first non-repeating character.
If every character repeats, return \`-1\`.`,
    inputFormat: `A single line containing the string \`s\`.`,
    outputFormat: `Print the 0-based index or \`-1\`.`,
    constraints: ['1 <= s.length <= 10^5'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(1) [26 lowercase alphabet letters]',
    hints: ['Count the frequency of each char in pass 1.', 'In pass 2, find the first char whose count is 1.'],
    starterCode: {
      cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string s;
    if (!(cin >> s)) return 0;
    vector<int> freq(26, 0);
    for (char c : s) freq[c - 'a']++;

    int ans = -1;
    for (int i = 0; i < (int)s.size(); ++i) {
        if (freq[s[i] - 'a'] == 1) {
            ans = i;
            break;
        }
    }
    cout << ans << endl;
    return 0;
}`,
      python: `import sys
from collections import Counter

def main():
    s = sys.stdin.read().strip()
    if not s: return
    counts = Counter(s)
    for i, c in enumerate(s):
        if counts[c] == 1:
            print(i)
            return
    print(-1)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const s = fs.readFileSync(0, 'utf-8').trim();
if (s) {
    const counts = {};
    for (const c of s) counts[c] = (counts[c] || 0) + 1;
    let ans = -1;
    for (let i = 0; i < s.length; i++) {
        if (counts[s[i]] === 1) { ans = i; break; }
    }
    console.log(ans);
}`,
    },
    sampleCases: [
      { id: 'hash-2-s1', input: 'leetcode', expectedOutput: '0', isSample: true, explanation: "'l' at index 0 is non-repeating." },
      { id: 'hash-2-s2', input: 'loveleetcode', expectedOutput: '2', isSample: true, explanation: "'v' at index 2 is the first unique character." },
    ],
    hiddenTestCases: [
      { id: 'hash-2-h1', input: 'aabb', expectedOutput: '-1', isSample: false },
      { id: 'hash-2-h2', input: 'z', expectedOutput: '0', isSample: false },
      { id: 'hash-2-h3', input: 'abcabc', expectedOutput: '-1', isSample: false },
      { id: 'hash-2-h4', input: 'abccba', expectedOutput: '-1', isSample: false },
      { id: 'hash-2-h5', input: 'algorithms', expectedOutput: '0', isSample: false },
    ],
  },
  {
    id: 'hash-3-intersection-arrays',
    title: 'Intersection of Two Arrays',
    topic: 'hash-tables',
    difficulty: 'Easy',
    tags: ['Hash Tables', 'Set Operations'],
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their unique intersection (elements that appear in both arrays).
Print the intersection elements in ascending sorted order separated by spaces. If intersection is empty, print \`EMPTY\`.`,
    inputFormat: `The first line contains \`n\` and \`m\`.
The second line contains \`n\` space-separated integers for \`nums1\`.
The third line contains \`m\` space-separated integers for \`nums2\`.`,
    outputFormat: `Print the unique common elements in ascending order, or \`EMPTY\`.`,
    constraints: ['1 <= n, m <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    expectedTimeComplexity: 'O(n + m)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Insert all elements of nums1 into an unordered_set.', 'Iterate through nums2, if present in set, add to result set.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_set>
#include <algorithm>
using namespace std;

int main() {
    int n, m;
    if (!(cin >> n >> m)) return 0;
    unordered_set<long long> s1;
    for (int i = 0; i < n; ++i) {
        long long x; cin >> x;
        s1.insert(x);
    }
    vector<long long> inter;
    unordered_set<long long> seen;
    for (int i = 0; i < m; ++i) {
        long long x; cin >> x;
        if (s1.count(x) && !seen.count(x)) {
            inter.push_back(x);
            seen.insert(x);
        }
    }
    if (inter.empty()) {
        cout << "EMPTY" << endl;
    } else {
        sort(inter.begin(), inter.end());
        for (int i = 0; i < (int)inter.size(); ++i) {
            cout << inter[i] << (i + 1 == (int)inter.size() ? "" : " ");
        }
        cout << endl;
    }
    return 0;
}`,
      python: `import sys

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, m = int(data[0]), int(data[1])
    s1 = set(int(x) for x in data[2:2+n])
    s2 = set(int(x) for x in data[2+n:2+n+m])
    inter = sorted(list(s1.intersection(s2)))
    if not inter:
        print("EMPTY")
    else:
        print(*(inter))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const m = parseInt(input[1], 10);
    const s1 = new Set(input.slice(2, 2 + n).map(Number));
    const s2 = new Set(input.slice(2 + n, 2 + n + m).map(Number));
    const inter = [];
    for (const x of s2) {
        if (s1.has(x)) inter.push(x);
    }
    inter.sort((a, b) => a - b);
    if (inter.length === 0) console.log('EMPTY');
    else console.log(inter.join(' '));
}`,
    },
    sampleCases: [
      { id: 'hash-3-s1', input: '4 4\n1 2 2 1\n2 2 3 4', expectedOutput: '2', isSample: true, explanation: 'Unique common element is 2.' },
      { id: 'hash-3-s2', input: '3 2\n4 9 5\n9 4', expectedOutput: '4 9', isSample: true, explanation: '4 and 9 in both.' },
    ],
    hiddenTestCases: [
      { id: 'hash-3-h1', input: '3 3\n1 2 3\n4 5 6', expectedOutput: 'EMPTY', isSample: false },
      { id: 'hash-3-h2', input: '1 1\n5\n5', expectedOutput: '5', isSample: false },
      { id: 'hash-3-h3', input: '4 4\n-5 0 5 10\n-5 10 20 30', expectedOutput: '-5 10', isSample: false },
      { id: 'hash-3-h4', input: '2 2\n10 20\n20 10', expectedOutput: '10 20', isSample: false },
      { id: 'hash-3-h5', input: '5 5\n1 1 1 1 1\n1 1 1 1 1', expectedOutput: '1', isSample: false },
    ],
  },
  {
    id: 'hash-4-subarray-sum-k',
    title: 'Subarray Sum Equals K',
    topic: 'hash-tables',
    difficulty: 'Medium',
    tags: ['Hash Tables', 'Prefix Sum'],
    description: `Given an array of integers \`nums\` and an integer \`k\`, find the total number of continuous subarrays whose sum equals \`k\`.
Solve in \`O(n)\` time using a prefix sum frequency hash map.`,
    inputFormat: `The first line contains \`n\` and \`k\`.
The second line contains \`n\` space-separated integers.`,
    outputFormat: `Print the total count of subarrays summing to \`k\`.`,
    constraints: ['1 <= n <= 10^5', '-1000 <= nums[i] <= 1000', '-10^7 <= k <= 10^7'],
    expectedTimeComplexity: 'O(n)',
    expectedSpaceComplexity: 'O(n)',
    hints: ['Maintain running `prefixSum`. If `prefixSum - k` exists in the hash map, add its frequency to `count`.', 'Initialize `map[0] = 1` for subarrays starting from index 0.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;
    vector<long long> nums(n);
    for (int i = 0; i < n; ++i) cin >> nums[i];

    unordered_map<long long, int> prefixFreq;
    prefixFreq[0] = 1;
    long long currSum = 0;
    long long count = 0;

    for (int i = 0; i < n; ++i) {
        currSum += nums[i];
        if (prefixFreq.find(currSum - k) != prefixFreq.end()) {
            count += prefixFreq[currSum - k];
        }
        prefixFreq[currSum]++;
    }
    cout << count << endl;
    return 0;
}`,
      python: `import sys
from collections import defaultdict

def main():
    data = sys.stdin.read().split()
    if not data: return
    n, k = int(data[0]), int(data[1])
    nums = [int(x) for x in data[2:n+2]]

    prefix_freq = defaultdict(int)
    prefix_freq[0] = 1
    curr_sum = 0
    count = 0

    for x in nums:
        curr_sum += x
        count += prefix_freq[curr_sum - k]
        prefix_freq[curr_sum] += 1
    print(count)

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const k = parseInt(input[1], 10);
    const nums = input.slice(2, n + 2).map(Number);
    const map = new Map();
    map.set(0, 1);
    let currSum = 0, count = 0;
    for (const x of nums) {
        currSum += x;
        if (map.has(currSum - k)) {
            count += map.get(currSum - k);
        }
        map.set(currSum, (map.get(currSum) || 0) + 1);
    }
    console.log(count);
}`,
    },
    sampleCases: [
      { id: 'hash-4-s1', input: '3 2\n1 1 1', expectedOutput: '2', isSample: true, explanation: '[1, 1] at index 0-1 and index 1-2.' },
      { id: 'hash-4-s2', input: '3 3\n1 2 3', expectedOutput: '2', isSample: true, explanation: '[1, 2] and [3].' },
    ],
    hiddenTestCases: [
      { id: 'hash-4-h1', input: '1 5\n5', expectedOutput: '1', isSample: false },
      { id: 'hash-4-h2', input: '4 0\n1 -1 1 -1', expectedOutput: '4', isSample: false },
      { id: 'hash-4-h3', input: '5 7\n3 4 7 2 -3', expectedOutput: '2', isSample: false },
      { id: 'hash-4-h4', input: '3 10\n1 2 3', expectedOutput: '0', isSample: false },
      { id: 'hash-4-h5', input: '5 5\n2 3 5 -5 5', expectedOutput: '4', isSample: false },
    ],
  },
  {
    id: 'hash-5-group-anagrams',
    title: 'Group Anagrams',
    topic: 'hash-tables',
    difficulty: 'Medium',
    tags: ['Hash Tables', 'Strings', 'Sorting'],
    description: `Given an array of strings \`strs\`, group the anagrams together.
Sort each group in alphabetical order, and sort all groups by the first word of each group.
Print each group on a separate line with words space-separated.`,
    inputFormat: `The first line contains \`n\`.
The second line contains \`n\` space-separated words.`,
    outputFormat: `Print each group of anagrams on a new line.`,
    constraints: ['1 <= n <= 10^4', '1 <= strs[i].length <= 50', 'strs[i] consists of lowercase English letters'],
    expectedTimeComplexity: 'O(n * k log k) where k is word length',
    expectedSpaceComplexity: 'O(n * k)',
    hints: ['Sort each word to create a canonical key: e.g. "eat" -> "aet", "tea" -> "aet".', 'Group words having identical sorted keys in a hash map.'],
    starterCode: {
      cpp: `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int main() {
    int n;
    if (!(cin >> n)) return 0;
    unordered_map<string, vector<string>> groups;
    for (int i = 0; i < n; ++i) {
        string w; cin >> w;
        string key = w;
        sort(key.begin(), key.end());
        groups[key].push_back(w);
    }
    vector<vector<string>> sortedGroups;
    for (auto& p : groups) {
        sort(p.second.begin(), p.second.end());
        sortedGroups.push_back(p.second);
    }
    sort(sortedGroups.begin(), sortedGroups.end(), [](const vector<string>& a, const vector<string>& b) {
        return a[0] < b[0];
    });

    for (const auto& g : sortedGroups) {
        for (int i = 0; i < (int)g.size(); ++i) {
            cout << g[i] << (i + 1 == (int)g.size() ? "" : " ");
        }
        cout << endl;
    }
    return 0;
}`,
      python: `import sys
from collections import defaultdict

def main():
    data = sys.stdin.read().split()
    if not data: return
    n = int(data[0])
    words = data[1:n+1]
    groups = defaultdict(list)
    for w in words:
        key = "".join(sorted(w))
        groups[key].append(w)
    
    res = []
    for g in groups.values():
        res.append(sorted(g))
    res.sort(key=lambda x: x[0])

    for g in res:
        print(*(g))

if __name__ == '__main__':
    main()`,
      javascript: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf-8').trim().split(/\\s+/);
if (input.length > 0 && input[0] !== '') {
    const n = parseInt(input[0], 10);
    const words = input.slice(1, n + 1);
    const groups = new Map();
    for (const w of words) {
        const key = w.split('').sort().join('');
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(w);
    }
    const res = [];
    for (const g of groups.values()) {
        g.sort();
        res.push(g);
    }
    res.sort((a, b) => a[0].localeCompare(b[0]));
    for (const g of res) console.log(g.join(' '));
}`,
    },
    sampleCases: [
      { id: 'hash-5-s1', input: '6\neat tea tan ate nat bat', expectedOutput: 'ate eat tea\nbat\nnat tan', isSample: true, explanation: 'Anagrams grouped together.' },
      { id: 'hash-5-s2', input: '1\na', expectedOutput: 'a', isSample: true, explanation: 'Single element.' },
    ],
    hiddenTestCases: [
      { id: 'hash-5-h1', input: '3\na b c', expectedOutput: 'a\nb\nc', isSample: false },
      { id: 'hash-5-h2', input: '2\nab ba', expectedOutput: 'ab ba', isSample: false },
      { id: 'hash-5-h3', input: '4\nlisten silent elbow below', expectedOutput: 'below elbow\nlisten silent', isSample: false },
      { id: 'hash-5-h4', input: '3\naaa aaa aaa', expectedOutput: 'aaa aaa aaa', isSample: false },
      { id: 'hash-5-h5', input: '4\nrat car tar arc', expectedOutput: 'arc car\nrat tar', isSample: false },
    ],
  },
];
