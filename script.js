// Sample bug data

let bugs = [
    {
        id: "BUG-001",
        title: "Login button not working",
        description: "The login button does not respond when clicked.",
        project: "Student Portal",
        priority: "High",
        severity: "Critical",
        reportedBy: "Anjali",
        developer: "Rahul",
        status: "Open"
    },

    {
        id: "BUG-002",
        title: "Profile image not loading",
        description: "User profile image is not displayed.",
        project: "College App",
        priority: "Medium",
        severity: "Major",
        reportedBy: "Kiran",
        developer: "Priya",
        status: "In Progress"
    },

    {
        id: "BUG-003",
        title: "Search results incorrect",
        description: "Search gives incorrect results for some keywords.",
        project: "Library System",
        priority: "Low",
        severity: "Minor",
        reportedBy: "Ravi",
        developer: "Arun",
        status: "Resolved"
    }
];


// Show sections

function showSection(sectionId) {

    let sections = document.querySelectorAll(".section");

    sections.forEach(function(section) {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    updateDashboard();

    if (sectionId === "bugs") {
        displayBugs();
    }

    if (sectionId === "developers") {
        updateDevelopers();
    }
}


// Display bugs

function displayBugs() {

    let bugList = document.getElementById("bugList");

    let searchText =
        document.getElementById("searchInput").value.toLowerCase();

    let statusFilter =
        document.getElementById("statusFilter").value;

    let priorityFilter =
        document.getElementById("priorityFilter").value;

    bugList.innerHTML = "";

    let filteredBugs = bugs.filter(function(bug) {

        let matchesSearch =
            bug.title.toLowerCase().includes(searchText);

        let matchesStatus =
            statusFilter === "All" ||
            bug.status === statusFilter;

        let matchesPriority =
            priorityFilter === "All" ||
            bug.priority === priorityFilter;

        return matchesSearch &&
               matchesStatus &&
               matchesPriority;
    });


    if (filteredBugs.length === 0) {

        bugList.innerHTML =
            "<p>No bugs found.</p>";

        return;
    }


    filteredBugs.forEach(function(bug) {

        let bugCard = document.createElement("div");

        bugCard.className = "bug-card";

        bugCard.innerHTML = `
            <h3>🐞 ${bug.id} - ${bug.title}</h3>

            <p><strong>Description:</strong>
            ${bug.description}</p>

            <p><strong>Project:</strong>
            ${bug.project}</p>

            <p><strong>Priority:</strong>
            ${bug.priority}</p>

            <p><strong>Severity:</strong>
            ${bug.severity}</p>

            <p><strong>Reported By:</strong>
            ${bug.reportedBy}</p>

            <p><strong>Developer:</strong>
            ${bug.developer}</p>

            <p>
                <strong>Status:</strong>
                <span class="badge">${bug.status}</span>
            </p>

            <button
                class="status-btn"
                onclick="changeStatus('${bug.id}')">
                Change Status
            </button>

            <button
                class="delete-btn"
                onclick="deleteBug('${bug.id}')">
                Delete
            </button>
        `;

        bugList.appendChild(bugCard);
    });
}


// Change bug status

function changeStatus(id) {

    let bug = bugs.find(function(item) {
        return item.id === id;
    });

    if (!bug) return;


    if (bug.status === "Open") {
        bug.status = "In Progress";
    }
    else if (bug.status === "In Progress") {
        bug.status = "Resolved";
    }
    else if (bug.status === "Resolved") {
        bug.status = "Closed";
    }
    else {
        bug.status = "Open";
    }


    displayBugs();
    updateDashboard();
    updateDevelopers();
}


// Delete bug

function deleteBug(id) {

    let confirmDelete =
        confirm("Are you sure you want to delete this bug?");

    if (!confirmDelete) {
        return;
    }

    bugs = bugs.filter(function(bug) {
        return bug.id !== id;
    });

    displayBugs();
    updateDashboard();
    updateDevelopers();
}


// Report new bug

document.getElementById("bugForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let newBug = {

        id: "BUG-" +
            String(bugs.length + 1).padStart(3, "0"),

        title:
            document.getElementById("bugTitle").value,

        description:
            document.getElementById("bugDescription").value,

        project:
            document.getElementById("project").value,

        priority:
            document.getElementById("priority").value,

        severity:
            document.getElementById("severity").value,

        reportedBy:
            document.getElementById("reportedBy").value,

        developer:
            document.getElementById("developer").value,

        status: "Open"
    };


    bugs.push(newBug);

    alert("Bug reported successfully!");


    document.getElementById("bugForm").reset();

    updateDashboard();

    showSection("bugs");
});


// Update dashboard

function updateDashboard() {

    document.getElementById("totalBugs").textContent =
        bugs.length;

    document.getElementById("openBugs").textContent =
        bugs.filter(function(bug) {
            return bug.status === "Open";
        }).length;

    document.getElementById("progressBugs").textContent =
        bugs.filter(function(bug) {
            return bug.status === "In Progress";
        }).length;

    document.getElementById("resolvedBugs").textContent =
        bugs.filter(function(bug) {
            return bug.status === "Resolved";
        }).length;


    let recentBugs =
        document.getElementById("recentBugs");

    recentBugs.innerHTML = "";


    bugs.slice(-3).reverse().forEach(function(bug) {

        recentBugs.innerHTML += `
            <div class="bug-card">
                <h3>${bug.id} - ${bug.title}</h3>
                <p>Project: ${bug.project}</p>
                <p>Status: ${bug.status}</p>
                <p>Priority: ${bug.priority}</p>
            </div>
        `;
    });
}


// Developer statistics

function updateDevelopers() {

    let developers = ["Rahul", "Priya", "Arun", "Sneha"];

    developers.forEach(function(developer) {

        let count = bugs.filter(function(bug) {
            return bug.developer === developer;
        }).length;

        let element =
            document.getElementById(
                developer.toLowerCase() + "Bugs"
            );

        if (element) {
            element.textContent = count;
        }
    });
}


// Initial display

updateDashboard();
updateDevelopers();