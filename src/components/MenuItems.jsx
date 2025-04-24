const MenuItem = ({ item, onSelect }) => {
    return (
      <div className="menu-item" onClick={onSelect}>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    );
  };
  
  export default MenuItem;
  