

export default function Link (props){

    return (
        <div>
        <a href={props.url} target="blank"> {props.text} </a>
        </div>
    )

}