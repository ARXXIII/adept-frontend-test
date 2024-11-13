type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
}

export const Button = ({ children, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} className="p-2 text-center">{children}</button>
    )
}