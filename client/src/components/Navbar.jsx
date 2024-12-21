import { Link } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="flex justify-between bg-background w-full lg:w-[90vw] px-4 py-4 lg:px-[5vw] mx-auto">
            <div className="flex justify-center items-center gap-1">
                <Link 
                    to="/"
                    className="flex gap-1 items-center"
                >
                    <MdOutlineImageSearch className="w-[35px] h-[35px] text-foreground" />
                    <h1 className="text-foreground text-lg md:text-xl font-bold font-poppins">PicNarrate</h1>
                </Link>
            </div>

            <Link to="/">
                <button
                    type="button"
                    className="bg-background hover:bg-foreground text-foreground hover:text-background border-2 border-foreground text-lg md:text-xl px-3 py-2 rounded-md font-poppins font-semibold transition-colors duration-300"
                >
                    Get Caption
                </button>
            </Link>
        </nav>
    )
}

export default Navbar;