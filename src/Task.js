const Task = (props) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <input
          type={"checkbox"}
          checked={props.task.isCompleted}
          onChange={(event) =>
            props.handleComplete(props.task.id, event.target.checked)
          }
        />
        <div>{props.task.title}</div>
        <button onClick={() => props.handleDelete(props.task.id)}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Task;
