import clsx from "clsx"

type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'delete' | 'add'
    className?: string
    onClick?: () => void
}

export const Button = ({ children, type, variant, className, onClick }: ButtonProps) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={clsx("px-4 py-2 text-center text-sm rounded-md shrink-0 transition-colors",
                variant === 'add' && ' font-semibold bg-green-500 hover:bg-green-400',
                variant === 'delete' && 'font-semibold bg-red-600 hover:bg-red-500',
                className && className
            )}
        >
            {children}
        </button>
    )
}