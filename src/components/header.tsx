import { FaGithub, FaTelegram } from "react-icons/fa"

export const Header = () => {
    return (
        <header className="flex justify-between items-center gap-x-24 sticky top-0 px-4 lg:px-60 py-4 text-white border-b border-b-gray-500 bg-neutral-950">
            <h1 className="font-bold text-2xl">ARXXIII</h1>
            <nav className="flex items-center gap-x-8">
                <a href="https://github.com/ARXXIII/adept-frontend-test" target="_blank">
                    <FaGithub className="size-6" />
                </a>
                <a href="https://t.me/arxxiii" target="_blank">
                    <FaTelegram className="size-6" />
                </a>
            </nav>
        </header>
    )
}