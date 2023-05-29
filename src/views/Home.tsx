import React from "react";
import DaiTable from "../components/DaiTable";

const Home = () => {
    return (
        <div
            className="bg-transparent font-[Helvetica] overflow-auto
                       mt-8
                       md:mt-12 md:flex md: flex-col md:items-center"
        >
            <div
                className="absolute top-0 w-full h-full -z-10"
                style={{
                    background: `radial-gradient(30% 30% at 25% 5%, #f6edfc, transparent),
                    radial-gradient(30% 20% at 55% 0%, #f0ebf7, transparent),
                    radial-gradient(20% 15% at 80% 0%, #ebfff0, transparent),
                    radial-gradient(10% 10% at 85% 0%, #FBFFF5, transparent)`,
                }}
            />
            <div className="p-2 max-md:pl-6 font-[Inter] text-2xl ">
                Dai Transfer Watcher
            </div>
            <DaiTable />
        </div>
    );
};

export default Home;
