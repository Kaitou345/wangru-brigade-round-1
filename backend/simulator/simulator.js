const EventEmitter = require("events");
const state = require("./state");
const { ROOMS, DEVICE_TEMPLATE } = require("./constants");

const INTERVAL_MS = 1000;
const PER_TICK_MIN = 30;

const OFFICE_START = 9;
const OFFICE_END = 17;

class Simulator extends EventEmitter {

    constructor() {

        super();

        this.interval = null;

        // Simulation starts at 9:00 AM
        this.time = new Date();
        this.time.setHours(OFFICE_START, 0, 0, 0);
        this.lastAlertHour = null;
    }

    start(interval = INTERVAL_MS) {

        // Prevent multiple timers
        if (this.interval) {
            this.stop();
        }

        this.#initialize();

        // Send initial state immediately
        this.emit("update", this.getState());

        this.interval = setInterval(() => {
            this.#tick();
        }, interval);

    }

    stop() {

        if (this.interval) {

            clearInterval(this.interval);
            this.interval = null;

        }

    }

    #initialize() {

        state.devices = [];

        for (const room of ROOMS) {

            for (const template of DEVICE_TEMPLATE) {

                for (let i = 1; i <= template.count; i++) {

                    state.devices.push({

                        id: `${room}-${template.type}-${i}`
                            .toLowerCase()
                            .replace(/\s+/g, "-"),

                        room,

                        type: template.type,

                        name: `${template.type} ${i}`,

                        status: Math.random() > 0.5,

                        watt: template.watt,

                        lastChanged: new Date(this.time)

                    });

                }

            }

        }

    }

    #tick() {

        // Advance simulated time
        this.time.setMinutes(
            this.time.getMinutes() + PER_TICK_MIN
        );

        // Randomly toggle 1–3 devices
        const changes = Math.floor(Math.random() * 3) + 1;

        for (let i = 0; i < changes; i++) {

            const index = Math.floor(
                Math.random() * state.devices.length
            );

            const device = state.devices[index];

            device.status = !device.status;
            device.lastChanged = new Date(this.time);

        }

        const hour = this.time.getHours();

        const afterHours =
            hour < OFFICE_START || hour >= OFFICE_END;

        const alerts = this.getAlerts();

        if (
            afterHours &&
            alerts.length > 0 &&
            this.lastAlertHour !== hour
        ) {

            this.lastAlertHour = hour;

            this.emit("after-hours-alert", {
                hour,
                alerts
            });

        }

        if (!afterHours || alerts.length === 0) {
            this.lastAlertHour = null;
        }

        this.emit("update", this.getState());
    }

    #getRoomSummary() {

        const summary = {};

        for (const room of ROOMS) {

            const devices = state.devices.filter(
                device => device.room === room
            );

            summary[room] = {

                fansOn: devices.filter(
                    d => d.type === "fan" && d.status
                ).length,

                lightsOn: devices.filter(
                    d => d.type === "light" && d.status
                ).length,

                power: devices
                    .filter(d => d.status)
                    .reduce(
                        (sum, device) => sum + device.watt,
                        0
                    )

            };

        }

        return summary;

    }

    #getTotalPower() {

        return state.devices
            .filter(device => device.status)
            .reduce(
                (sum, device) => sum + device.watt,
                0
            );

    }

    getState() {

        return {

            timestamp: this.time.toISOString(),

            devices: structuredClone(state.devices),

            rooms: this.#getRoomSummary(),

            alerts: this.getAlerts()

        };

    }

    getTime() {

        return new Date(this.time);

    }

    getRoom(roomName) {

        return state.devices.filter(
            device => device.room === roomName
        );

    }

    getUsage() {

        return {

            totalPower: this.#getTotalPower(),

            totalDevices: state.devices.length,

            activeDevices: state.devices.filter(
                device => device.status
            ).length,

            roomBreakdown: this.#getRoomSummary()

        };

    }

    getAlerts() {

        const alerts = [];

        const hour = this.time.getHours();

        const afterHours =
            hour < OFFICE_START || hour >= OFFICE_END;

        if (!afterHours) {
            return alerts;
        }

        const activeDevices = state.devices.filter(
            device => device.status
        );

        for (const device of activeDevices) {

            alerts.push({

                id: `${device.id}-after-hours`,

                type: "after_hours",

                severity: "warning",

                room: device.room,

                device: device.name,

                message: `${device.name} in ${device.room} is still ON after office hours.`,

                timestamp: this.time.toISOString()

            });

        }

        return alerts;

    }
}

module.exports = new Simulator();