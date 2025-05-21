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
    # git clone https://github.com/7azmi/person-bmi-app.git
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

### 2. BMI Statistics Page
![Uploading image.png…]()


### 3. Add Person Page
![image](https://github.com/user-attachments/assets/ad259fdc-4860-467b-98c2-315977e68d10)



---

*This project was developed as part of a lab activity.*
EOF
echo "README.md created using here document."
