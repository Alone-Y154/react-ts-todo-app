import { useState } from "react";
import { Link } from "react-router-dom";

const Status = () => {

    const [all,setAll] = useState<boolean>(true);
    const [active,setActive] = useState<boolean>(false);
    const [completed,setCompleted] = useState<boolean>(false);

    const handleStatus = (status:string):void => {
        setAll(status==="all")
        setActive(status==="active")
        setCompleted(status==="completed")
    }
    return (
        <div className="flex dark:text-[#5B5E7E] gap-5 dark:bg-[#25273D] flex-row text-[#9495A5] text-sm font-bold leading-normal tracking-[-0.194px] md:hidden mb-4 bg-white h-12 overflow-hidden rounded-[5px] shadow-[0px_35px_50px_-15px_rgba(0, 0, 0, 0.50)]  w-[327px]  justify-center items-center">
            <Link onClick={() => handleStatus("all")} className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${all ?"text-[#3A7CFD]" : ""}`} to="/">All</Link>
            <Link onClick={() => handleStatus("active")}  className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${active ?"text-[#3A7CFD]" : ""}`}  to="/?todo=active">Active</Link>
            <Link onClick={() => handleStatus("completed")}  className={`dark:hover:text-[#E3E4F1] hover:text-[#494C6B] cursor-pointer ${completed ?"text-[#3A7CFD]" : ""}`}  to="/?todo=completed">Completed</Link>
        </div>
    )
}

export default Status;