/**
 * @param slotAmount The amount of slots available in the semaphore
 * @constructor
 */
export default function(slotAmount = 1) {
    if ((typeof slotAmount).toLowerCase() !== 'number') {
        throw new Error(`Slot amount needs to be a number, got ${typeof slotAmount} instead`);
    }

    if (slotAmount < 1) {
        throw new Error(`Slot amount needs to be at least 1, ${slotAmount} given`);
    }

    /**
     * The amount of slots available
     * @type {number}
     * @private
     */
    const _slotAmount = slotAmount;

    /**
     * The amount of slots currently in use
     * @type {number}
     * @private
     */
    let _slotsInUse = 0;

    /**
     * The actions queue, as ticketNumber:action pairs
     * @type {Object}
     * @private
     */
    const _queue = {};

    /**
     * The counter for queue ticket numbers
     * @type {number}
     * @private
     */
    let _ticketCounter = 0;

    /**
     * The currently active ticket number
     * @type {number}
     * @private
     */
    let _currentTicketNumber = 0;

    /**
     * @param {function} action
     * @return {void}
     */
    this.enqueue = action => {
        if ((typeof action).toLowerCase() !== 'function') {
            throw new Error(`Expected a function, got ${typeof action} instead`);
        }

        _queue[++_ticketCounter] = action;
        _executeNext();
    };

    /**
     * Checks if a slot is available
     * @return {boolean}
     * @private
     */
    const _slotIsAvailable = () => (_slotsInUse < _slotAmount);

    /**
     * Handle the next action in the queue
     * @return {void}
     * @private
     */
    const _executeNext = async () => {
        // Return if no slot is available or no next action exists
        if (! _slotIsAvailable() || ! _queue[_currentTicketNumber + 1]) {
            return;
        }

        // Occupy a slot
        _slotsInUse++;

        // Execute, then remove the next action
        await _queue[++_currentTicketNumber]();
        _queue[_currentTicketNumber] = null;

        // Make the used slot available again
        _slotsInUse--;
        _executeNext();
    };
};
