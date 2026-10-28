import { TopicInfo } from '../types/dsa';

export const TOPICS_DATA: TopicInfo[] = [
  {
    id: 'arrays',
    name: 'Arrays',
    icon: 'Layers',
    tagline: 'Contiguous memory allocation with constant-time indexed access',
    definition: 'An array is a linear data structure that stores a collection of elements of the same data type in contiguous memory locations. Elements are identified by an index or key, allowing O(1) direct random access.',
    realWorldApplications: [
      'Image processing: 2D/3D pixel buffers and bitmap raster representation',
      'CPU Cache lines & memory buffers: High spatial locality for CPU speedups',
      'Lookup tables & mathematical vectors / matrices in graphics engines',
      'Underlying building block for dynamic arrays (std::vector, ArrayList), heaps, and hash tables',
    ],
    timeComplexity: {
      access: 'O(1)',
      search: 'O(n) [Linear] / O(log n) [Binary if sorted]',
      insertion: 'O(n) [O(1) at end if pre-allocated]',
      deletion: 'O(n) [due to shifting elements]',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Access by Index', description: 'Read element directly using base_address + index * element_size', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Insert at Index', description: 'Shift elements to the right from target index to make space', averageTime: 'O(n)', worstTime: 'O(n)' },
      { name: 'Delete at Index', description: 'Remove element and shift following elements to the left to close gap', averageTime: 'O(n)', worstTime: 'O(n)' },
      { name: 'Linear Search', description: 'Scan elements sequentially from index 0 to n-1', averageTime: 'O(n)', worstTime: 'O(n)' },
      { name: 'Binary Search', description: 'Divide sorted array in half repeatedly comparing target to mid', averageTime: 'O(log n)', worstTime: 'O(log n)' },
    ],
    commonMistakes: [
      'Off-by-one errors with 0-indexed bounds (accessing index n instead of n-1)',
      'Forgetting that inserting or deleting from the middle requires shifting O(n) elements',
      'Attempting Binary Search on an unsorted array without sorting first',
      'Integer overflow when computing mid: use mid = low + (high - low) / 2 instead of (low + high) / 2',
    ],
    vivaQuestions: [
      {
        question: 'Why does an array provide O(1) random access time?',
        answer: 'Because elements are stored in contiguous memory locations. The address of any element at index i can be calculated instantaneously in hardware using the formula: Address(A[i]) = Base_Address + (i * Size_of_Element).'
      },
      {
        question: 'What is the key difference between an Array and a Linked List?',
        answer: 'Arrays store elements contiguously with fixed sizes and O(1) access but O(n) insertions/deletions. Linked Lists allocate nodes dynamically in scattered heap memory with pointers, allowing O(1) insertion/deletion once the pointer is reached, but requiring O(n) sequential access.'
      },
      {
        question: 'Why does binary search require a sorted array?',
        answer: 'Binary search relies on the monotonic ordering property to eliminate half of the search space at each comparison. If elements are unsorted, comparing target with the middle element gives no guarantee about which half the element resides in.'
      }
    ],
  },
  {
    id: 'searching',
    name: 'Searching Algorithms',
    icon: 'Search',
    tagline: 'Techniques for locating target records within collections',
    definition: 'Searching algorithms locate a specific key or element within a collection of data. The efficiency depends heavily on whether the data is organized (e.g. sorted) or unsorted.',
    realWorldApplications: [
      'Database indexing: B-Tree and binary index scans for query filtering',
      'Autocomplete and dictionary lookups in text editors and search bars',
      'Router routing tables: Longest prefix matching in network packet switching',
      'Git bisect: Binary searching commit history to isolate regressions',
    ],
    timeComplexity: {
      access: 'N/A',
      search: 'Linear: O(n) | Binary: O(log n)',
      insertion: 'N/A',
      deletion: 'N/A',
      space: 'Linear: O(1) | Binary: O(1) iterative / O(log n) recursive',
    },
    keyOperations: [
      { name: 'Linear Search', description: 'Check each item sequentially until found or end reached', averageTime: 'O(n)', worstTime: 'O(n)' },
      { name: 'Binary Search', description: 'Compare with midpoint, discard irrelevant half', averageTime: 'O(log n)', worstTime: 'O(log n)' },
      { name: 'Lower Bound / First Occurrence', description: 'Binary search variant that finds the leftmost matching index', averageTime: 'O(log n)', worstTime: 'O(log n)' },
    ],
    commonMistakes: [
      'Infinite loops in binary search caused by incorrect while condition (low <= high vs low < high) or pointer update (low = mid instead of mid + 1)',
      'Assuming binary search works on linked lists with O(log n) time: linked lists lack random access, so finding the midpoint takes O(n) time, making it O(n) overall!',
    ],
    vivaQuestions: [
      {
        question: 'Can we apply binary search on a singly linked list efficiently?',
        answer: 'No. While binary search logically halves elements, a singly linked list does not support O(1) random indexing. Finding the middle element requires traversing half the list in O(n) time, yielding total time recurrence T(n) = T(n/2) + O(n) = O(n), no faster than linear search.'
      },
      {
        question: 'What is the recurrence relation for Binary Search and its Master Theorem solution?',
        answer: 'T(n) = T(n/2) + O(1). By Master Theorem (Case 2 with a=1, b=2, c=0), log_b(a) = log_2(1) = 0 = c, so T(n) = Θ(n^0 log n) = Θ(log n).'
      }
    ],
  },
  {
    id: 'sorting',
    name: 'Sorting Lab',
    icon: 'ArrowUpDown',
    tagline: 'Systematic arrangement of records into ascending or descending orders',
    definition: 'Sorting is the process of arranging data in a specified order (numerical, alphabetical, or lexicographical). It forms the bedrock of data processing, searching, and algorithmic optimization.',
    realWorldApplications: [
      'Database query optimization (ORDER BY, MERGE JOIN)',
      'E-commerce product ranking by price, rating, or relevance',
      'Computational geometry, closest pair problems, and convex hull algorithms',
      'Graphics pipelines: Z-buffering and depth sorting for 3D rendering',
    ],
    timeComplexity: {
      access: 'N/A',
      search: 'N/A',
      insertion: 'N/A',
      deletion: 'N/A',
      space: 'Bubble/Select/Insert: O(1) | Merge: O(n) | Quick: O(log n)',
    },
    keyOperations: [
      { name: 'Bubble Sort', description: 'Repeatedly swap adjacent elements if they are in wrong order', averageTime: 'O(n²)', worstTime: 'O(n²)' },
      { name: 'Selection Sort', description: 'Find minimum from unsorted portion and place at beginning', averageTime: 'O(n²)', worstTime: 'O(n²)' },
      { name: 'Insertion Sort', description: 'Build sorted array one item at a time by inserting into position', averageTime: 'O(n²)', worstTime: 'O(n²)' },
      { name: 'Merge Sort', description: 'Divide and conquer: recursively split into halves and merge', averageTime: 'O(n log n)', worstTime: 'O(n log n)' },
      { name: 'Quick Sort', description: 'Partition around pivot so left < pivot < right, then recurse', averageTime: 'O(n log n)', worstTime: 'O(n²)' },
    ],
    commonMistakes: [
      'Believing Quick Sort is always O(n log n): on an already sorted array with the first/last element chosen as pivot, it degrades to O(n²)',
      'Forgetting that Merge Sort requires O(n) auxiliary space for temporary arrays during the merge step',
      'Confusing stability: Selection sort and Quick sort are unstable in their standard implementations',
    ],
    vivaQuestions: [
      {
        question: 'What is a stable sorting algorithm, and why does stability matter?',
        answer: 'A sorting algorithm is stable if it preserves the relative order of duplicate elements with equal keys. This is critical when sorting records on multiple attributes (e.g. sorting students by Name first, then by Grade).'
      },
      {
        question: 'Why is Quick Sort often preferred over Merge Sort in practice despite having O(n²) worst-case time?',
        answer: 'Quick Sort has smaller constant factors, sorts in-place (O(log n) auxiliary stack space vs O(n) auxiliary memory for Merge Sort), and exhibits superior CPU cache locality.'
      }
    ],
  },
  {
    id: 'linked-lists',
    name: 'Linked Lists',
    icon: 'GitCommit',
    tagline: 'Dynamic node chains connected through heap pointers',
    definition: 'A linked list is a linear data structure where elements (nodes) are stored in heap memory and connected by explicit pointers/references rather than contiguous physical addresses.',
    realWorldApplications: [
      'Memory management: Free lists and allocation pools in operating systems',
      'Undo/redo stacks and browser history (Doubly Linked Lists)',
      'Music player playlists with next/prev and looping (Circular Doubly Linked Lists)',
      'Hash table collision chaining (separate chaining)',
    ],
    timeComplexity: {
      access: 'O(n)',
      search: 'O(n)',
      insertion: 'O(1) [at head] / O(n) [at index or tail if no tail pointer]',
      deletion: 'O(1) [at head] / O(n) [at index]',
      space: 'O(n) [plus pointer overhead]',
    },
    keyOperations: [
      { name: 'Insert at Head', description: 'Create node, point new node next to current head, update head pointer', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Insert at Tail', description: 'Traverse to last node, link last node next to new node', averageTime: 'O(n) [O(1) with tail ptr]', worstTime: 'O(n)' },
      { name: 'Delete Value', description: 'Traverse with prev pointer, update prev->next = curr->next, free memory', averageTime: 'O(n)', worstTime: 'O(n)' },
      { name: 'Reverse List', description: 'Iteratively reverse next pointers using prev, curr, next tracking', averageTime: 'O(n)', worstTime: 'O(n)' },
    ],
    commonMistakes: [
      'Memory leaks in C++ by not freeing deleted nodes with delete keyword',
      'Losing list connectivity by overwriting curr->next before saving the reference',
      'Null pointer dereferencing when attempting to access curr->next on an empty list or tail node',
    ],
    vivaQuestions: [
      {
        question: 'What are the advantages and disadvantages of Linked Lists over Arrays?',
        answer: 'Advantages: Dynamic sizing without expensive reallocation or waste; O(1) insertions/deletions at known positions. Disadvantages: O(n) sequential access (no random indexing); extra memory per node for pointers; poor cache locality due to scattered heap allocation.'
      },
      {
        question: 'How do you detect a cycle in a singly linked list?',
        answer: "Using Floyd's Cycle-Finding Algorithm (Tortoise and Hare). Maintain two pointers: slow moves 1 step, fast moves 2 steps. If they ever point to the same node, a cycle exists; if fast reaches NULL, there is no cycle."
      }
    ],
  },
  {
    id: 'stacks',
    name: 'Stacks',
    icon: 'Server',
    tagline: 'Last-In First-Out (LIFO) restricted linear structure',
    definition: 'A stack is a linear collection of elements with restricted access following the Last-In, First-Out (LIFO) principle. All insertions and removals occur at a single designated end called the Top.',
    realWorldApplications: [
      'Call stack: Function execution frames and local variables in runtime environments',
      'Expression parsing: Infix to Postfix conversion and Postfix evaluation',
      'Syntax checking: Balancing parentheses, braces, and HTML/XML tag matching',
      'Browser navigation back button & text editor undo/redo history',
    ],
    timeComplexity: {
      access: 'O(n) [Top is O(1)]',
      search: 'O(n)',
      insertion: 'O(1) [Push]',
      deletion: 'O(1) [Pop]',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Push', description: 'Increment top pointer and insert element at top of stack', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Pop', description: 'Remove and return element currently at top, decrement top pointer', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Peek / Top', description: 'Inspect top element without removing it', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'isEmpty / isFull', description: 'Check if top == -1 (underflow) or top == capacity - 1 (overflow)', averageTime: 'O(1)', worstTime: 'O(1)' },
    ],
    commonMistakes: [
      'Stack Underflow: Attempting to pop or peek from an empty stack (top == -1)',
      'Stack Overflow: Attempting to push to a fixed-capacity array stack when full',
      'Confusing LIFO (Stack) with FIFO (Queue)',
    ],
    vivaQuestions: [
      {
        question: 'What is Stack Overflow and Stack Underflow?',
        answer: 'Stack Overflow occurs when attempting to push onto a full stack (exceeding allocated capacity or recursion limit). Stack Underflow occurs when attempting to pop or peek from an empty stack (top < 0).'
      },
      {
        question: 'How can you evaluate a postfix expression using a stack?',
        answer: 'Scan the postfix expression from left to right. When an operand is encountered, push it onto the stack. When an operator is encountered, pop two operands, apply the operator (op2 operator op1), and push the result back onto the stack. The final stack top is the answer.'
      }
    ],
  },
  {
    id: 'queues',
    name: 'Queues',
    icon: 'ListFilter',
    tagline: 'First-In First-Out (FIFO) sequential processing buffer',
    definition: 'A queue is a linear data structure adhering to the First-In, First-Out (FIFO) principle. Elements are inserted at the Rear (Enqueue) and extracted from the Front (Dequeue).',
    realWorldApplications: [
      'CPU Scheduling: Round Robin scheduler ready queues in operating systems',
      'Printer spooling: Print jobs serviced in order of submission',
      'Breadth-First Search (BFS) graph traversal frontier management',
      'Asynchronous task processing: Message queues like RabbitMQ, Kafka, and Redis pub/sub',
    ],
    timeComplexity: {
      access: 'O(n) [Front is O(1)]',
      search: 'O(n)',
      insertion: 'O(1) [Enqueue]',
      deletion: 'O(1) [Dequeue]',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Enqueue', description: 'Add element to rear of queue and advance rear pointer', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Dequeue', description: 'Remove and return front element and advance front pointer', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Front / Peek', description: 'Return front element without removing it', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Circular Queue Wrap', description: 'Use modulo arithmetic: rear = (rear + 1) % capacity to reuse vacated slots', averageTime: 'O(1)', worstTime: 'O(1)' },
    ],
    commonMistakes: [
      'Linear array queue false overflow: front advances, leaving empty slots at front that cannot be reused without a circular queue wrap',
      'Off-by-one in circular queue full condition: (rear + 1) % capacity == front',
    ],
    vivaQuestions: [
      {
        question: 'Why do we need a Circular Queue over a simple Linear Queue array?',
        answer: 'In a linear array queue, as elements are dequeued, front moves forward. Even if empty slots exist at the beginning, rear reaches capacity and cannot insert further (false overflow). A circular queue connects rear back to front using modulo arithmetic (rear = (rear + 1) % N), utilizing all slots efficiently.'
      },
      {
        question: 'How can you implement a Queue using two Stacks?',
        answer: 'Maintain Stack1 (input) and Stack2 (output). For Enqueue: push onto Stack1. For Dequeue: if Stack2 is empty, pop all elements from Stack1 and push them into Stack2 (reversing order into FIFO), then pop from Stack2. Dequeue runs in amortized O(1) time.'
      }
    ],
  },
  {
    id: 'trees',
    name: 'Binary Search Trees',
    icon: 'Network',
    tagline: 'Hierarchical node structure with sorted partition properties',
    definition: 'A Binary Search Tree (BST) is a hierarchical node-based tree data structure where each node has at most two children. For every node X, all keys in its left subtree are strictly smaller than X.key, and all keys in its right subtree are strictly greater than X.key.',
    realWorldApplications: [
      'Database indexing (B-Trees and AVL/Red-Black trees derived from BST)',
      'Syntax trees in compilers and arithmetic expression evaluation',
      'File system directory hierarchies',
      'Priority routing and self-balancing sets/maps (std::map, TreeMap)',
    ],
    timeComplexity: {
      access: 'O(log n) avg / O(n) worst',
      search: 'O(log n) avg / O(n) worst',
      insertion: 'O(log n) avg / O(n) worst',
      deletion: 'O(log n) avg / O(n) worst',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Search', description: 'Compare with current node; recurse left if target < key, else recurse right', averageTime: 'O(log n)', worstTime: 'O(n)' },
      { name: 'Insert', description: 'Traverse down until reaching an appropriate NULL leaf position and attach node', averageTime: 'O(log n)', worstTime: 'O(n)' },
      { name: 'Delete Node', description: 'Handles 3 cases: leaf node (direct delete), 1 child (bypass node), 2 children (replace with inorder successor)', averageTime: 'O(log n)', worstTime: 'O(n)' },
      { name: 'Inorder Traversal', description: 'Left -> Root -> Right: visits elements in strictly sorted ascending order', averageTime: 'O(n)', worstTime: 'O(n)' },
    ],
    commonMistakes: [
      'Assuming BST operations are always O(log n): inserting sorted data (1, 2, 3, 4, 5) creates a degenerate skewed tree resembling a linked list with O(n) search time!',
      'In 2-child deletion, forgetting to delete the inorder successor from its original subtree after copying its value',
    ],
    vivaQuestions: [
      {
        question: 'What is the Inorder Traversal of a Binary Search Tree and what special property does it have?',
        answer: 'Inorder traversal visits nodes in the order Left Subtree -> Current Root -> Right Subtree. In any valid Binary Search Tree, an Inorder traversal always yields the keys in sorted, non-decreasing order.'
      },
      {
        question: 'How do you delete a node with two children in a BST?',
        answer: 'Find the node’s inorder successor (the smallest node in its right subtree) or inorder predecessor (largest in left subtree). Copy that successor’s value into the target node, then recursively delete the successor from the subtree (which has at most one child).'
      }
    ],
  },
  {
    id: 'heaps',
    name: 'Heaps & Priority Queues',
    icon: 'Boxes',
    tagline: 'Complete binary tree maintaining parent-child dominance',
    definition: 'A Heap is a specialized complete binary tree that satisfies the Heap Property. In a Max-Heap, every parent node is greater than or equal to its children. In a Min-Heap, every parent is less than or equal to its children. It is efficiently implemented using a flat 1D array.',
    realWorldApplications: [
      'Priority Queues in OS task schedulers and interrupt handlers',
      "Dijkstra's shortest path and Prim's minimum spanning tree algorithms",
      'Heap Sort algorithm: In-place O(n log n) sorting guarantee',
      'K-way merging and finding top K elements in streaming big data',
    ],
    timeComplexity: {
      access: 'O(1) [Root peek]',
      search: 'O(n)',
      insertion: 'O(log n) [Heapify Up]',
      deletion: 'O(log n) [Extract Root & Heapify Down]',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Array Indexing Formula', description: 'Parent = (i-1)/2, LeftChild = 2*i + 1, RightChild = 2*i + 2 (0-indexed)', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Insert (Push)', description: 'Append at array end, then bubble up (heapify-up) while parent violates heap property', averageTime: 'O(log n)', worstTime: 'O(log n)' },
      { name: 'Extract Root (Pop)', description: 'Swap root with last element, pop last element, sink root down (heapify-down)', averageTime: 'O(log n)', worstTime: 'O(log n)' },
      { name: 'Build Heap', description: 'Bottom-up heapify starting from last non-leaf node (n/2 - 1) down to 0', averageTime: 'O(n)', worstTime: 'O(n)' },
    ],
    commonMistakes: [
      'Believing Build Heap takes O(n log n): bottom-up heapification mathematically sums to O(n) because lower levels have vastly more nodes but smaller heights!',
      'Confusing a Heap with a BST: a Heap does not enforce left child < right child, only parent vs children',
    ],
    vivaQuestions: [
      {
        question: 'Why is a heap stored in an array instead of node pointers?',
        answer: 'Because a heap is always a complete binary tree, there are no missing nodes except on the last level filled left-to-right. Therefore, parent and child positions can be computed instantly via arithmetic indices: Parent=(i-1)/2, Left=2i+1, Right=2i+2, saving pointer memory and maximizing cache locality.'
      },
      {
        question: 'What is the time complexity to build a binary heap from an unsorted array of n elements?',
        answer: 'O(n). Although each heapify-down can take O(log n), the majority of nodes are near the bottom of the tree with height 0 or 1. Summing (n / 2^(h+1)) * O(h) over all heights converges to O(n).'
      }
    ],
  },
  {
    id: 'graphs',
    name: 'Graphs',
    icon: 'Share2',
    tagline: 'Non-linear network of vertices connected by directional or weighted edges',
    definition: 'A graph G = (V, E) is a non-linear data structure consisting of a set of vertices (nodes) V and a set of edges E connecting pairs of vertices. Graphs model complex networks and can be directed/undirected, cyclic/acyclic, or weighted/unweighted.',
    realWorldApplications: [
      'Social networks: Friend graphs, follower networks, recommendation feeds',
      'Navigation & GPS mapping: Road junctions as vertices, travel times as edge weights',
      'Web crawlers and Google PageRank: Hyperlink reference graph traversal',
      'Dependency resolution: Package managers (npm, pip) and build systems (DAGs)',
    ],
    timeComplexity: {
      access: 'O(V + E) traversal',
      search: 'O(V + E) [BFS / DFS]',
      insertion: 'O(1) [Add vertex/edge in Adj List]',
      deletion: 'O(V + E) [Remove vertex and its edges]',
      space: 'Adj List: O(V + E) | Adj Matrix: O(V²)',
    },
    keyOperations: [
      { name: 'Breadth-First Search (BFS)', description: 'Level-order exploration using a FIFO queue; finds shortest path in unweighted graphs', averageTime: 'O(V + E)', worstTime: 'O(V + E)' },
      { name: 'Depth-First Search (DFS)', description: 'Branch-deep exploration using a recursion stack; detects cycles and topological ordering', averageTime: 'O(V + E)', worstTime: 'O(V + E)' },
      { name: 'Cycle Detection', description: 'DFS back-edge detection in directed/undirected graphs', averageTime: 'O(V + E)', worstTime: 'O(V + E)' },
      { name: 'Connected Components', description: 'Count distinct subgraphs by running DFS/BFS from unvisited vertices', averageTime: 'O(V + E)', worstTime: 'O(V + E)' },
    ],
    commonMistakes: [
      'Forgetting to track visited vertices in cyclic graphs, leading to infinite loops and stack overflow',
      'Using an Adjacency Matrix for sparse graphs, wasting O(V²) memory when O(V+E) is sufficient',
      'Assuming DFS finds the shortest path: only BFS guarantees the shortest path in unweighted graphs',
    ],
    vivaQuestions: [
      {
        question: 'When should you use an Adjacency List versus an Adjacency Matrix?',
        answer: 'Use an Adjacency List for sparse graphs (E << V²), as it consumes O(V + E) space and allows O(deg(u)) neighbor iteration. Use an Adjacency Matrix for dense graphs (E ≈ V²) or when instant O(1) edge-existence lookup between any two vertices is required.'
      },
      {
        question: 'Why does BFS find the shortest path in an unweighted graph while DFS does not?',
        answer: 'BFS explores the graph radially level by level, visiting all vertices at distance k before any vertex at distance k+1. Thus, the first time a target vertex is reached, the path taken must have the minimum number of edges.'
      }
    ],
  },
  {
    id: 'hash-tables',
    name: 'Hash Tables',
    icon: 'Hash',
    tagline: 'Key-value mapping providing average constant-time lookups',
    definition: 'A Hash Table (Hash Map) is a data structure that maps keys to values using a mathematical Hash Function to compute an integer bucket index. It provides average O(1) performance for insert, search, and delete operations.',
    realWorldApplications: [
      'Database indexing and primary key hash indexes',
      'Symbol tables in compilers and interpreters for identifier resolution',
      'In-memory caches (Redis, Memcached) for instant session and object retrieval',
      'Duplicate detection and set operations (HashSet / Unordered Map)',
    ],
    timeComplexity: {
      access: 'N/A',
      search: 'O(1) average / O(n) worst',
      insertion: 'O(1) average / O(n) worst',
      deletion: 'O(1) average / O(n) worst',
      space: 'O(n)',
    },
    keyOperations: [
      { name: 'Hash Function', description: 'Converts arbitrary key to integer: index = hash(key) % table_size', averageTime: 'O(1)', worstTime: 'O(1)' },
      { name: 'Separate Chaining', description: 'Each bucket holds a linked list of entries that collided on that index', averageTime: 'O(1)', worstTime: 'O(n)' },
      { name: 'Linear Probing (Open Addressing)', description: 'If collision occurs, probe consecutively: (index + 1) % size until empty slot', averageTime: 'O(1)', worstTime: 'O(n)' },
      { name: 'Rehashing / Load Factor', description: 'When load factor α = n/m exceeds threshold (~0.75), double table and rehash', averageTime: 'Amortized O(1)', worstTime: 'O(n)' },
    ],
    commonMistakes: [
      'Deleting in linear probing by simply clearing the cell to null, which breaks subsequent search chains! Must use a tombstone marker (DELETED)',
      'Using a poor hash function that clusters keys into a few buckets, degrading O(1) performance to O(n)',
    ],
    vivaQuestions: [
      {
        question: 'What is a Hash Collision and what are the two main collision resolution techniques?',
        answer: 'A collision occurs when two distinct keys yield the same bucket index via the hash function (hash(k1) == hash(k2)). The two main methods are: 1) Separate Chaining (storing collided elements in a linked list or tree at that bucket), and 2) Open Addressing (probing for the next open slot via Linear Probing, Quadratic Probing, or Double Hashing).'
      },
      {
        question: 'What is the Load Factor of a hash table and why is it important?',
        answer: 'Load Factor α = n / m, where n is the number of stored keys and m is table capacity. As α increases, collision probability spikes, degrading operations from O(1) toward O(n). When α exceeds a threshold (typically 0.7 to 0.75), the table rehashes into a larger capacity.'
      }
    ],
  },
];
