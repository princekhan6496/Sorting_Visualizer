# 🔷 Sorting Visualizer (React + TypeScript + Vite + Tailwind)

This is an interactive **Sorting Algorithm Visualizer** built using  
**React + TypeScript + Vite + TailwindCSS**.

It demonstrates how popular sorting algorithms work internally through  
animations, bar swapping, real-time transitions, and performance metrics.

---

## 📁 Project Structure

```
Sorting_Visualizer/
│── node_modules/
│── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   └── vite-env.d.ts
│
│── index.html
│── script.js
│── styles.css
│── package.json
│── tailwind.config.js
│── postcss.config.js
│── tsconfig.json
│── tsconfig.node.json
│── tsconfig.app.json
│── vite.config.ts
│── README.md
```

---

## 🚀 Features

### 🎨 **Interactive UI**
- Change array size  
- Change speed  
- Generate new array  
- Select any algorithm  

### 📊 **Algorithms Included**
- Bubble Sort  
- Selection Sort  
- Insertion Sort  
- Merge Sort  
- Quick Sort  
- **Hybrid Merge–Insertion Sort**

### 🎥 **Real-Time Visualizations**
- Bar animations  
- Highlighting comparison bars  
- Smooth transitions using requestAnimationFrame  
- Adjustable speed slider  

### 📈 **Performance Stats**
- Execution time 
---

## 🧠 Hybrid Merge–Insertion Sort

A custom optimization of classical Merge Sort:

- Uses Merge Sort for larger subarrays  
- Switches to Insertion Sort when subarray size < **k**  
- Typical optimal cutoff: **k = 32**  
- Reduces recursion depth & improves cache locality  

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React + TypeScript** | Component structure & UI logic |
| **Vite** | Fast bundler & dev server |
| **TailwindCSS** | Styling |
| **JavaScript (script.js)** | Sorting animations logic |
| **HTML/CSS** | Base template |

---

## ▶️ Run Locally (No Deployment Needed)

### 1. Clone the Repo
```bash
git clone https://github.com/princekhan6496/Sorting_Visualizer.git
cd Sorting_Visualizer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```

Server will run on:
```
http://localhost:5173/
```

---

## 🧩 System Architecture

```
User Interface (React + Tailwind)
          ↓
Control Panel (Buttons, sliders)
          ↓
Sorting Engine (script.js algorithms)
          ↓
Animation Renderer (bar updates)
          ↓
Performance Module (stats)
```

---

## 🧪 Future Improvements
- Add Radix Sort / Counting Sort
- Add sound-based visualization  
- Add dark/light theme  

---


## 📜 License  
MIT License © 2025
