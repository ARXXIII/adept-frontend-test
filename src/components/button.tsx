import clsx from "clsx"

type ButtonProps = {
    children: React.ReactNode
    type?: 'button' | 'submit'
    variant?: 'delete' | 'add'
    onClick?: () => void
}

export const Button = ({ children, type, variant, onClick }: ButtonProps) => {
    return (
        <button
            type={type || 'button'}
            onClick={onClick}
            className={clsx("px-4 py-2 h-10 text-center text-sm hover:text-white border rounded-xl transition-all",
                variant === 'add' && 'text-white border-green-500 bg-green-500',
                variant === 'delete' && 'text-white border-red-500 bg-red-500'
            )}
        >
            {children}
        </button>
    )
}