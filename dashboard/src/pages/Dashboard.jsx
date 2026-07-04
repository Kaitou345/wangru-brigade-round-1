import { useEffect, useState } from "react";
import socket from "../api/socket";

import Header from "../components/Header";
import StatCards from "../components/StatCards";
import RoomGrid from "../components/RoomGrid";

export default function Dashboard() {

    const [state, setState] = useState(null);

    useEffect(() => {

        socket.on("office:update", data => {

            console.log(data);

            setState(data);

        });

        return () => {

            socket.off("office:update");

        };

    }, []);

    if (!state) {

        return (

            <div className="flex h-screen items-center justify-center text-2xl">

                Connecting...

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-slate-100">

            <Header />

            <div className="mx-auto max-w-7xl p-8">

                <StatCards state={state} />

                <RoomGrid state={state} />

            </div>

        </div>

    );

}