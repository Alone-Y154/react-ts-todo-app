import moonIcon from '../assets/icon-moon.svg'

const Theme = () => {
    return(
        <div className="flex w-[327px] items-center justify-between mt-10 mb-6">
            <p className='text-white text-[25px] font-bold tracking-[15px]'>TODO</p>
            <img src={moonIcon} alt='moon'/>
        </div>
    )
}

export default Theme;