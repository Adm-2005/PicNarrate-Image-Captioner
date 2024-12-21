import { useState } from "react";
import PropTypes from "prop-types";
import { FaUpload } from "react-icons/fa6";
import { MdClear } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const ImgUpload = ({ image, setImage, error, setError }) => {
    const [dragging, setDragging] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();

        const droppedImage = event.dataTransfer.files[0];
        if (droppedImage && ['image/jpeg', 'image/png', 'image/jpg'].includes(droppedImage.type)) {
            setImage(droppedImage);
            setError('');
        } else {
            setError('Only JPG, JPEG, and PNG files are allowed.');
        }

        setDragging(false);
    }

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];

        if (selectedImage && ['image/jpeg', 'image/png', 'image/jpg'].includes(selectedImage.type)) {
            setImage(selectedImage);
            setError('');
        } else {
            setError('Only JPG, JPEG, and PNG files are allowed.');
        }
    }

    const handleFileRemoval = () => {
        setImage(null);
    }

    return (
        <div 
            onDragEnter={() => setDragging(true)}
            onDragOver={event => event.preventDefault()}
            onDrop={handleDrop}
            className={`flex flex-col justify-center gap-3 p-6 rounded-md w-full lg:w-[448px] h-[200px] border-2 border-foreground ${dragging ? 'bg-[#C9CCB2]' : 'bg-background'} mx-auto`}
        >
            {image ? (
                <div className="flex flex-col justify-center gap-3">
                    <div className="flex flex-row-reverse mx-auto gap-2 bg-foreground hover:text-red-900 text-background px-3 py-2 rounded-md max-w-md">
                        <p className="font-poppins text-lg text-background">{image.name}</p>
                        <MdClear 
                            onClick={handleFileRemoval} 
                            className="text-background hover:text-red-100 h-[25px] w-[25px] cursor-pointer"    
                        />
                    </div>

                    <div className="flex items-center gap-2 mx-auto text-green-800">
                        <IoMdCheckmarkCircleOutline />
                        <p className="font-poppins text-lg text-green-800">1/1 file(s) selected</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center gap-3">
                    <p className="font-poppins font-medium text-foreground text-xl mx-auto">Drag & Drop Image</p>
                    <div className="hover:bg-foreground text-foreground hover:text-background mx-auto border border-foreground px-3 py-2 rounded-md">
                        <input
                            hidden
                            id="browse"
                            type="file"
                            onChange={handleImageChange}
                            accept=".jpg, .jpeg, .png"
                        />
                        <label
                            htmlFor="browse"
                            className="flex items-center gap-2"
                        >
                            <FaUpload className="w-[25px] h-[25px]" />
                            <p className="text-lg font-poppins font-medium">Browse</p>
                        </label>
                    </div>
                    <p className="font-poppins text-foreground mx-auto">Allowed types: JPG, JPEG, PNG</p>
                </div>
            )}
        </div>
    )
}

ImgUpload.propTypes = {
    image: PropTypes.object,
    setImage: PropTypes.func
}

export default ImgUpload;