# DSA VISION — Interactive Data Structures & Algorithms Learning Lab
> A Modern, Interactive Educational Platform for College Fundamentals of Data Structures (FDS)

![DSA VISION Banner](https://img.shields.io/badge/DSA-VISION-06b6d4?style=for-the-badge&logo=codeforces&logoColor=white)
![React 18](https://img.shields.io/badge/React-18.x-61dafb?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.x-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-VS_Code_Core-007acc?style=for-the-badge&logo=visualstudiocode&logoColor=white)

---

## 🌟 Overview

**DSA VISION** is a comprehensive, client-side educational platform engineered specifically for computer science engineering students tackling **Fundamentals of Data Structures (FDS)**.

Instead of static diagrams or isolated code playgrounds, **DSA VISION** unifies:
1. **Interactive, bidirectional visualizers** for 8 core data structures with step-by-step playback and pseudocode tracking.
2. **Sorting Lab** with side-by-side multi-algorithm comparison and real high-precision browser timing (`performance.now()`).
3. **Coding Practice Arena** with 50 original problems across all 10 topics, C++17 primary language support, Python 3, and JavaScript, evaluated against visible sample cases and hidden edge-case suites.
4. **Quizzes & Viva Voce Lab** with conceptual MCQs, C++ dry-run loop tracing, and oral viva exam questions with revealable model answers.
5. **Complexity Lab** with dynamic Big-O curves ($O(1)$ to $O(2^N)$), an interactive $N$ scale slider, and Master Theorem cheat-sheets.
6. **Progress Tracker & Dashboard** derived from persistent `localStorage` with daily streaks and milestone achievement badges.

---

## 🚀 Key Features

### 1. 🧩 Interactive Data Structure Visualizers
- **Arrays**: Memory address calculation ($\text{Addr}(A[i]) = \text{Base} + i \times \text{Size}$), Insert, Delete with shifting, Linear Search & Binary Search with pointer highlights.
- **Linked Lists**: Singly, Doubly, and Circular Linked Lists with interactive insertion, deletion, searching, and pointer traversal.
- **Stacks**: Fixed-capacity LIFO visualizer with overflow and underflow detection.
- **Queues**: Linear Queue and Circular Queue with modulo arithmetic ($(R + 1) \% N$) and front/rear pointer visualization.
- **Binary Search Trees (BST)**: Insert, Search, Traversals (Inorder, Preorder, Postorder), and complete deletion visualization covering all 3 cases (leaf, one child, two children with inorder successor).
- **Heaps**: Dual-representation Min-Heap & Max-Heap displaying simultaneous 1D array indices and complete binary tree SVG layouts.
- **Graphs**: Directed and Undirected graphs, Adjacency List display, and step-by-step Breadth-First Search (Queue) and Depth-First Search (Stack/Recursion).
- **Hash Tables**: Hash calculation ($h(k) = k \pmod M$), Separate Chaining, and Linear Probing with `DELETED` tombstones, accompanied by live load factor ($\alpha$) calculations.

### 2. ⚡ Sorting Lab & Benchmark Engine
- **Supported Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, and Quick Sort.
- **Interactive Step Visualizer**: Compares, swaps, and sorted boundary highlights with active counters.
- **Multi-Sort Comparison Mode**: Clones an identical array of 500 random elements across all 5 algorithms and captures real execution time via `performance.now()` for comparative charts and tables.

### 3. 💻 Coding Practice (LeetCode-Style Split Screen)
- **Monaco Code Editor**: Professional VS Code engine with syntax highlighting, line numbers, and indentation.
- **Languages Supported**: C++17 (GCC), Python 3.10, and JavaScript (Node.js).
- **Dual Execution Engine**: Online execution via the Piston compiler API with an automatic safe client-side JavaScript sandbox fallback for offline use.
- **50 Original Problems**: 5 questions across all 10 core topics with 2 visible sample test cases and 5 hidden validation test cases each.
- **Feedback & Rewards**: Test pass indicators, execution timers, runtime errors, and confetti on full-suite passes.

### 4. 🎓 Viva Voce & Quiz Engine
- **Conceptual MCQs**: Topic-wise multiple-choice questions with instant score tracking and answer explanations.
- **Code Dry-Run Tracing**: Step through tricky C++ pointer and loop problems to deduce outputs.
- **Oral Viva Questions**: Standard college examination viva questions with model answers.

### 5. 📈 Complexity Lab & Progress Tracker
- **Big-O Growth Plot**: Interactive SVG curve graph for $O(1)$, $O(\log N)$, $O(N)$, $O(N \log N)$, $O(N^2)$, and $O(2^N)$.
- **$N$-Scale Slider**: Interactive operations counter from $N = 1$ to $N = 100,000$.
- **Master Theorem Guide**: Reference cards for divide-and-conquer recurrence relations.
- **Real Progress Tracking**: Solved count by difficulty (Easy, Medium, Hard), topic mastery bars, daily streaks, and unlockable achievement badges.

---

## 🛠️ Tech Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS 3.4 (Dark navy/charcoal theme `#070b14` with `#06b6d4` cyan accents)
- **Code Editor**: `@monaco-editor/react`
- **Visuals & Icons**: Lucide React, Hand-crafted dynamic SVG graphics
- **Effects**: `canvas-confetti`
- **Persistence**: Browser `localStorage`

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/kotkarchetana200726/DSA-VISION.git

# Navigate to the project directory
cd DSA-VISION

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build
```bash
# Build optimized production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📂 Project Directory Structure

```
├── public/                 # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── about/          # Syllabus mapping & project info
│   │   ├── coding/         # Monaco editor & practice arena
│   │   ├── common/         # Persistent sidebar & responsive header
│   │   ├── complexity/     # Big-O SVG curves & N slider
│   │   ├── dashboard/      # Dynamic stats, daily challenge, quick launch
│   │   ├── learn/          # In-depth theory for all 10 topics
│   │   ├── progress/       # Badges, difficulty meters, streaks
│   │   ├── quiz/           # MCQs, dry runs, oral viva Q&As
│   │   ├── sorting/        # Sorting step visualizer & multi-sort benchmark
│   │   └── visualizer/     # 8 interactive data structure visualizers
│   ├── data/               # Topics theory, 50 coding problems, quizzes
│   ├── services/           # Code execution engine & LocalStorage manager
│   ├── types/              # Full TypeScript type definitions
│   ├── App.tsx             # Main application shell & router
│   ├── index.css           # Custom scrollbars & Tailwind layers
│   └── main.tsx            # React root mount
├── index.html              # HTML shell & Google Fonts (Inter, JetBrains Mono, Outfit)
├── tailwind.config.js      # Custom dark theme & colors
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build config
```

---

## 📜 College Course Alignment

This project is tailored for the **Fundamentals of Data Structures (FDS)** curriculum prescribed in Computer Science & Engineering degree courses (SPPU, Mumbai University, VTU, AKTU, and autonomous universities):
- **Unit I**: Arrays, Searching (Linear, Binary), and Sorting (Bubble, Insertion, Selection, Merge, Quick).
- **Unit II**: Singly, Doubly, and Circular Linked Lists.
- **Unit III**: Stacks (Applications, Infix/Postfix, Parentheses) and Queues (Circular Queue, Deque).
- **Unit IV**: Trees, Binary Search Trees (BST Deletion cases, Traversals).
- **Unit V**: Graphs (Adjacency Matrix/List, BFS, DFS, Minimum Spanning Trees).
- **Unit VI**: Heaps (Min/Max Heap, Heap Sort) and Hash Tables (Chaining, Linear Probing).

---

## 👩‍💻 Author & Acknowledgements

Created with ❤️ for college FDS practicals, viva defense, and hands-on algorithms learning.
Contributions and suggestions are warmly welcomed!
