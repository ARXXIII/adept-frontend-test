import { FaArrowCircleDown, FaGithub, FaTelegram } from "react-icons/fa"

export const Header = () => {
    return (
        <header className="flex justify-between items-center gap-x-24 sticky top-0 px-4 lg:px-60 py-2 lg:py-4 text-white border-b border-b-gray-500 bg-neutral-950">
            <h1 className="font-bold lg:text-2xl">ARXXIII</h1>
            <nav className="flex items-center gap-x-8">
                <a href="/resume.pdf" title="Resume" download>
                    <FaArrowCircleDown className="size-6 lg:size-8" />
                </a>
                <a href="https://github.com/ARXXIII/adept-frontend-test" title="GitHub" target="_blank">
                    <FaGithub className="size-6 lg:size-8" />
                </a>
                <a href="https://t.me/arxxiii" title="Telegram" target="_blank">
                    <FaTelegram className="size-6 lg:size-8" />
                </a>
            </nav>
        </header>
    )
}