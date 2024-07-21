import { Project } from "./Project";
class User {
    constructor(userName, email, github, password) {
        this.userName = userName;
        this.email = email;
        this.github = github;
        this.password = password;
        this.projects = [];
        this.projProgress = this.totalProgs();
        this.joined = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    async createNewProject(owner, title, description, dueDate) {
        const newProject = new Project(owner, title, description, dueDate);
    
        await newProject.initializeResources();
        await newProject.initializeSuggestions();
        await newProject.initializeToDo();
        
        this.projects = [...this.projects, newProject];
    }

    async editProject(owner, title, description, dueDate, oldProj) {
        const newProject = new Project(owner, title, description, dueDate);
    
        await newProject.initializeResources();
        await newProject.initializeSuggestions();
        await newProject.initializeToDo();
    
        const index = this.projects.findIndex(project => project.id === oldProj.id);
    
        if (index === -1) {
            console.error("Project to be edited was not found in the user's projects");
            return;
        }
        
        const updatedProjects = [
            ...this.projects.slice(0, index),
            newProject,
            ...this.projects.slice(index + 1)
        ];
        this.projects = updatedProjects;    
    }
    
    deleteProject(delProject) {
        const index = this.projects.findIndex(project => project.id === delProject.id);

        if (index === -1) {
            console.error("Project to be deleted was not found in the user's projects");
            return;
        }

        const updatedProjects = [
            ...this.projects.slice(0, index),
            ...this.projects.slice(index + 1)
        ];
        this.projects = updatedProjects;
    }

    numCompletedProj() {
        let count = 0;
        for (let i = 0; i < this.projects.length; i++) {
            if (this.projects[i].toDo.progress === 100) {
                count++;
            }
        }
        return count;
    }

    totalProgs() {
        let projProgress = [];
        for (let i = 0; i < this.projects.length; i++) {
            projProgress.push(this.projects[i].toDo.progress);
        }
        return projProgress;
    }

    numDueProj() {
        let count = 0;
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < this.projects.length; i++) {
            let dueDate = new Date(this.projects[i].dueDate);
            dueDate.setHours(23, 59, 59, 999);
            if (dueDate <= today && this.projects[i].toDo.progress < 100) {
                count++;
            }
        }
        return count;
    }
        
    upcomingDues() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        let upcoming = [];
        for (let i = 0; i < this.projects.length; i++) {
            let dueDate = new Date(this.projects[i].dueDate);
            dueDate.setHours(23, 59, 59, 999);
            
            if (dueDate > today) {
                upcoming.push(this.projects[i]);
            }
        }
        
        upcoming.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        return upcoming;
    }    

    getTotalProjs() {
        return this.projects.length;
    }
}

export { User };
