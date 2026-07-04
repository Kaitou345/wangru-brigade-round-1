export default function Header() {

    return (

        <header className="border-b bg-white">

            <div className="mx-auto flex max-w-7xl items-center justify-between p-6">

                <h1 className="text-3xl font-bold">

                    Office Dashboard

                </h1>

                <div className="flex items-center gap-2">

                    <div className="h-3 w-3 rounded-full bg-green-500"></div>

                    Live

                </div>

            </div>

        </header>

    );

}