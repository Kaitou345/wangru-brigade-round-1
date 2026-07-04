export default function RoomCard({ room, devices }) {

    const totalPower = devices
        .filter(device => device.status)
        .reduce((sum, device) => sum + device.watt, 0);

    const activeDevices = devices.filter(
        device => device.status
    ).length;

    return (

        <div className="rounded-xl bg-white p-6 shadow">

            <div className="mb-5 flex items-center justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {room}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {activeDevices} / {devices.length} devices active
                    </p>

                </div>

                <div className="text-right">

                    <p className="text-sm text-gray-500">
                        Current Power
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                        {totalPower} W
                    </p>

                </div>

            </div>

            <div className="space-y-3">

                {

                    devices.map(device => (

                        <div
                            key={device.id}
                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 transition hover:bg-gray-50"
                        >

                            <div>

                                <p className="font-medium capitalize">
                                    {device.name}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {device.type} • {device.watt} W
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-semibold text-white ${
                                    device.status
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            >
                                {device.status ? "ON" : "OFF"}
                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}