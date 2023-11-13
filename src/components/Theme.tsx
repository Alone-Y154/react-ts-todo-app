import { useState } from 'react'
import moonIcon from '../assets/icon-moon.svg'
import sunIcon from '../assets/icon-sun.svg'
import { useTodo } from '../context/TodoContext'

const Theme = () => {

    const {handleTheme} = useTodo()

    const [theme,setTheme] = useState(false);

    const toggleTheme = (theme:boolean):void=> {
        setTheme(!theme);
        handleTheme(theme);
    }
    return(
        <div className="flex w-[327px] md:w-[540px] items-center justify-between mt-10 mb-6 md:mt-16 md:mb-10">
            <p className='text-white text-[25px] md:text-[40px] font-bold tracking-[15px]'>TODO</p>
            <img className='cursor-pointer' onClick={()=> toggleTheme(theme)} src={theme ? sunIcon : moonIcon } alt='moon'/>
        </div>
    )
}

export default Theme;