# 🐾 PawLink — Animal Rescue & Welfare Platform

> **A modern, centralized animal welfare and emergency coordination prototype connecting citizens, rapid rescue teams, animal shelters, and veterinary clinics.**

Built for college project presentations and technical demonstrations. Designed to look, feel, and function like a production-ready civic healthcare technology platform.

---

## 🌟 Project Overview

Animal rescue services, veterinary hospitals, and shelters frequently operate in isolation. When a citizen discovers an injured or abandoned animal on the street, response delays and lack of coordination can be fatal.

**PawLink** solves this fragmentation through four core pillars:
1. **Emergency Rescue & Automated Proximity Dispatch**: Real-time distress incident reporting with algorithmic nearest-team calculation.
2. **Unified Institutional Network**: A centralized registry of vetted shelters, veterinary clinics, and rescue crews with live status indicators.
3. **Compassionate Adoption & End-of-Life Guidance**: Ethical pet adoption matching paired with veterinary-led palliative care assessments.
4. **Accessible Tele-Veterinary Consultations**: Subsidized online video consultations (₹99–₹199) connecting pet owners directly with certified veterinarians.
5. **Central Operations & Multi-Persona Hub**: Role-based operational telemetry for Rescuers, Shelter Managers, Vets, Citizens, and System Administrators.

---

## 🚀 How to Run the Project

### Prerequisites
- **Node.js** (v18 or higher recommended; developed and tested on Node v24)
- **npm** (v9 or higher)

### Installation & Launch

1. Open your terminal in the project directory:
   ```bash
   cd "SANJ proj test 1"
   ```

2. Start the local Vite development server:
   ```bash
   npm run dev
   ```

3. Open the printed local URL in your browser (typically `http://localhost:5173`).

### Production Build Verification
To verify code compilation and production bundle efficiency:
```bash
npm run build
```
*(Zero TypeScript warnings or errors; builds clean in under 1 second).*

---

## 🖥️ Live Pages & Implemented Features

### 1. 🏠 Home Page (`/`)
- **Hero Section**: High-impact animal imagery with mission statement and dual CTAs (*Report an Emergency*, *Explore Adoption*).
- **Core Pillars Grid**: Interactive feature cards highlighting Emergency, Network, Adoption, and Telehealth.
- **Visual 3-Step Process**: "Report → Connect → Care" pipeline breakdown.
- **Animated Counter Metrics**: Interactive counters tracking 1,250+ Animals Helped, 45+ Partner Shelters, 30+ Vets, and 800+ Adoptions.
- **Comprehensive Footer**: Quick links, disclaimer tags, demo contact details, and social channels.

### 2. 🚨 Emergency Rescue Page (`/emergency`)
- **High-Urgency UI**: Red accented emergency terminal with 24/7 availability markers.
- **Structured Distress Form**:
  - Animal species selector (Dog, Cat, Bird, Cow, Other) with visual card buttons.
  - Emergency taxonomy (Vehicular trauma, Severe illness, Entrapment, Abandonment, etc.).
  - Severity triage (Critical 🔴, Urgent 🟡, Non-critical 🟢).
  - Hyderabad locality dropdown (Miyapur, Gachibowli, Kukatpally, Madhapur, Banjara Hills, etc.) and landmark inputs.
  - Optional photo upload with client-side FileReader preview.
- **Dynamic Nearest-Team Algorithm**: Calculates Euclidean/Haversine spherical distance between the reported locality coordinates and active rescue team bases.
- **Submission Feedback & Live Status Tracker**:
  - Generates unique tracking ID (`PL-2026-XXX`).
  - Displays assigned crew (e.g. *Hyderabad Animal Rescue Team*) and computed road distance (e.g. *2.4 km*).
  - 5-step visual status tracker (*Submitted → Assigned → Notified → In Progress → Resolved*).
  - Dotted radar map visualization showing GPS pin.

### 3. 🌐 Rescue Network Page (`/rescue-network`)
- **Institution Categories**:
  - 4 Vetted Animal Shelters (capacity indicators, intake metrics).
  - 4 Specialized Veterinary Hospitals (ICU, orthopedic, diagnostics).
  - 4 Rapid Rescue Units (active crews, equipment specialties).
- **Real-Time Search & Filtering**: Multi-condition filters for type (All, Shelters, Rescue, Clinics) and availability (Available, Busy, Limited).
- **Organization Modals**: Deep-dive profile modals with services list, contact details, and facility overview.
- **One-Click Institutional Linking**: Connect button updates the live network state and reflects on the central dashboard.
- **"How Our Network Connects" Architectural Diagram**: Visual flow diagram illustrating data propagation from citizen report to shelter recovery.

