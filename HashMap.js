class hashMap {
    constructor(buckets = 16) {
        this.mapArray = new Array(buckets);
        this.size = 0
    }

    _hash(key) {
        let hashCode = 0;
        const primeNumber = 31;

        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % (this.mapArray.length);
        }
    
        return hashCode;
    }

    set(key, value) {
        // if key already exists overwrite old value with new value

        const hashedKey = this._hash(key);
        
        if (this.mapArray[hashedKey]) {
            for (let i = 0; i < this.mapArray[hashedKey].length; i++) {
                if (this.mapArray[hashedKey][i][0] === key) {
                    this.mapArray[hashedKey][i][1] = value;
                    return;
                }
            }
            this.mapArray[hashedKey].push([key, value]);   
        } else {
            this.mapArray[hashedKey] = [];
            this.mapArray[hashedKey].push([key, value]);
        }
        this.size++;
        if (this.size / this.mapArray.length > 0.75) {
            this.grow(this.mapArray.length * 2);
        }   
    }

    get(key) { 
        // return value of provided key

        const hashedKey = this._hash(key);
        if (this.mapArray[hashedKey]) {
            for (let i = 0; i < this.mapArray[hashedKey].length; i++) {
                if (this.mapArray[hashedKey][i][0] === key) {
                    return this.mapArray[hashedKey][i][1];   
                }
            }
        }
        return null;
    }

    has(key) { //
        // return true if key exists in hashmap, else return false

        const hashedKey = this._hash(key);
        if (this.mapArray[hashedKey] === undefined) return false;
        
        //loop through bucket if it exists

        for (let i = 0; i < this.mapArray[hashedKey].length; i++) {
            if (this.mapArray[hashedKey][i].includes(key)) return true;
        } return false;
    }

    remove(key) {
        // return true and remove entry if key exists in hashmap, otherwise return false

        const hashedKey = this._hash(key);
        if (typeof this.mapArray[hashedKey] === 'undefined') return false;
        for (let i = 0; i < this.mapArray[hashedKey].length; i++) {
            if (this.mapArray[hashedKey][i][0] === key) {
                this.mapArray[hashedKey].splice(i,1);
                this.size--;
                return true;
            }
        }
    }

    length() {
        // return the number of stored keys in the hash map
        return this.size;
    }

    clear() {
        // remove all entries in the hash map
        
        this.mapArray = new Array(16);
        this.size = 0;
        console.log('cleared');
    }

    keys() {
        // return an array containing all the keys inside the hash map

        let keysArray = [];
            for (let i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] !== undefined) {
                    for (let j = 0; j < this.mapArray[i].length; j++) {
                    keysArray = keysArray.concat(this.mapArray[i][j][0])
                    }
                }
            }
        return keysArray;
    } 

    values() {
        // return an array containing all the values

        let valuesArray = [];
            for (let i = 0; i < this.mapArray.length; i++) {
                if (this.mapArray[i] !== undefined) {
                    for (let j = 0; j < this.mapArray[i].length; j++) {
                    valuesArray = valuesArray.concat(this.mapArray[i][j][1])
                    }
                }
            }
        return valuesArray;
    }

    entries() {
        //returns an array that contains each key, value pair

        let flatArray = [];

        flatArray = this.mapArray.flat(1);
        console.log (flatArray);
    }

    grow(newCapacity){
        //clones mapArray into new mapArray with twice the buckets

        const tempArray = this.mapArray.flat(1);
        this.mapArray = new Array(newCapacity);
        this.size = 0;

        for (let i = 0; i < tempArray.length; i++) {
                this.set(tempArray[i][0], tempArray[i][1]); 
        }
        console.log(`total buckets increased to ${this.mapArray.length}`);  
    }   
}
