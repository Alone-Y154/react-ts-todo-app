import { Link } from "react-router-dom";

const Status = () => {
    return (
        <div className="flex gap-5 flex-row text-[#9495A5] text-sm font-bold leading-normal tracking-[-0.194px] mb-4 bg-white h-12 overflow-hidden rounded-[5px] shadow-[0px_35px_50px_-15px_rgba(194,195,214,0.50)] w-[327px]  justify-center items-center">
            <Link to="/">All</Link>
            <Link to="/?todo=active">Active</Link>
            <Link to="/?todo=completed">Completed</Link>
        </div>
    )
}

export default Status;