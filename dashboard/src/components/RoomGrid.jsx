import RoomCard from "./RoomCard";

export default function RoomGrid({ state }) {

    const rooms = {};

    state.devices.forEach(device => {

        if (!rooms[device.room]) {

            rooms[device.room] = [];

        }

        rooms[device.room].push(device);

    });

    return (

        <div className="grid gap-6 md:grid-cols-3">

            {

                Object.entries(rooms).map(([room, devices]) => (

                    <RoomCard
                        key={room}
                        room={room}
                        devices={devices}
                    />

                ))

            }

        </div>

    );

}