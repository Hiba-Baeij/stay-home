import React, { PropsWithChildren } from 'react'
const FullScreen = (props: PropsWithChildren) => {
    return (
        <div>{props.children}</div>
    )
}

export default FullScreen