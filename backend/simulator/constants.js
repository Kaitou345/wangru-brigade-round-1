const DRAWING = "Drawing Room"
const ROOM_1 = "Work Room 1"
const ROOM_2 = "Work Room 2"

const ROOMS = [
    DRAWING,
    ROOM_1,
    ROOM_2
];

const DEVICE_TEMPLATE = [
    {
        type: "fan",
        count: 2,
        watt: 80
    },
    {
        type: "light",
        count: 3,
        watt: 15
    }
];

module.exports = {
    ROOMS,
    DEVICE_TEMPLATE, 
    DRAWING,
    ROOM_1,
    ROOM_2
};