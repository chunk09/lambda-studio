import "../styles/UpdateListItem.css";

export default function UpdateListItem(props) {
  return (
    <div className="update-list-item" key={props.key}>
      <p className="date">{props.date}</p>
      <h3 className="title">{props.title}</h3>
      <p className="content">{props.content}</p>
    </div>
  );
}
