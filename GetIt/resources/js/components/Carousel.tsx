import { Image } from "@/types";

function Carousel({images}: {images: Image[]}) {


    return(
        <div>
            <div className="flex items-start gap-8">
                <div className="flex flex-col items-center gap-2 py-2">
                    {images.map((image, i) => (
                        <a href={'#item' + i} className="border-2 hover:border-blue-500" key={image.id}>
                            <img src={image.thumb} alt="" className="w-[50px]" />
                        </a>
                    ))

                    }
                </div>
                <div className="carousel w-full">
                    {images.map((image, i) => (
                        <div id={"item" + i} className="carousel-item w-full" key={image.id}>
                            <img src={image.large} alt="" className="w-full" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Carousel;