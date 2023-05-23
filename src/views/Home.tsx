import React from "react";
import DaiTable from "../components/DaiTable";
import TopBg from "../assets/top_bg.png";

const Home = () => {
    return (
        <div
            className="bg-transparent font-[Helvetica] overflow-auto
                       mt-8
                       md:mt-12 md:flex md: flex-col md:items-center"
        >
            <img src={TopBg} alt="" className="absolute top-0 -z-10" />
            <div className="p-2 max-md:pl-6 font-[Inter] text-2xl ">
                Dai Transfer Watcher
            </div>
            <DaiTable />
        </div>
    );
};

export default Home;
