

const TableRow = ({item, column}) => {
    return (
      <tr>
        {column.map((columnItem, index) => {  
          return <td>{item[`${columnItem.value}`]}</td>
        })}
      </tr>)
  
    }

const Rows = ({data, column}) => {
    var i = 1;
    var arr = [];
    while (i < 20) {
        arr[i-1] = Object.values(data).map((item, index) => <TableRow item={item[i-1]} column={column}/>)
        i = i + 1;
    }
    return arr;
}


export default Rows;