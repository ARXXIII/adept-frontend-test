import clsx from "clsx"

type InputProps = {
    value: string
    className?: string
    placeholder?: string
    type?: 'text' | 'number' | 'checkbox'
    readOnly?: boolean
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, type, placeholder, readOnly, className, onChange }: InputProps) => {
    return (
        <input
            type={type || 'text'}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={clsx("px-4 py-2 w-full text-sm text-white border border-gray-500 rounded-md bg-neutral-950",
                className && className
            )}
            readOnly={readOnly}
        />
    )
}