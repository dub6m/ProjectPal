class Node {
    constructor(task) {
        this.prev = null;
        this.task = task;
        this.isCompleted = false;
        this.next = null;
    }
}

class ToDo {
    constructor(user) {
        this.user = user;
        this.head = null;
        this.tail = null;
        this.size = 0;
        this.progress = 0;
        this.status = this.getStatus();
    }

    // All returns -1 if operation fails

    // Adds a task at the end of the to-do list
    addEnd(task) {
        if (this.find(task) == -1) { // Ensure the task does not already exist
            let newNode = new Node(task);
            if (this.head == null && this.tail == null) {
                this.head = newNode;
                this.tail = newNode;
            }
            else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
            this.size += 1;
            this.progress = this.updateProgress();
        }
        else {
            return -1;
        }
    }

    // Adds a task at the beginning of the to-do list
    addFirst(task) {
        if (this.find(task) == -1) { // Ensure the task does not already exist
            let newNode = new Node(task);
            if (this.head == null && this.tail == null) {
                this.head = newNode;
                this.tail = newNode;
            }
            else {
                newNode.next = this.head;
                this.head.prev = newNode;
                this.head = newNode;
            }
            this.size += 1;
            this.progress = this.updateProgress();
        }
        else {
            return -1;
        }
    }

    // Adds a task after a specified task in the to-do list
    fit(prev, task) {
        let prevNode = this.find(prev);
        if (prevNode == -1) {
            return -1;
        }
        else if (prevNode == this.tail) {
            this.addEnd(task);
        }
        else {
            let newNode = new Node(task);
            newNode.next = prevNode.next;
            newNode.next.prev = newNode;
            prevNode.next = newNode;
            newNode.prev = prevNode;
            this.size += 1;
            this.progress = this.updateProgress();
        }
    }

    // Deletes the task at the end of the to-do list
    delEnd() {
        if (this.size > 0) {
            let temp = this.tail;
            if (this.tail.prev) {
                this.tail = this.tail.prev;
                this.tail.next = null;
            }
            else {
                this.head = this.tail = null;
            }
            temp.prev = null;
            this.size -= 1;
            this.progress = this.updateProgress();
        }
        else {
            return -1;
        }
    }

    // Deletes the task at the beginning of the to-do list
    delFirst() {
        if (this.size > 0) {
            let temp = this.head;
            if (this.head.next) {
                this.head = this.head.next;
                this.head.prev = null;
            }
            else {
                this.head = this.tail = null;
            }
            temp.next = null;
            this.size -= 1;
            this.progress = this.updateProgress();
        }
        else {
            return -1;
        }
    }

    // Deletes the task after a specified task in the to-do list
    pop(prev) {
        let prevNode = this.find(prev);
        if (prevNode == -1 || prevNode == this.tail || !prevNode.next) {
            return -1;
        }
        else {
            let temp = prevNode.next;
            prevNode.next = temp.next;
            if (temp.next) {
                temp.next.prev = prevNode;
            }
            else {
                this.tail = prevNode;
            }
            temp.prev = null;
            temp.next = null;
            this.size -= 1;
            this.progress = this.updateProgress();
        }
    }
    
    // Finds a task
    find(task) {
        let current = this.head;
        while (current != null) {
            if (current.task === task) {
                return current;
            }
            else {
                current = current.next;
            }
        }
        return -1;
    }

    // Updates the progress of tasks completed
    updateProgress() {
        let tasksCompleted = 0;
        let current = this.head;
        while (current != null) {
            if (current.isCompleted) {
                tasksCompleted++;
            }
            current = current.next;
        }
        if (this.size == 0) {
            this.status = this.getStatus();
            this.progress = 0;
            console.log("progress: " + this.progress);
            return this.progress;
        }
        else {
            this.status = this.getStatus();
            this.progress = Math.ceil((tasksCompleted / this.size) * 100);
            console.log("progress: " + this.progress);
            return this.progress;
        }
    }

    getStatus() {
        if (this.progress < 20) {
            return "Getting Started";
        }
        else if (this.progress < 70) {
            return "Active";
        }
        else if (this.progress < 100) {
            return "Almost Done";
        }
        else {
            return "Completed";
        }
    }

    print() {
        let current = this.head;
        console.log("[");
        while (current !== null) {
            console.log(current.task);
            current = current.next;
        }
        console.log("]");
    }
}

export { ToDo };