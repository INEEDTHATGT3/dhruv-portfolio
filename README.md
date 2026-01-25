# 🏎️ DHRUV_PORTFOLIO_V.04 // THE_ENGINEERING_DOSSIER

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-success?style=flat-square&logo=vercel)](https://sambhavjaiswalportfolio.vercel.app/)
[![Next.js Version](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Hardware Target](https://img.shields.io/badge/Target-RTX_3050-red?style=flat-square)](https://www.nvidia.com/en-in/geforce/laptops/rtx-3050/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"Founded in Civil Engineering. Refined in Data Intelligence."**

This is a hardware-aware technical portfolio built to showcase the transition from **Civil Engineering (HBTU Kanpur)** to **Advanced Data Science**. The project utilizes automotive engineering metaphors to visualize complex technical competencies and real-time telemetry.

---

## 🛠️ TECHNICAL_SPECIFICATIONS (ECU)

| Component | Technology | Engineering Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 (React 19) | High-Performance Engine |
| **3D Engine** | React Three Fiber / Drei | Procedural Mechanical Lab |
| **Physics** | Lenis + Framer Motion | Inertia-based Scroll Dynamics |
| **Styling** | Tailwind CSS v4 | Responsive Chassis Design |
| **Communication** | EmailJS | Secure Transmission Uplink |

---

## 🏗️ ARCHITECTURAL_MODULES

### 01 // THE_BRIDGE (Cross-Disciplinary Mapping)
A mathematical bridge translating Civil Engineering foundations into Data Science counterparts:
- **Fluid Mechanics (NCE201)** ➔ **Kafka Stream Latency**
- **Geotechnical Theory (NCE207)** ➔ **Gradient Descent Optimization**

### 02 // THE_WORKSHOP (Hardware-Aware 3D)
A procedural 3D environment that optimizes rendering based on the client's GPU.
- **SPORT_MODE:** High-fidelity `meshPhysicalMaterial` and contact shadows for high-end GPUs (RTX 3050).
- **ECO_MODE:** Static diagnostic views and wireframe fallbacks for low-power stability (Radeon 530 / Mobile).

### 03 // PERFORMANCE_SPECS (Telemetry HUD)
A Bento-Box dashboard featuring a **Radar-HUD** (SVG Polygon) for core competency visualization and a real-time **HBTU Academic Tracker** for Semester 04 monitoring.

---

## ⚙️ HARDWARE_AWARENESS_PROTOCOL

The system utilizes a custom `useHardwareDetection` hook to analyze the **Unmasked Renderer** of the client's device. 
- **Technical Challenge:** Resolved React 19 / Lenis peer dependency conflicts using `overrides` and `--legacy-peer-deps` installation protocols to maintain a stable 144Hz scroll experience.

---

## 🚀 INSTALLATION_&_IGNITION

```bash
# Clone the repository
git clone https://github.com/INEEDTHATGT3/dhruv-portfolio.git

# Install dependencies with legacy peer support
npm install --legacy-peer-deps

# Start the development engine
npm run dev
