import Completion from "./OpenAI.js";
import { ToDo } from "./ToDo.js";

class Project {
    constructor(owner, title, description, dueDate) {
        this.id = crypto.randomUUID();
        this.owner = owner;
        this.title = title;
        this.description = description;
        this.resources = null;
        this.suggestions = null;
        this.toDo = null;
        this.startDate = new Date().toLocaleDateString();
        this.dueDate = dueDate;

        (this.initializeResources = async () => this.resources = await Project.generateResources(this.description))();
        (this.initializeSuggestions = async () => this.suggestions = await Project.generateSuggestions(this.description))();
        (this.initializeToDo = async () => this.toDo = await Project.generateToDo(this.description, this.suggestions, this.resources, this.owner))();
    }

    static async generateResources(description) {
        let context = "You are a top scholar and college-educated in all areas of education.";
        let prompt = `what skill/resources do I need to do this? Each skill/resource should be in a simple short sentence.
        Be direct in what the user needs for example, "You need..." (Do not include "You need").
        If there are options to achieve the same thing, give the options.
        Skills/Resources that are strikingly similar should be put together to make one.
        Do not include skills/resources for optional features like testing etc.
        Most importantly make it as concise as possible.
        Return a JavaScript list script without back ticks or quotes, square brackets or a variable.
        Do not separate with commas seperate with newline.`;

        let result = await Completion(context, description + " " + prompt);
        let resources = result.split("\n").filter(item => item.trim() !== "");
        return resources;
    }

    static async generateSuggestions(description) {
        let context = "You are a top scholar and college-educated in all areas of education as well as a creative genius.";
        let prompt = `Give me very few cool suggestions that'll improve this idea. Be sure to assess what i have come up with
        and do not stray too far past from what you think my technical/skill limit is.
        Most importantly make it as concise and short as possible. Do not explain at all. Do not include code.
        Leave out any unccessary texts, spaces and newlines.
        Do not separate points with commas seperate points with newline and only make newline for new different suggestion.`;
        
        let result = await Completion(context, description + " " + prompt);
        let suggestions = result.split("\n").filter(item => item.trim() !== "");
        return suggestions;
    }

    addMembers(user) {
        this.members.push(user);
    }

    static async generateToDo(description, suggestions, resources, owner) {
        let context = `You are a top scholar and college-educated in all areas of education.
                        You are also a councellor therefore a master of guidance and 
                        breaking down complex tasks into smaller manageable tasks.
                        You are also a master of prioritization.
                        You are also a master of time estimation.
                        You are also a master of task assignment.
                        You are also a master of task tracking.
                        You are also a master of task completion.
                        You are also a master of task review.
                        You are also a master of task feedback.
                        You are also a master of task improvement.
                        You are also a master of task delegation.
                        You are also a master of task management.`;
        let prompt = `Considering the description of my idea/project: ${description}, 
                    a friend's suggestions to improve my idea/project: ${suggestions}, 
                    and given the neccessary skills and resources i need to accomplish this idea/project: ${resources}
                    Make a chronological to-do list consisting of a break down of this task into consice but detailed smaller manageable tasks. 
                    Each task should be in a simple short sentence.
                    Be direct in what the user needs to do.
                    Most importantly make it as concise and short as possible.
                    Leave out any unccessary texts. Do not number or use bullets.
                    Do not separate points with commas seperate points with newline.`;

        let result = await Completion(context, prompt);
        let tasks = result.split("\n").filter(item => item.trim() !== "");
        let toDo = new ToDo(owner);
        for (let task of tasks) {
            toDo.addEnd(task);
        }
        return toDo;
    }

    addTags(tag) {
        this.tags.push(tag);
    }

    removeTags(tag) {
        let index = this.tags.indexOf(tag);
        if (index > -1) {
            this.tags.splice(index, 1);
        }
        else {
            return -1;
        }
    }
}
export { Project };