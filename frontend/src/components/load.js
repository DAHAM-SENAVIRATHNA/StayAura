import React, { useState } from "react"; // Import React
import BeatLoader from "react-spinners/BeatLoader"; // Import ClipLoader from the library
import { css } from "@emotion/react"; // Import css function from @emotion/react

function Load() {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    // Define the CSS using the css function from @emotion/react
    const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    align-items: center;
    
  `;

    return (
        <div>
            <div className="sweet-loading text-center">
                {/* Render the ClipLoader */}
                <BeatLoader
                    color={'#008080'}
                    loading={loading}
                    css={override} // Apply the CSS using the override variable
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    text-align={'center'}
                />
            </div>
        </div>
    );
}

export default Load;
