export default function AlertPanel({ alerts, timestamp }) {

    const currentTime = new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

    return (

        <div className="rounded-2xl border border-red-200 bg-white shadow my-5">

            <div className="flex items-center justify-between border-b p-5">

                <div>

                    <h2 className="text-xl font-bold">
                        Alerts
                    </h2>

                    <p className="text-sm text-gray-500">
                        Office monitoring notifications
                    </p>

                </div>

                <div className="flex items-center gap-5">

                    <div className="text-right">

                        <p className="text-xs uppercase tracking-wide text-gray-400">
                            Office Time
                        </p>

                        <p className="font-mono text-xl font-bold">
                            🕒 {currentTime}
                        </p>

                    </div>

                    <div
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                            alerts.length === 0
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }`}
                    >
                        {alerts.length} Active
                    </div>

                </div>

            </div>

            <div className="max-h-96 space-y-4 overflow-y-auto p-5">

                {

                    alerts.length === 0 ? (

                        <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">

                            <div className="mb-2 text-4xl">
                                ✅
                            </div>

                            <h3 className="font-semibold text-green-700">
                                Everything looks good
                            </h3>

                            <p className="mt-1 text-sm text-green-600">
                                No active alerts.
                            </p>

                        </div>

                    ) : (

                        alerts.map(alert => (

                            <div
                                key={alert.id}
                                className="rounded-xl border border-red-200 bg-red-50 p-4 transition hover:shadow-md"
                            >

                                <div className="flex items-start justify-between">

                                    <div>

                                        <div className="mb-2 flex items-center gap-2">

                                            <span className="text-xl">
                                                ⚠️
                                            </span>

                                            <h3 className="font-semibold text-red-700">
                                                After Hours Activity
                                            </h3>

                                        </div>

                                        <p className="text-sm text-gray-700">
                                            {alert.message}
                                        </p>

                                    </div>

                                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase text-red-700">
                                        Warning
                                    </span>

                                </div>

                                <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">

                                    <span className="rounded bg-gray-100 px-2 py-1">
                                        📍 {alert.room}
                                    </span>

                                    <span className="rounded bg-gray-100 px-2 py-1">
                                        💡 {alert.device}
                                    </span>

                                </div>

                            </div>

                        ))

                    )

                }

            </div>

        </div>

    );

}