### 4. 🐶 Adoption & End-of-Life Care Page (`/adoption`)
- **Section A: Animal Adoption**
  - 8+ diverse animal profiles (Bruno, Luna, Max, Mango, Bella, Kiwi, Shadow, Mittens).
  - Filters by Species (Dog, Cat, Bird, Other) and Gender (Male, Female).
  - Detailed modal with health background (Vaccination, Microchip, Spay/Neuter status) and personality badges.
  - Complete adoption questionnaire form (housing type, pet experience, reason for adoption).
- **Section B: Compassionate End-of-Life Care (`#eol`)**
  - Dignified, medical-first aesthetic (soft lavender/blue palette).
  - Veterinary-led medical guidance (palliative pain management, quality of life assessment).
  - Clear ethical boundary statement ensuring euthanasia is never treated as a transactional purchase.
  - "Request a Veterinary Assessment" modal for terminal cases.

### 5. 🩺 Affordable Online Vet Consultation (`/vet-consultation`)
- **Doctor Directory**: 4 certified veterinary specialists (Surgery, Internal Medicine, Dermatology, Nutrition).
- **Affordable Prototype Pricing**: Transparent pricing starting at ₹99 – ₹199 per session.
- **Interactive Booking Suite**:
  - Date and time slot reservation.
  - Patient profiling (pet name, species, age, symptom description).
- **Booking Confirmation & Simulated Video Call Room**:
  - Realistic full-screen telehealth UI with doctor camera feed and picture-in-picture user preview.
  - Real-time elapsed call duration timer (`MM:SS`).
  - Mute audio, toggle camera, and red disconnect controls.
  - Interactive two-way chat sidebar with automated doctor responses.

### 6. 📊 Central Demo Dashboard (`/dashboard`)
- **Multi-Persona Perspective Switcher**:
  - **Platform Admin**: Complete cross-functional operational view.
  - **Rescue Team**: Focused dispatch terminal for incoming road trauma cases.
  - **Shelter Staff**: Applicant screening and capacity monitoring.
  - **Veterinarian**: Upcoming appointment queue and telehealth console.
  - **General Citizen**: Track personal reports and booking history.
- **Live Status Advancement**: One-click action buttons to transition emergency cases (*Accept Case → Rescue In Progress → Mark Resolved*) with instant notification generation.
- **State Persistence**: All user submissions, status updates, and linked institutions synchronize across browser tabs and persist in `localStorage`.
- **Presentation Seed Button**: "Load Presentation Samples" button to instantly populate realistic active scenarios for smooth live demos.

---

## 🎭 What is Simulated (Frontend Demo Prototype)

To run anywhere without paid cloud APIs, credit cards, or complex database setups, the following systems are simulated on the client:

| Feature | Simulation Method |
|---|---|
| **Backend & Database** | React Context API + browser `localStorage` persistence |
| **GPS / Distance Math** | Mathematical coordinate distance calculation between Hyderabad localities |
| **Rescue Dispatch** | Real-time algorithmic matching based on closest Euclidean coordinates |
| **Video Consultation** | Synthetic WebRTC-style interface with live timer and conversational script |
| **Payment Gateway** | Instant checkout confirmation with demo pricing tags |
| **Notifications** | Client-side reactive event bus with popup toasts and unread count badges |

---

## 📋 Recommended Presentation Walkthrough

Follow this 5-minute script for your college evaluation:

1. **The Problem Statement (Home Page)**:
   - Introduce PawLink: *"In Indian cities like Hyderabad, street animals face delayed medical response because citizens don't know who to call."*
   - Show the floating red emergency button present across every screen.
2. **The Emergency Scenario (Emergency Page)**:
   - Click **Report an Emergency**.
   - Select **Dog**, **Animal hit by vehicle**, **Critical**, locality **Miyapur**.
   - Submit the form: notice how PawLink immediately computes the distance and assigns the nearest team: *Hyderabad Animal Rescue Team (Miyapur)*.
3. **The Multi-Persona Coordination (Dashboard)**:
   - Switch to the **Dashboard**.
   - Show how the report instantly appeared in the queue.
   - Switch role to **Rescue Team (HART)**.
   - Click **Accept Case** &rarr; **Rescue In Progress** &rarr; **Mark Resolved**. Show the live notification generated.
4. **Preventive & Telehealth Care (Vet Consultation)**:
   - Navigate to **Vet Consultation**.
   - Highlight affordability (₹149 vs clinic visits).
   - Book a session with *Dr. Priya Sharma*.
   - Click **Join Call Room** to showcase the simulated video consultation, mute/video toggles, and live chat.
5. **Community Welfare (Adoption & Network)**:
   - Browse the adoption gallery and submit an inquiry for *Bruno*.
   - Show the **Rescue Network** institutional graph connecting shelters, vets, and rescuers.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + PostCSS
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Icons**: Lucide React
- **State Management**: React Context + Reducer + `localStorage`

---

*Designed and engineered with passion for animal welfare.* 🐾
