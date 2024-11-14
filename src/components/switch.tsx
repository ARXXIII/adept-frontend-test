import clsx from "clsx"
import { useState } from "react"

type SwitchProps = {
    id?: string
    onClick: () => void
}

export const Switch = ({ id, onClick }: SwitchProps) => {
    const [isSwitched, setIsSwitched] = useState<boolean>(false)

    const handleClick = () => {
        setIsSwitched(!isSwitched)
        onClick()
    }

    return (
        <button id={id} onClick={handleClick} className={clsx("inline-flex items-center w-10 h-5 rounded-full transition-colors",
            !isSwitched && 'bg-red-600',
            isSwitched && 'bg-green-500'
        )}>
            <div className={clsx('size-4 rounded-full bg-neutral-950 focus:outline-none transition-transform',
                !isSwitched && 'translate-x-0.5',
                isSwitched && 'translate-x-[22px]'
            )} />
        </button>
    )
}