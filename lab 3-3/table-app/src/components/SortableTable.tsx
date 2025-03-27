import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

interface Character {
  id: number;
  name: string;
  role: string;
  technique: string;
  grade: string;
  affiliation: string;
}

interface SortableTableProps {
  data: Character[];
}

const SortableTable: React.FC<SortableTableProps> = ({ data }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Character;
    direction: 'ascending' | 'descending';
  } | null>(null);

  const requestSort = (key: keyof Character) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      if (sortConfig.key === 'grade') {
        const gradeOrder = ['Grade 4', 'Grade 3', 'Grade 2', 'Grade 1', 'Special Grade 1', 'Special Grade'];
        const aIndex = gradeOrder.indexOf(a.grade);
        const bIndex = gradeOrder.indexOf(b.grade);
        
        if (sortConfig.direction === 'ascending') {
          return aIndex - bIndex;
        } else {
          return bIndex - aIndex;
        }
      }

      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig]);

  const columns: { key: keyof Character; label: string }[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'technique', label: 'Technique' },
    { key: 'grade', label: 'Grade' },
    { key: 'affiliation', label: 'Affiliation' }
  ];

  return (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          {columns.map((column) => (
            <th 
              key={column.key.toString()}
              onClick={() => requestSort(column.key)}
              style={{ 
                cursor: 'pointer',
                backgroundColor: '#343a40',
                color: 'white',
                position: 'sticky',
                top: 0,
                whiteSpace: 'nowrap'
              }}
            >
              <div className="d-flex align-items-center">
                <span>{column.label}</span>
                {sortConfig?.key === column.key && (
                  sortConfig.direction === 'ascending' 
                    ? <FaArrowUp className="ms-2" size={14} /> 
                    : <FaArrowDown className="ms-2" size={14} />
                )}
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((character) => (
          <tr key={character.id}>
            <td>{character.id}</td>
            <td><strong>{character.name}</strong></td>
            <td>{character.role}</td>
            <td>{character.technique}</td>
            <td>{character.grade}</td>
            <td>{character.affiliation}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SortableTable;