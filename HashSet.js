// Same functionality as HashMap but storing keys only (no values) in linked list format

class node {
    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
};

class linkedList {
    constructor() {
        this.head = null;
    };

    append(value) {
        // adds new node at end of list
        if (!this.head) {
            this.head = new node(value);
            return this;
        };
        let tail = this.getTail();
        tail.next = new node(value);
        return tail.next;
    };     

    prepend(value) {
        //adds new node to beginning of the list
        if (this.head === null) {
            this.head = new node(value);
            return this;
        }
        const oldHead = this.head;
        this.head = new node(value, oldHead)
    };

    size() {
        //returns the total number of nodes in the list
        let nodeCount = 0;
        let counter = this.head;

        while (counter !== null) {
            nodeCount++
            counter = counter.next;
        }
        return nodeCount
    };

    getHead() {
        // returns the first node in the list
        if (!this.head) return null;
        return this.head;
    };

    getTail() {
        //returns the last node in the list
        if (!this.head) return null;

        let tail = this.head;

        while (tail.next !== null) {
            tail = tail.next;
        }
        return tail;
    };

    at(index) {
        //returns the module at given index
        if (index < 0 || index >= this.size()) return null;

        let counter = 0;
        let currentNode = this.head;

        while (currentNode !== null && counter < index) {
            currentNode = currentNode.next;
            counter++;
        }
        return currentNode ? currentNode : null;
    };

    pop() {
        //removes the last element from the list - returns new list
        if (!this.head) return null;

        let current = this.head;
        let previous = null;

        while (current.next !== null) {
            previous = current;
            current = current.next
        }

        if (previous === null) {
            this.head = null;
            this.tail = null;
        } else {
            previous.next = null;
            this.tail = previous
        }
        return this;
    };
    

    find(value) {
        // returns true if value is present in Linkedlist, otherwise returns false
        if (!this.head) return null;

        let currentNode = this.head;

        while (currentNode !== null) {
            if (currentNode.value === value) {
                return true;
                }    else currentNode = currentNode.next
        };
        return false;
    };

    toString() {
        //returns entire linkList in string format "(value) -> (value) ->..."
        if (!this.head) return "null";
        
        let output = "";
        let currentNode = this.head;

        while (currentNode.next !== null) {
            output = `${output} ( ${currentNode.value} ) ->`;
            currentNode = currentNode.next; 
        }
        
        return `${output}` + ` ( ${currentNode.value} )` + " -> null";
    };
        
    insertAt(value, index) {
        //inserts a new node with provided value at given index (shifts old node to index+1)
        if  (index < 0 || index > this.size()) return "invalid index";

        if (index === 0) {
            this.prepend(value);
            return "insertAt prepend condition";
        };

        if (index === this.size()) {
            this.append(value);
            return "insertAt append condition";
        };

        let currentNode = this.head;
        let counter = 0;

        while (currentNode !== null && counter < index-1) {
            currentNode = currentNode.next;
            counter++;
        };

        const newNode = new node(value);
        newNode.next = currentNode.next;
        currentNode.next = newNode;

        return `insertAt index ${index} complete`
    };


    removeAt(index) {
        //removes the node at given index
        if (index < 0 || index >= this.size()) return null;

        if (index === 0) {
            this.head = this.head.next;
            return "head removed"
        };

        let counter = 0;
        let currentNode = this.head;

        while (currentNode !== null && counter < (index -1)) {
            currentNode = currentNode.next;
            counter++;
        }
        currentNode.next =  currentNode.next.next
        return `node at index ${index} removed`
    };

};

class HashSet {
    constructor(initialLength = 16) {
        this.mapArray = new Array(initialLength);
        this.size = 0;
    }

    _hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % (this.mapArray.length);
        }
    
        return hashCode;
    }

    set(key) {
        // adds new key to linkedList if key does not already exist in target linkList
        const index = this._hash(key);

        if (this.mapArray[index] === undefined) {
            let bucket = new linkedList();
            bucket.append(key);
            this.mapArray[index] = bucket;
            this.size++;
        }
        else {
            let collision = true;

            let currentNode = this.mapArray[index].head;
            while (currentNode !== null) {
                if(currentNode.value === key) {
                    collision = false;
                    break;
                } else {
                    currentNode = currentNode.next;
                }
            }
            if (collision) {
                this.mapArray[index].append(key);
                this.size++;
            }

        }
        if (this.size / this.mapArray.length > 0.75) {
            this.grow(this.mapArray.length * 2);
        }
    }

    get(key) {
        // return found if key exists in HashSet; if not, return null
        const index = this._hash(key);

        if (this.mapArray[index] === undefined) return false;

        const result = this.mapArray[index].find(key)? key : false;
        return result;
    }

    has(key) {
        //returns true if key exists in HashSet, else returns false
        const index = this._hash(key);

        if (this.mapArray[index] === undefined) return false;
        return this.mapArray[index].find(key);
    }

    remove(key) {
        //if key exists in HashSet it removes that key and returns true, else returns false
        const index = this._hash(key);

        if (this.mapArray[index] === undefined) return false;

        let currentNode = this.mapArray[index].head;
        let counter = 0;

        while (currentNode !== null) {  
            if(currentNode.value === key) {
                this.mapArray[index].removeAt(counter);
                this.size--
                return true
            } else {
                currentNode = currentNode.next
                counter++    
            }
        }
        return false
    }

    length() {
        // return the number of stored keys in the hash map
        return this.size
    }

    clear() {
        // remove all entries in the hash map
        this.mapArray = new Array(16);
        this.size = 0;
        console.log('cleared');
    }

    keys() {
        // return an array containing all the keys inside the hash map
        let keys = [];
        //let currentNode;

        for (let i = 0; i < this.mapArray.length; i++) {
            if (this.mapArray[i]) {
                let currentNode = this.mapArray[i].head

                keys.push(currentNode.value);

                while (currentNode.next !== null) {
                    currentNode = currentNode.next;
                    keys.push(currentNode.value);
                }

            }
        }
        return keys;
    }

    grow(newCapacity){
        //clones mapArray into new mapArray with twice the buckets

        const tempArray = this.mapArray.flat();
        this.mapArray = new Array(newCapacity);
        this.size = 0;

        for (let i = 0; i < tempArray.length; i++) {
                let currentNode = tempArray[i].head

                this.set(currentNode.value);

                while (currentNode.next !== null) {
                    currentNode = currentNode.next;
                    this.set(currentNode.value);
                }
            }
        console.log(`total buckets increased to ${this.mapArray.length}`);  
    }
}
