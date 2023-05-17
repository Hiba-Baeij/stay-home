import { TextField } from '@mui/material'

interface propsType {
    list: Array<any>,
    text: string,
    label: string,
    filterList: (e: any) => void
}
function Filter(props: propsType) {

    function searchEvent(e: Event) {
        console.log(e.target);
        console.log("e.target");
    }

    return (
        <TextField className='w-1/3' name={props.text} id={props.text} label={props.label} onChange={() => searchEvent} />
    )
}

export default Filter