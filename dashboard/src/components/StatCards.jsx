export default function StatCards({ state }) {

    const totalPower = state.devices
        .filter(d => d.status)
        .reduce((sum, d) => sum + d.watt, 0);

    const activeDevices = state.devices.filter(d => d.status).length;

    return (

        <div className="mb-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-xl bg-white p-6 shadow">

                <p className="text-gray-500">

                    Total Power

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                    {totalPower} W

                </h2>

            </div>

            <div className="rounded-xl bg-white p-6 shadow">

                <p className="text-gray-500">

                    Active Devices

                </p>

                <h2 className="mt-2 text-4xl font-bold">

                    {activeDevices}

                </h2>

            </div>

        </div>

    );

}