import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Arrays
  {
    id: 'qz-arr-1',
    topic: 'arrays',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What is the time complexity to access an element at index i in an array of size n?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(i)'],
    correctOptionIndex: 0,
    answerExplanation: 'Arrays provide O(1) random access because addresses are computed contiguously via: Base_Address + (index * Element_Size).',
  },
  {
    id: 'qz-arr-2',
    topic: 'arrays',
    type: 'dry-run',
    difficulty: 'Medium',
    question: 'What will be the content of array arr after executing the following code snippet?',
    codeSnippet: `int arr[5] = {10, 20, 30, 40, 50};
for (int i = 0; i < 4; i++) {
    arr[i] = arr[i + 1];
}`,
    options: [
      '{20, 30, 40, 50, 50}',
      '{20, 30, 40, 50, 0}',
      '{50, 40, 30, 20, 10}',
      '{10, 20, 30, 40, 50}',
    ],
    correctOptionIndex: 0,
    answerExplanation: 'Each index 0..3 takes the value of the next element. arr[0]=20, arr[1]=30, arr[2]=40, arr[3]=50, and arr[4] remains 50.',
  },
  {
    id: 'qz-arr-3',
    topic: 'arrays',
    type: 'viva',
    difficulty: 'Medium',
    question: 'Why does an array insertion at the middle have worst-case O(n) complexity?',
    vivaAnswer: 'Because elements are stored contiguously in memory with no empty gaps. To insert an element at index k, all elements from index k to n-1 must be shifted one position to the right to make space, taking O(n) operations in the worst or average case.',
    answerExplanation: 'Contiguous storage requires shifting elements to open up space.',
  },

  // Searching
  {
    id: 'qz-srch-1',
    topic: 'searching',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What is the maximum number of comparisons required to search for an element in a sorted array of 1024 elements using Binary Search?',
    options: ['10', '11', '512', '1024'],
    correctOptionIndex: 1,
    answerExplanation: 'For n = 1024, ceil(log2(1024)) + 1 = 10 + 1 = 11 comparisons in the worst case (or log2(1024) = 10 depending on exact search bound check; at most 11 checks are performed).',
  },
  {
    id: 'qz-srch-2',
    topic: 'searching',
    type: 'dry-run',
    difficulty: 'Medium',
    question: 'How many iterations of the while loop will run when searching for target = 23 in array [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]?',
    codeSnippet: `int low = 0, high = 9;
while (low <= high) {
    int mid = (low + high) / 2;
    // ... comparisons
}`,
    options: ['2 iterations', '3 iterations', '4 iterations', '1 iteration'],
    correctOptionIndex: 1,
    answerExplanation: 'Pass 1: low=0, high=9 -> mid=4 (val=16 < 23 -> low=5). Pass 2: low=5, high=9 -> mid=7 (val=56 > 23 -> high=6). Pass 3: low=5, high=6 -> mid=5 (val=23 == 23 -> found!). Total = 3 iterations.',
  },
  {
    id: 'qz-srch-3',
    topic: 'searching',
    type: 'viva',
    difficulty: 'Easy',
    question: 'Why does Binary Search require the array to be sorted beforehand?',
    vivaAnswer: 'Binary search works by discarding half of the remaining search space after a single comparison with the middle element. If elements are unsorted, comparing target with the middle element provides no guarantee of whether the target lies in the left or right sub-array.',
    answerExplanation: 'Monotonic order is the mathematical requirement to discard half the search space.',
  },

  // Sorting
  {
    id: 'qz-sort-1',
    topic: 'sorting',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'Which of the following sorting algorithms has guaranteed O(n log n) time complexity in all cases (best, average, and worst)?',
    options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Insertion Sort'],
    correctOptionIndex: 0,
    answerExplanation: 'Merge Sort always divides array into two equal halves (T(n) = 2T(n/2) + O(n)), resulting in guaranteed Θ(n log n) in all cases.',
  },
  {
    id: 'qz-sort-2',
    topic: 'sorting',
    type: 'viva',
    difficulty: 'Medium',
    question: 'What is stability in sorting algorithms, and which algorithms are stable?',
    vivaAnswer: 'A sorting algorithm is stable if two elements with equal values appear in the same relative order in the sorted output as they were in the original input. Bubble Sort, Insertion Sort, and Merge Sort are stable. Selection Sort, Heap Sort, and standard Quick Sort are unstable.',
    answerExplanation: 'Preservation of relative order for identical keys is called stability.',
  },
  {
    id: 'qz-sort-3',
    topic: 'sorting',
    type: 'dry-run',
    difficulty: 'Medium',
    question: 'In Bubble Sort, what is the array state after the FIRST complete pass on input [5, 1, 4, 2, 8]?',
    codeSnippet: `// Bubble sort pass 1:
// compare and swap adjacent elements`,
    options: [
      '[1, 4, 2, 5, 8]',
      '[1, 2, 4, 5, 8]',
      '[5, 1, 2, 4, 8]',
      '[4, 1, 2, 5, 8]',
    ],
    correctOptionIndex: 0,
    answerExplanation: 'Pairs: (5,1)->[1,5,4,2,8], (5,4)->[1,4,5,2,8], (5,2)->[1,4,2,5,8], (5,8)->no swap. Result: [1, 4, 2, 5, 8].',
  },

  // Linked Lists
  {
    id: 'qz-ll-1',
    topic: 'linked-lists',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What is the time complexity to insert a new node at the beginning of a singly linked list with head pointer?',
    options: ['O(1)', 'O(n)', 'O(log n)', 'O(n^2)'],
    correctOptionIndex: 0,
    answerExplanation: 'Inserting at head only requires allocating the node, setting newNode->next = head, and head = newNode, which takes constant O(1) time.',
  },
  {
    id: 'qz-ll-2',
    topic: 'linked-lists',
    type: 'dry-run',
    difficulty: 'Hard',
    question: 'What does the following function return for a linked list with values 1 -> 2 -> 3 -> 4 -> 5 -> NULL?',
    codeSnippet: `Node* mystery(Node* head) {
    Node* slow = head;
    Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}`,
    options: [
      'Node with value 3 (the middle node)',
      'Node with value 5 (the last node)',
      'Node with value 1 (the head node)',
      'Node with value 4',
    ],
    correctOptionIndex: 0,
    answerExplanation: 'This is the Tortoise and Hare algorithm to find the middle node of a linked list. Fast travels at twice the speed of slow, so when fast reaches the end, slow is at the middle (node 3).',
  },
  {
    id: 'qz-ll-3',
    topic: 'linked-lists',
    type: 'viva',
    difficulty: 'Medium',
    question: 'How do you detect if a singly linked list contains a cycle without extra memory?',
    vivaAnswer: "Use Floyd's Cycle-Finding Algorithm (Two Pointers). Initialize slow and fast pointers to head. Advance slow by 1 step and fast by 2 steps. If there is a cycle, fast will eventually lap and meet slow (fast == slow). If fast or fast->next reaches NULL, there is no cycle. Space complexity is O(1).",
    answerExplanation: 'Floyd’s Tortoise and Hare algorithm achieves O(1) auxiliary space cycle detection.',
  },

  // Stacks
  {
    id: 'qz-stk-1',
    topic: 'stacks',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'Which of the following data structure properties describes a Stack?',
    options: ['LIFO (Last-In First-Out)', 'FIFO (First-In First-Out)', 'LILO (Last-In Last-Out)', 'Random Access'],
    correctOptionIndex: 0,
    answerExplanation: 'A stack is strictly Last-In First-Out (LIFO). Elements are pushed and popped from the same end (the Top).',
  },
  {
    id: 'qz-stk-2',
    topic: 'stacks',
    type: 'dry-run',
    difficulty: 'Medium',
    question: 'Evaluate the postfix expression: 6 3 2 + * 5 -',
    codeSnippet: `// Postfix evaluation using stack
// Scan tokens left-to-right`,
    options: ['25', '30', '15', '20'],
    correctOptionIndex: 0,
    answerExplanation: 'Push 6, push 3, push 2. Encounter "+": pop 2 & 3, push (3+2)=5. Stack has [6, 5]. Encounter "*": pop 5 & 6, push (6*5)=30. Stack has [30]. Push 5. Encounter "-": pop 5 & 30, push (30-5)=25.',
  },
  {
    id: 'qz-stk-3',
    topic: 'stacks',
    type: 'viva',
    difficulty: 'Easy',
    question: 'What causes Stack Overflow in recursive functions?',
    vivaAnswer: 'Each function call allocates an activation frame (stack frame) on the call stack to store return addresses, parameters, and local variables. If recursion does not have a proper base condition or recurses too deeply, memory allocated for the call stack is exhausted, triggering a Stack Overflow error.',
    answerExplanation: 'Exceeding the maximum allocated thread call stack memory due to unbounded recursion.',
  },

  // Queues
  {
    id: 'qz-qu-1',
    topic: 'queues',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'In a circular queue of capacity N implemented using an array, how is the rear pointer updated after enqueuing an element?',
    options: [
      'rear = (rear + 1) % N',
      'rear = rear + 1',
      'rear = (rear - 1) % N',
      'rear = (front + rear) % N',
    ],
    correctOptionIndex: 0,
    answerExplanation: 'Modulo arithmetic `rear = (rear + 1) % N` allows the pointer to wrap around from index N-1 back to index 0.',
  },
  {
    id: 'qz-qu-2',
    topic: 'queues',
    type: 'viva',
    difficulty: 'Medium',
    question: 'What is the "false overflow" problem in a simple linear array queue, and how does a circular queue fix it?',
    vivaAnswer: 'In a linear queue, elements are dequeued from the front, moving front forward. Even if empty slots become available at indices 0..front-1, rear may reach capacity N-1 and report queue overflow. A circular queue fixes this by using modulo arithmetic to wrap rear and front around, reusing vacated memory.',
    answerExplanation: 'Circular wrapping reclaims freed space at the front of the array.',
  },

  // BST
  {
    id: 'qz-bst-1',
    topic: 'trees',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What type of tree traversal on a valid Binary Search Tree visits keys in strictly non-decreasing sorted order?',
    options: ['Inorder Traversal', 'Preorder Traversal', 'Postorder Traversal', 'Level-order Traversal'],
    correctOptionIndex: 0,
    answerExplanation: 'Inorder traversal visits Left -> Root -> Right. Since in a BST Left < Root < Right, this produces strictly sorted order.',
  },
  {
    id: 'qz-bst-2',
    topic: 'trees',
    type: 'dry-run',
    difficulty: 'Medium',
    question: 'What is the preorder traversal of a BST formed by inserting keys: 50, 30, 70, 20, 40, 60, 80 in order?',
    codeSnippet: `// Preorder: Root -> Left -> Right`,
    options: [
      '50, 30, 20, 40, 70, 60, 80',
      '20, 30, 40, 50, 60, 70, 80',
      '20, 40, 30, 60, 80, 70, 50',
      '50, 70, 80, 60, 30, 40, 20',
    ],
    correctOptionIndex: 0,
    answerExplanation: 'Root is 50. Left subtree has root 30 (left 20, right 40). Right subtree has root 70 (left 60, right 80). Preorder: 50, 30, 20, 40, 70, 60, 80.',
  },
  {
    id: 'qz-bst-3',
    topic: 'trees',
    type: 'viva',
    difficulty: 'Hard',
    question: 'What is the worst-case time complexity of BST operations, and when does it occur?',
    vivaAnswer: 'Worst-case time complexity is O(n). It occurs when elements are inserted in already sorted (ascending or descending) order. The tree degenerates into a skewed tree resembling a linked list with height h = n, losing the O(log n) balanced search property.',
    answerExplanation: 'Skewed trees created from sorted inputs degrade BST performance to O(n).',
  },

  // Heaps
  {
    id: 'qz-hp-1',
    topic: 'heaps',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'In a 0-indexed binary heap array, what is the index of the parent of node i?',
    options: ['(i - 1) / 2', 'i / 2', '2 * i', '2 * i + 1'],
    correctOptionIndex: 0,
    answerExplanation: 'For 0-indexed heaps, parent is at (i - 1) / 2 (integer division). Children are at 2*i + 1 and 2*i + 2.',
  },
  {
    id: 'qz-hp-2',
    topic: 'heaps',
    type: 'viva',
    difficulty: 'Medium',
    question: 'Why does bottom-up buildHeap take O(n) time rather than O(n log n)?',
    vivaAnswer: 'Because most nodes in a binary heap reside near the bottom: n/2 nodes are leaves at height 0 (requiring 0 operations), n/4 nodes are at height 1, and only 1 root is at height log n. Summing (n / 2^(h+1)) * O(h) over all heights forms an arithmetico-geometric series that mathematically converges to O(n).',
    answerExplanation: 'The vast majority of nodes are at smaller heights, bounding total work to linear time.',
  },

  // Graphs
  {
    id: 'qz-gr-1',
    topic: 'graphs',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'Which graph traversal algorithm uses a FIFO Queue to explore vertices layer by layer?',
    options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Dijkstra Algorithm', 'Topological Sort'],
    correctOptionIndex: 0,
    answerExplanation: 'BFS uses a FIFO queue to visit all vertices at distance k before any vertex at distance k+1.',
  },
  {
    id: 'qz-gr-2',
    topic: 'graphs',
    type: 'viva',
    difficulty: 'Medium',
    question: 'How do you detect a cycle in a directed graph using DFS?',
    vivaAnswer: 'Use a 3-color state system (e.g. Unvisited=0, Visiting=1, Visited=2) or maintain a recursionStack array alongside the visited array. If DFS encounters an adjacent vertex currently present in the active recursionStack (marked Visiting), a back-edge exists, confirming a directed cycle.',
    answerExplanation: 'Back-edges targeting vertices currently in the active recursion stack indicate cycles in directed graphs.',
  },

  // Hash Tables
  {
    id: 'qz-hash-1',
    topic: 'hash-tables',
    type: 'mcq',
    difficulty: 'Easy',
    question: 'What is the load factor α of a hash table storing n keys across m buckets?',
    options: ['α = n / m', 'α = m / n', 'α = n * m', 'α = log(n / m)'],
    correctOptionIndex: 0,
    answerExplanation: 'Load factor is defined as α = n / m (ratio of stored keys to total table capacity). High load factors increase collision rates.',
  },
  {
    id: 'qz-hash-2',
    topic: 'hash-tables',
    type: 'viva',
    difficulty: 'Hard',
    question: 'Why must we use a "Tombstone / DELETED" marker when deleting a key from a hash table with Linear Probing?',
    vivaAnswer: 'If we simply empty the cell (setting it to NULL), subsequent search operations for other keys that previously collided and probed past this cell will encounter the empty slot and prematurely stop searching, concluding that their key is not present. A tombstone marker signifies: "this cell was deleted; keep probing during search, but you may overwrite it during insertion."',
    answerExplanation: 'Tombstones prevent breaking probe search chains in open-addressing hash tables.',
  },
];
