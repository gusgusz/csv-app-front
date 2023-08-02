import { useState } from 'react';
import Papa from 'papaparse';
import styled from 'styled-components';


const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
`;

const FileInput = styled.input`
  margin-top: 20px;
  justify-self: center;
  button{
    background-color: red;
  }
  :hover{
    background-color: blue;
  }
`;

function App() {
  const [data, setData] = useState();
  const [column, setColumn] = useState();
  const [values, setValues] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) {
      console.error('No file selected.');
      return;
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        if (result.errors.length > 0) {
          console.error('Error parsing CSV file:', result.errors);
          return;
        }
        console.log(file.name)
        const columnArray = Object.keys(result.data[0]);
        const valueArray = result.data.map((row) => Object.values(row));

        setColumn(columnArray);
        setValues(valueArray);
        setData(result);
        console.log("column:",result.data[0]);
        console.log("value",valueArray);
      },
    });
  };
  console.log("Data:", data);

  return (
    <>
      <FileInput
        type="file"
        accept=".csv"
        name="fileUp"
        onChange={handleFileUpload}
      />
      <Table>
        <thead>
          <tr>
            {column?.map((col, i) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {values?.map((v, i) => (
            <tr key={i}>
              {v?.map((value, j) => (
                <td key={j}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default App;
