import {memo} from "react";

const PNF = memo(()=>{
    return(
        <div>
            <p className={"validation-error"}>🚫 404 Page not found</p>
        </div>
    )
})

 export default PNF;