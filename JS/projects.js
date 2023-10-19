// Sample data structure for the projects
let projects = [
    {
        title: "Maze-Solving",
        short_description: "",
        long_description: "",
        images: ['title.png','Solve_02.png','Solve_03.png','Solve_04.png','Solve_05.png']
    },
    // ... Add more projects as needed
];

// Load short descriptions
projects.forEach(project => {
    fetch(`Projects/project_${project.title}/short_description.txt`)
        .then(response => response.text())
        .then(text => {
            project.short_description = text;
            createProjectCard(project);
        });
});

function createProjectCard(project) {
    const projectsGrid = document.getElementById('projects-grid');

    // Create project card
    let card = document.createElement('div');
    card.className = 'project-card';
    card.style.backgroundImage = `url(Projects/project_${project.title}/title.png)`;

    // Add hover description
    let description = document.createElement('div');
    description.className = 'project-description';
    description.textContent = project.short_description;
    card.appendChild(description);

    // Add event listener to show modal
    card.addEventListener('click', () => {
        showModal(project);
    });

    // Append card to grid
    projectsGrid.appendChild(card);
}

function showModal(project) {
    fetch(`Projects/project_${project.title}/long_description.txt`)
        .then(response => response.text())
        .then(text => {
            const modal = document.getElementById('project-modal');
            modal.querySelector('.modal-title').textContent = project.title;
            modal.querySelector('.modal-description').textContent = text;
            
            const imagesDiv = modal.querySelector('.modal-images');
            imagesDiv.innerHTML = ''; // Clear previous images
            project.images.forEach(img => {
                let imageElem = document.createElement('img');
                imageElem.src = `Projects/project_${project.title}/${img}`;
                imagesDiv.appendChild(imageElem);
            });
            modal.style.display = "block";
        });
}

// Close modal functionality
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('project-modal').style.display = "none";
});
