import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { RxSpeakerLoud } from "react-icons/rx";
import ImgUpload from "../components/ImgUpload";

const Hero = () => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [caption, setCaption] = useState('');
    const [error, setError] = useState('');

    const handleGenerateClick = async () => {
        if(!image) {
            setError("Please upload an image to generate caption.");
            return;
        }

        try {
            setLoading(true);
            setError('');
            
            const formData = new FormData()
            formData.append("image", image);
            
            const response = await axios.post("https://picnarrate-api.onrender.com", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            
            if(response.status === 200) {
                setCaption(response.data.caption);
                setError('');
            } else {
                setError(response.data.message || "An error occurred");
                setCaption('');
            }

        } catch(err) {
            setError(err.response?.data?.message || "An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    }

    const handleSpeakerClick = () => {
        // TO-DO: Add text-to-speech
        console.log('Clicked on Speaker')
    }

    return (
        <section className="flex items-center justify-center w-full lg:w-[90vw] px-4 lg:px-[5vw] mx-auto">
            <div className="flex flex-col gap-8">
                <h1 className="text-4xl lg:text-5xl text-center text-foreground font-poppins font-bold">Let every picture tell its tale!</h1>
                
                {caption ? (
                    <div className="flex flex-col gap-5">
                        <div className="relative flex flex-col gap-3 border border-blue-700 p-6 rounded-md">
                            <p className="text-blue-700 font-poppins font-bold text-2xl">Generated Caption:</p>
                            <p className="text-blue-700 text-xl font-poppins font-medium">"{caption}"</p>
                            <RxSpeakerLoud
                                onClick={handleSpeakerClick}
                                className="absolute top-3 right-2 w-[30px] h-[30px] text-blue-700 hover:text-foreground cursor-pointer transition-colors"
                            />
                        </div>
                        <Link to="/" className="mx-auto">
                            <button className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 w-[180px] rounded-md font-poppins font-bold mx-auto duration-300">
                                Return
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-8">
                        <ImgUpload
                            image={image}
                            setImage={setImage}
                            error={error}
                            setError={setError}
                        />
                        <button
                            onClick={handleGenerateClick}
                            className="bg-foreground text-xl text-background hover:bg-red-900 px-3 py-2 rounded-md w-[180px] font-bold mx-auto"
                        >
                            {loading ? 'Generating...' : 'Generate'}
                        </button>
                        {error && <p className="text-foreground font-poppins font-medium text-lg mx-auto">{error}</p>}
                    </div>
                )}
            </div>
        </section>
    )
}

export default Hero;