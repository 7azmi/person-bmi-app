cat << 'EOF' > README.md
# Person BMI Web App (Vue.js)

This project is a web application built with Vue.js 3 (using Vue CLI) for managing Person BMI data. It includes full CRUD (Create, Read, Update, Delete) functionality, routing with Vue Router, a JSON Server backend, and BMI statistics display including a Chart.js pie chart.

## Group Information

**Group Name:** OKLA

**Team Members:**
- ALTAYEB MUSTAFA IBRAHIM ABDELRASOUL (A21EC9115)
- ANAS MUZAMIL (A21EC4041)
- WALID ALI MOHAMMED (A21EC9116)
- AHMED HANI AHMED GHALIB (A21EC9120)

## Features
- **Vue CLI Setup**: Project scaffolded with Vue CLI.
- **Vue Components**: Structured with parent-child communication (props, $emit).
- **Vue Router**: For SPA navigation between different views (Add, List, View One, Edit, Stats).
- **CRUD Operations**:
    - Create new person records.
    - Read all person records in a list.
    - Read details of a single person.
    - Update existing person records.
    - Delete person records.
- **Backend Integration**: Connects to a `json-server` backend using the Fetch API.
- **Dynamic Data Rendering**: Displays person data dynamically.
- **Charts**: Renders BMI statistics using Chart.js (pie chart and text-based bars).
- **Responsive Design Elements**: Basic styling for usability.

## Tech Stack
- Frontend: Vue.js 3 (Composition API), Vue Router, Chart.js
- Backend: `json-server`
- Build Tool: Vue CLI
- Styling: Plain CSS

## Project Setup & Running

### Prerequisites
- Node.js and npm (or yarn)
- Vue CLI (`npm install -g @vue/cli`)
- JSON Server (`npm install -g json-server`)

### Installation & Running Locally
1.  **Clone the repository (or download the zip if not using Git):**
    ```bash
    # git clone <repository-url>
    # cd person-bmi-app
    ```
2.  **Install project dependencies:**
    ```bash
    npm install
    ```
3.  **Run the JSON Server (Backend):**
    Open a new terminal in the project root and run:
    ```bash
    json-server --watch db.json --port 3000
    ```
    The `db.json` file provides the initial data structure.
4.  **Run the Vue Development Server (Frontend):**
    In another terminal (in the project root), run:
    ```bash
    npm run serve
    ```
    The application will typically be available at `http://localhost:8080` (the console will indicate the exact port).

## Screenshots

### 1. Person List (Home Page)
![image](https://github.com/user-attachments/assets/ae9dd041-93da-4851-b75d-8c3bc5177808)
*Shows the main view with all persons listed, including their photo, BMI, and action buttons.*

### 2. Add Person Form
![Add Person Form Screenshot Placeholder](https://via.placeholder.com/800x450.png/E8E8E8/969696?text=Screenshot+of+Add+Person+Form)
*Shows the form for adding a new person with fields for name, year born, weight, height, and photo URL.*

### 3. View Person Details
![View Person Details Screenshot Placeholder](https://via.placeholder.com/800x450.png/E8E8E8/969696?text=Screenshot+of+View+Person+Details)
*Shows the detailed view of a single person, including a BMI category bar.*

### 4. Edit Person Form
![Edit Person Form Screenshot Placeholder](https://via.placeholder.com/800x450.png/E8E8E8/969696?text=Screenshot+of+Edit+Person+Form)
*Shows the form pre-filled with an existing person's data for editing.*

### 5. BMI Statistics Page
![image](https://github.com/user-attachments/assets/9d6510f5-8294-4d54-8578-d7c9725e0c95)
*Shows the BMI statistics, including a textual breakdown and a Chart.js pie chart.*

---

*This project was developed as part of a lab activity.*
EOF
echo "README.md created using here document."