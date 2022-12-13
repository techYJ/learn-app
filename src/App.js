import { useState } from "react";
import { sculptureList } from "./data";

export default function Gallery() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    const totalCount = sculptureList.length;
    const handleNextClick = () => {
        let next = index + 1;
        next = next < totalCount ? next : 0;
        setIndex(next);
    };

    const handleMoreClick = () => {
        setShowMore(!showMore);
    };

    const sculpture = sculptureList[index];
    return (
        <>
            <button onClick={handleNextClick}>
                Next
            </button>
            <h2>
                <i>{sculpture.name} </i>
                by {sculpture.artist}
            </h2>
            <h3>
                ({index + 1} of {sculptureList.length})
            </h3>
            <button onClick={handleMoreClick}>
                Show details
            </button>
            {showMore && <p>{sculpture.description}</p>}
            <img
                src={sculpture.url}
                alt={sculpture.alt}
            />
        </>
    );
}