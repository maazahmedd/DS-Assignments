/**
 * Linked List Visualizer
 * Interactive visualization of singly linked list operations
 */

// Node class for the linked list
class ListNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Singly Linked List implementation
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    isEmpty() {
        return this.size === 0;
    }

    addFirst(data) {
        const newNode = new ListNode(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.size++;
        return true;
    }

    addLast(data) {
        const newNode = new ListNode(data);

        if (this.isEmpty()) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }

        this.size++;
        return true;
    }

    insertAt(position, data) {
        if (position < 0 || position > this.size) {
            return false;
        }

        if (position === 0) {
            return this.addFirst(data);
        }

        if (position === this.size) {
            return this.addLast(data);
        }

        const newNode = new ListNode(data);
        let current = this.head;

        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
        this.size++;

        return true;
    }

    removeFirst() {
        if (this.isEmpty()) {
            return null;
        }

        const data = this.head.data;
        this.head = this.head.next;
        this.size--;

        if (this.isEmpty()) {
            this.tail = null;
        }

        return data;
    }

    removeLast() {
        if (this.isEmpty()) {
            return null;
        }

        if (this.size === 1) {
            return this.removeFirst();
        }

        let current = this.head;
        while (current.next !== this.tail) {
            current = current.next;
        }

        const data = this.tail.data;
        current.next = null;
        this.tail = current;
        this.size--;

        return data;
    }

    removeAt(position) {
        if (position < 0 || position >= this.size) {
            return null;
        }

        if (position === 0) {
            return this.removeFirst();
        }

        let current = this.head;
        for (let i = 0; i < position - 1; i++) {
            current = current.next;
        }

        const data = current.next.data;
        current.next = current.next.next;

        if (position === this.size - 1) {
            this.tail = current;
        }

        this.size--;
        return data;
    }

    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    toArray() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }

        return result;
    }

    getHead() {
        return this.head ? this.head.data : null;
    }

    getTail() {
        return this.tail ? this.tail.data : null;
    }
}

// Visualizer class
class LinkedListVisualizer {
    constructor(container) {
        this.container = container;
        this.list = new LinkedList();
        this.logContainer = document.getElementById('operation-log');
    }

