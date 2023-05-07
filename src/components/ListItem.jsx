import "../styles/ListItem.css";

export default function ListItem(props) {
  return (
    <div className="list-item" key={props.key}>
      <img alt="Error" src={props.imgUrl} width={80} height={80} />
      <h4 className="title">
        <a href={props.webUrl}>{props.title}</a>
      </h4>
      <p className="description">{props.description}</p>
    </div>
  );
}
