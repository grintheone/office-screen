import Snowflakes from "magic-snowflakes";
import { useEffect } from "react";
import { useAppSelector } from "@/app/hooks";
import flower_1 from "@/assets/images/flower1.png";
import flower_2 from "@/assets/images/flower2.png";
import flower_3 from "@/assets/images/flower3.png";
import flower_4 from "@/assets/images/flower4.png";
import { selectSettings } from "@/features/settings/settingsSlice";

// .snowflake:nth-child(1n) .snowflake__inner::before {
//   /* background-image: url("./assets/images/flower1.png") !important; */
//   /* border-radius: 100%; */
// }

// .snowflake:nth-child(2n) .snowflake__inner::before {
//   /* background-image: url("./assets/images/flower2.png") !important; */
//   /* border-radius: 100%; */
// }

// .snowflake:nth-child(3n) .snowflake__inner::before {
//   /* background-image: url("./assets/images/flower3.png") !important; */
//   /* border-radius: 100%; */
// }

// .snowflake:nth-child(4n) .snowflake__inner::before {
//   /* background-image: url("./assets/images/flower4.png") !important; */
//   /* border-radius: 100%; */
// }

export function useGlobalEffect() {
    const { globalEffect } = useAppSelector(selectSettings);

    useEffect(() => {
        const snowflakes = new Snowflakes({
            color: "#e3f8ff",
            zIndex: 0,
            wind: true,
            minSize: 30,
            maxSize: 50,
        });

        const cssRules = `
              .snowflake:nth-child(1n) .snowflake__inner::before {
                background-image: url(${flower_1}) !important;
                border-radius: 100%;
              }
              .snowflake:nth-child(2n) .snowflake__inner::before {
                background-image: url(${flower_2}) !important;
                border-radius: 100%;
              }
              .snowflake:nth-child(3n) .snowflake__inner::before {
                background-image: url(${flower_3}) !important;
                border-radius: 100%;
              }
              .snowflake:nth-child(4n) .snowflake__inner::before {
                background-image: url(${flower_4}) !important;
                border-radius: 100%;
              }
            `;

        const styleElement = document.createElement('style');

        if (globalEffect === "snow") {
            snowflakes.start();
        } else if (globalEffect === "flowers") {
            styleElement.innerHTML = cssRules;
            document.head.appendChild(styleElement);
        } else {
            snowflakes.stop();
        }

        return () => {
            snowflakes.destroy();
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        }
    }, [globalEffect]);
}