    render() {
        this.container.innerHTML = '';

        if (this.list.isEmpty()) {
            this.container.innerHTML = '<span class="empty-message">List is empty. Add some elements!</span>';
            this.updateStats();
            return;
        }

        const nodeContainer = document.createElement('div');
        nodeContainer.className = 'node-container';

        let current = this.list.head;
        let index = 0;

        while (current) {
            // Create node element
            const nodeEl = document.createElement('div');
            nodeEl.className = 'node';
            nodeEl.dataset.index = index;

            const nodeBox = document.createElement('div');
            nodeBox.className = 'node-box';

            const nodeData = document.createElement('div');
            nodeData.className = 'node-data';
            nodeData.textContent = current.data;

            const nodePointer = document.createElement('div');
            nodePointer.className = 'node-pointer';
            nodePointer.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                </svg>
            `;

            nodeBox.appendChild(nodeData);
            nodeBox.appendChild(nodePointer);
            nodeEl.appendChild(nodeBox);

            // Add label for head/tail
            const label = document.createElement('div');
            label.className = 'node-label';

            if (current === this.list.head && current === this.list.tail) {
                label.textContent = 'head / tail';
            } else if (current === this.list.head) {
                label.textContent = 'head';
            } else if (current === this.list.tail) {
                label.textContent = 'tail';
            }

            if (label.textContent) {
                nodeEl.appendChild(label);
            }

            nodeContainer.appendChild(nodeEl);

            // Add arrow if not the last node
            if (current.next) {
                const arrow = document.createElement('div');
                arrow.className = 'pointer-arrow';
                nodeContainer.appendChild(arrow);
            }

            current = current.next;
            index++;
        }

        // Add null terminator
        const nullNode = document.createElement('div');
        nullNode.className = 'node';

        const arrow = document.createElement('div');
        arrow.className = 'pointer-arrow';
        nodeContainer.appendChild(arrow);

        const nullBox = document.createElement('div');
        nullBox.className = 'null-node';
        nullBox.textContent = 'null';
        nullNode.appendChild(nullBox);
        nodeContainer.appendChild(nullNode);

        this.container.appendChild(nodeContainer);
        this.updateStats();
    }

    highlightNode(index, duration = 500) {
        const nodes = this.container.querySelectorAll('.node');
        if (nodes[index]) {
            nodes[index].classList.add('highlight');
            setTimeout(() => {
                nodes[index].classList.remove('highlight');
            }, duration);
        }
    }

    updateStats() {
        document.getElementById('stat-size').textContent = this.list.size;
        document.getElementById('stat-head').textContent = this.list.getHead() ?? '-';
        document.getElementById('stat-tail').textContent = this.list.getTail() ?? '-';
    }

    log(operation, details) {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `<span class="operation">${operation}</span> ${details}`;

        // Remove the initial message if it exists
        const initialMessage = this.logContainer.querySelector('.log-entry');
        if (initialMessage && initialMessage.textContent.includes('Ready to perform')) {
            initialMessage.remove();
        }

        this.logContainer.insertBefore(entry, this.logContainer.firstChild);

        // Keep only last 20 entries
        while (this.logContainer.children.length > 20) {
            this.logContainer.removeChild(this.logContainer.lastChild);
        }
    }

    addFirst(value) {
        if (value === null || value === undefined || value === '') {
            this.log('Error', 'Please enter a value');
            return;
        }

        this.list.addFirst(value);
        this.render();
        this.highlightNode(0);
        this.log('addFirst', `Added <span class="value">${value}</span> at the beginning`);
    }

    addLast(value) {
        if (value === null || value === undefined || value === '') {
            this.log('Error', 'Please enter a value');
            return;
        }

        this.list.addLast(value);
        this.render();
        this.highlightNode(this.list.size - 1);
        this.log('addLast', `Added <span class="value">${value}</span> at the end`);
    }

    insertAt(position, value) {
        if (value === null || value === undefined || value === '') {
            this.log('Error', 'Please enter a value');
            return;
        }

        if (position < 0 || position > this.list.size) {
            this.log('Error', `Invalid position: ${position}. Valid range: 0-${this.list.size}`);
            return;
        }

        this.list.insertAt(position, value);
        this.render();
        this.highlightNode(position);
        this.log('insertAt', `Inserted <span class="value">${value}</span> at position ${position}`);
    }

    removeFirst() {
        if (this.list.isEmpty()) {
            this.log('Error', 'List is empty');
            return;
        }

        const removed = this.list.removeFirst();
        this.render();
        this.log('removeFirst', `Removed <span class="value">${removed}</span> from the beginning`);
    }

    removeLast() {
        if (this.list.isEmpty()) {
            this.log('Error', 'List is empty');
            return;
        }

        const removed = this.list.removeLast();
        this.render();
        this.log('removeLast', `Removed <span class="value">${removed}</span> from the end`);
    }

    removeAt(position) {
        if (position < 0 || position >= this.list.size) {
            this.log('Error', `Invalid position: ${position}. Valid range: 0-${this.list.size - 1}`);
            return;
        }

        const removed = this.list.removeAt(position);
        this.render();
        this.log('removeAt', `Removed <span class="value">${removed}</span> from position ${position}`);
    }

    clear() {
        this.list.clear();
        this.render();
        this.log('clear', 'Cleared all elements from the list');
    }

    generateRandom() {
        this.list.clear();
        const count = Math.floor(Math.random() * 5) + 3; // 3-7 elements

        for (let i = 0; i < count; i++) {
            const value = Math.floor(Math.random() * 100);
            this.list.addLast(value);
        }

        this.render();
        this.log('random', `Generated list with ${count} random elements`);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('linkedlist-viz');
    const visualizer = new LinkedListVisualizer(container);
    visualizer.render();

    // Add First
    document.getElementById('add-first-btn').addEventListener('click', () => {
        const value = document.getElementById('input-value').value;
        visualizer.addFirst(parseInt(value) || value);
        document.getElementById('input-value').value = '';
    });

    // Add Last
    document.getElementById('add-last-btn').addEventListener('click', () => {
        const value = document.getElementById('input-value-last').value;
        visualizer.addLast(parseInt(value) || value);
        document.getElementById('input-value-last').value = '';
    });

    // Insert At
    document.getElementById('insert-btn').addEventListener('click', () => {
        const position = parseInt(document.getElementById('input-position').value);
        const value = document.getElementById('input-value-pos').value;
        visualizer.insertAt(position, parseInt(value) || value);
        document.getElementById('input-position').value = '';
        document.getElementById('input-value-pos').value = '';
    });

    // Remove First
    document.getElementById('remove-first-btn').addEventListener('click', () => {
        visualizer.removeFirst();
    });

    // Remove Last
    document.getElementById('remove-last-btn').addEventListener('click', () => {
        visualizer.removeLast();
    });

    // Remove At
    document.getElementById('remove-at-btn').addEventListener('click', () => {
        const position = parseInt(document.getElementById('remove-position').value);
        visualizer.removeAt(position);
        document.getElementById('remove-position').value = '';
    });

    // Clear
    document.getElementById('clear-btn').addEventListener('click', () => {
        visualizer.clear();
    });

    // Random
    document.getElementById('random-btn').addEventListener('click', () => {
        visualizer.generateRandom();
    });

    // Handle Enter key on inputs
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const btn = input.parentElement.querySelector('.btn');
                if (btn) btn.click();
            }
        });
    });
});
