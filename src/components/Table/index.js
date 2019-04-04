import React from 'react';
import PropTypes from 'prop-types';
// import '../components/Table/style.less';

export default class Table extends React.Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    dataSource: PropTypes.object.isRequired, //immutable对象
    tableWidth: PropTypes.string
  };
  state = {
    isFirstLoading: true
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      this.setState({ isFirstLoading: false });
    }
  }
  render() {
    let { columns, dataSource, tableWidth = '980px' } = this.props;
    dataSource = dataSource.toJS(); //自身为immutable对象，拥有toJS()方法，无需再次引入immutable

    const listInfo = this.state.isFirstLoading ? (
      <tr style={{display: 'block',
          max_width: '980px',
          padding: '3px',
          border_bottom: 'solid', color:'#ccc' }}>
        <td style={{ display: 'inline-block',
            width: '100%',
            text_align: 'center',
            overflow: 'hidden',
            text_overflow: 'ellipsis',
            white_space: 'nowrap',
            font_size: '14px',
            line_height: '38px',
            padding: '0 5px'}}>加载中..</td>
      </tr>
    ) : (
      <tr>
        <td class="error-td">没有找到相应的结果 ~</td>
      </tr>
    );

    const listBody = dataSource.map(item => (
      <tr key={item.key}>
        {columns.map(column => {
          //将时间处理抽离到外面
          // if (column.dataIndex === 'createTime') {
          //   return (
          //     <td
          //       key={column.dataIndex}
          //       title={new Date(item[column.dataIndex]).toLocaleString()}
          //     >
          //       {new Date(item[column.dataIndex]).toLocaleString()}
          //     </td>
          //   );
          // }

          // if (Array.isArray(item[column.dataIndex])) {
          //   return (
          //     <td key={column.dataIndex}>
          //       {item[column.dataIndex].map(_item => <span>{_item}</span>)}
          //     </td>
          //   );
          // }
          //改为支持自定义传入内容
          // if (item[column.dataIndex]['type'] === 'td') {
          //   return item[column.dataIndex];
          // }
          // if (typeof item[column.dataIndex] === 'object') {
          //   return (
          //     <td
          //       key={column.dataIndex}
          //       style={{ width: column.width || '20%' }}
          //     >
          //       {item[column.dataIndex]}
          //     </td>
          //   );
          // }
          return (
            <td key={column.dataIndex} style={{ width: column.width || '20%' }}>
              {item[column.dataIndex]}
            </td>
          );
        })}
      </tr>
    ));

    return (
      <table class="custom-table" style={{ width: tableWidth }}>
        <thead>
          <tr>
            {columns.map(column => (
              <th
                key={column.dataIndex}
                style={{ width: column.width || '20%' }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{dataSource.length ? listBody : listInfo}</tbody>
      </table>
    );
  }
}
