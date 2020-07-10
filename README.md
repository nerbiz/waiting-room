# Waiting Room

### A simple semaphore for JavaScript

### Usage

```js
import WaitingRoom from 'path/to/WaitingRoom.js';

// Create a semaphore with 1 slot (default slot amount)
const waitingRoom = new WaitingRoom();

// Or create a semaphore with 3 slots
const waitingRoom = new WaitingRoom(3);

// Add an action to the queue
waitingRoom.enqueue(() => {
    // If the action is asynchronous, return the promise
    // Or there will be no way to check if the action is done
    return yourAsyncFunction();
});

waitingRoom.enqueue(() => {
    // Synchronous calls don't require a return statement
    doSomething();
});

// The queue will then be handled internally
// No need to trigger it manually
````

You can also have a look at the example, included in this package.

### License

This project is released under the [The Unlicense]('http://unlicense.org/'), which means it's placed in the public domain.
