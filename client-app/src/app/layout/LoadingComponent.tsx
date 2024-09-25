// LoadingComponent that renders a loading indicator using the Semantic UI React library
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
    inverted?: boolean; // A boolean that determines if the loader should have an inverted color scheme (light on dark).
    content?: string; // A string that represents the text to be displayed inside the loader (e.g., "Loading...").
}

export default function LoadingComponent({inverted = true, content = 'Loading...'}: Props) {
    return (
        // "Dimmer" meaning the dimmed background will be displayed.
        // inverted={inverted} sets the color scheme of the Dimmer based on the inverted prop.
        <Dimmer active={true} inverted={inverted}> 
            <Loader content={content}/>
        </Dimmer>
    )
}