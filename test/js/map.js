const LEVELS = [
  {
    name: "Первые шаги",
    spawn: { x: 0, y: 2, z: 0 },
    blocks: [
      { x: 0, y: 0, z: 0, w: 8, h: 1, d: 8, color: "#888888", type: "platform" },
      { x: 0, y: 0.5, z: 10, w: 4, h: 0.5, d: 4, color: "#7f8c8d", type: "platform" },
      { x: 5, y: 1, z: 18, w: 3, h: 0.5, d: 3, color: "#95a5a6", type: "platform" },
      { x: 0, y: 1.5, z: 26, w: 3, h: 0.5, d: 3, color: "#7f8c8d", type: "platform" },
      { x: -4, y: 2, z: 34, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: -4, y: 2.5, z: 42, w: 3, h: 0.5, d: 3, color: "#95a5a6", type: "platform" },
      { x: 0, y: 3, z: 50, w: 3, h: 0.5, d: 3, color: "#7f8c8d", type: "platform" },
      { x: 4, y: 3.5, z: 58, w: 3, h: 0.5, d: 3, color: "#95a5a6", type: "platform" },
      { x: 0, y: 4, z: 66, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: -3, y: 4.5, z: 74, w: 3, h: 0.5, d: 3, color: "#7f8c8d", type: "platform" },
      { x: 2, y: 5, z: 82, w: 3, h: 0.5, d: 3, color: "#95a5a6", type: "platform" },
      { x: 0, y: 5.5, z: 90, w: 6, h: 0.5, d: 6, color: "#f1c40f", type: "finish" }
    ]
  },
  {
    name: "Над лавой",
    spawn: { x: 0, y: 2, z: 0 },
    blocks: [
      { x: 0, y: 0, z: 0, w: 6, h: 1, d: 6, color: "#888888", type: "platform" },
      { x: 0, y: -0.5, z: 14, w: 12, h: 0.3, d: 8, color: "#ff4500", type: "lava" },
      { x: -3, y: 0.5, z: 12, w: 2, h: 0.5, d: 2, color: "#bdc3c7", type: "platform" },
      { x: 0, y: 1, z: 16, w: 2, h: 0.5, d: 2, color: "#bdc3c7", type: "platform" },
      { x: 3, y: 1.5, z: 12, w: 2, h: 0.5, d: 2, color: "#bdc3c7", type: "platform" },
      { x: 5, y: 2, z: 20, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 5, y: 1.5, z: 30, w: 14, h: 0.3, d: 10, color: "#ff4500", type: "lava" },
      { x: 0, y: 2.5, z: 28, w: 1.8, h: 0.5, d: 1.8, color: "#3498db", type: "platform" },
      { x: 4, y: 3, z: 32, w: 1.8, h: 0.5, d: 1.8, color: "#3498db", type: "platform" },
      { x: 8, y: 3.5, z: 28, w: 1.8, h: 0.5, d: 1.8, color: "#3498db", type: "platform" },
      { x: 10, y: 4, z: 34, w: 1.8, h: 0.5, d: 1.8, color: "#3498db", type: "platform" },
      { x: 6, y: 4.5, z: 38, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 2, y: 5, z: 46, w: 3, h: 0.5, d: 3, color: "#9b59b6", type: "platform" },
      { x: -2, y: 5.5, z: 54, w: 3, h: 0.5, d: 3, color: "#9b59b6", type: "platform" },
      { x: 2, y: 6, z: 62, w: 3, h: 0.5, d: 3, color: "#9b59b6", type: "platform" },
      { x: 0, y: 6.5, z: 70, w: 6, h: 0.5, d: 6, color: "#f1c40f", type: "finish" }
    ]
  },
  {
    name: "Вершина",
    spawn: { x: 0, y: 2, z: 0 },
    blocks: [
      { x: 0, y: 0, z: 0, w: 6, h: 1, d: 6, color: "#888888", type: "platform" },
      { x: 0, y: 0, z: 10, w: 1.5, h: 0.5, d: 6, color: "#3498db", type: "platform" },
      { x: 0, y: -1, z: 10, w: 6, h: 0.3, d: 10, color: "#ff4500", type: "lava_crack" },
      { x: 4, y: 1, z: 18, w: 2, h: 0.5, d: 2, color: "#95a5a6", type: "platform" },
      { x: 0, y: 2, z: 24, w: 2, h: 0.5, d: 2, color: "#7f8c8d", type: "platform" },
      { x: -4, y: 3, z: 30, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: -4, y: 2.5, z: 38, w: 14, h: 0.3, d: 8, color: "#ff4500", type: "lava" },
      { x: -6, y: 3.5, z: 36, w: 1.5, h: 0.5, d: 1.5, color: "#bdc3c7", type: "platform" },
      { x: -3, y: 4.5, z: 40, w: 1.5, h: 0.5, d: 1.5, color: "#bdc3c7", type: "platform" },
      { x: 0, y: 5.5, z: 36, w: 1.5, h: 0.5, d: 1.5, color: "#bdc3c7", type: "platform" },
      { x: 3, y: 6.5, z: 40, w: 1.5, h: 0.5, d: 1.5, color: "#bdc3c7", type: "platform" },
      { x: 5, y: 7, z: 46, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 5, y: 7, z: 54, w: 1, h: 0.5, d: 6, color: "#e74c3c", type: "platform" },
      { x: 5, y: 5.5, z: 54, w: 6, h: 0.3, d: 10, color: "#ff4500", type: "lava_crack" },
      { x: 2, y: 8, z: 62, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: -2, y: 9, z: 68, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: 0, y: 10, z: 76, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 3, y: 11, z: 84, w: 2, h: 0.5, d: 2, color: "#e67e22", type: "platform" },
      { x: -1, y: 12, z: 90, w: 2, h: 0.5, d: 2, color: "#e67e22", type: "platform" },
      { x: 3, y: 13, z: 96, w: 2, h: 0.5, d: 2, color: "#e67e22", type: "platform" },
      { x: 0, y: 14, z: 104, w: 8, h: 0.5, d: 8, color: "#f1c40f", type: "finish" }
    ]
  },
  {
    name: "Зигзаг",
    spawn: { x: 0, y: 2, z: 0 },
    blocks: [
      { x: 0, y: 0, z: 0, w: 6, h: 1, d: 6, color: "#888888", type: "platform" },
      { x: 6, y: 1, z: 8, w: 3, h: 0.5, d: 3, color: "#3498db", type: "platform" },
      { x: 0, y: 2, z: 16, w: 3, h: 0.5, d: 3, color: "#3498db", type: "platform" },
      { x: -6, y: 3, z: 24, w: 3, h: 0.5, d: 3, color: "#3498db", type: "platform" },
      { x: 0, y: 4, z: 32, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 0, y: 3, z: 40, w: 20, h: 0.3, d: 12, color: "#ff4500", type: "lava" },
      { x: -5, y: 4.5, z: 38, w: 1.5, h: 0.5, d: 1.5, color: "#e67e22", type: "platform" },
      { x: -1, y: 5.5, z: 42, w: 1.5, h: 0.5, d: 1.5, color: "#e67e22", type: "platform" },
      { x: 3, y: 6.5, z: 38, w: 1.5, h: 0.5, d: 1.5, color: "#e67e22", type: "platform" },
      { x: 7, y: 7.5, z: 42, w: 1.5, h: 0.5, d: 1.5, color: "#e67e22", type: "platform" },
      { x: 3, y: 8.5, z: 48, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: -2, y: 9, z: 56, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: 4, y: 9.5, z: 62, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: -2, y: 10, z: 68, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: 4, y: 10.5, z: 74, w: 2, h: 0.5, d: 2, color: "#9b59b6", type: "platform" },
      { x: 0, y: 11, z: 82, w: 8, h: 0.5, d: 8, color: "#f1c40f", type: "finish" }
    ]
  },
  {
    name: "Лабиринт огня",
    spawn: { x: 0, y: 2, z: 0 },
    blocks: [
      { x: 0, y: 0, z: 0, w: 8, h: 1, d: 8, color: "#888888", type: "platform" },
      { x: 0, y: -0.5, z: 12, w: 16, h: 0.3, d: 8, color: "#ff4500", type: "lava_crack" },
      { x: -4, y: 0.8, z: 10, w: 1.2, h: 0.5, d: 1.2, color: "#bdc3c7", type: "platform" },
      { x: -1, y: 1.3, z: 14, w: 1.2, h: 0.5, d: 1.2, color: "#bdc3c7", type: "platform" },
      { x: 2, y: 1.8, z: 10, w: 1.2, h: 0.5, d: 1.2, color: "#bdc3c7", type: "platform" },
      { x: 5, y: 2.3, z: 14, w: 1.2, h: 0.5, d: 1.2, color: "#bdc3c7", type: "platform" },
      { x: 5, y: 3, z: 20, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 5, y: 3, z: 28, w: 1, h: 0.5, d: 8, color: "#e74c3c", type: "platform" },
      { x: 5, y: 1.5, z: 28, w: 8, h: 0.3, d: 12, color: "#ff4500", type: "lava" },
      { x: 0, y: 4, z: 36, w: 2, h: 0.5, d: 2, color: "#3498db", type: "platform" },
      { x: -4, y: 5, z: 42, w: 2, h: 0.5, d: 2, color: "#3498db", type: "platform" },
      { x: -4, y: 6, z: 50, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: -4, y: 5.5, z: 58, w: 14, h: 0.3, d: 10, color: "#ff4500", type: "lava_crack" },
      { x: -6, y: 6.5, z: 56, w: 1.2, h: 0.5, d: 1.2, color: "#e67e22", type: "platform" },
      { x: -2, y: 7.5, z: 60, w: 1.2, h: 0.5, d: 1.2, color: "#e67e22", type: "platform" },
      { x: 2, y: 8.5, z: 56, w: 1.2, h: 0.5, d: 1.2, color: "#e67e22", type: "platform" },
      { x: 5, y: 9.5, z: 60, w: 1.2, h: 0.5, d: 1.2, color: "#e67e22", type: "platform" },
      { x: 5, y: 10, z: 68, w: 5, h: 0.5, d: 5, color: "#2ecc71", type: "checkpoint" },
      { x: 2, y: 11, z: 76, w: 2.5, h: 0.5, d: 2.5, color: "#9b59b6", type: "platform" },
      { x: -2, y: 12, z: 82, w: 2.5, h: 0.5, d: 2.5, color: "#9b59b6", type: "platform" },
      { x: 2, y: 13, z: 88, w: 2.5, h: 0.5, d: 2.5, color: "#9b59b6", type: "platform" },
      { x: 0, y: 14, z: 96, w: 8, h: 0.5, d: 8, color: "#f1c40f", type: "finish" }
    ]
  }
];
