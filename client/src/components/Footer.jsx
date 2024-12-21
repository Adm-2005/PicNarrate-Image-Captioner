import { Link } from "react-router-dom";
import { MdOutlineImageSearch } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="flex flex-col bg-foreground w-full">
            <div className="flex flex-col gap-6 w-full lg:w-[90vw] py-4 px-4 lg:px-[5vw] mx-auto">
                <div className="flex flex-col justify-center items-center gap-3">
                    <Link to="/">
                        <div className="flex gap-1 items-center">
                            <MdOutlineImageSearch className="w-[35px] h-[35px] text-background" />
                            <h1 className="text-background text-xl font-bold font-poppins">PicNarrate</h1>
                        </div>
                    </Link>
                    <p className="max-w-md text-background font-poppins text-center">
                        Discover the stories behind your images with PicNarrate. Transform your visuals into meaningful captions effortlessly. Let every picture tell its tale!
                    </p>
                </div>
                
                <p className="font-poppins text-background mx-auto">
                    &copy; All rights reserved. 
                    <Link 
                        to="https://akshatmishra.onrender.com" 
                        className="text-blue-300 hover:text-blue-500"
                    >
                        Akshat Mishra
                    </Link>
                </p>
            </div>
        </footer>
    )
}

export default Footer;