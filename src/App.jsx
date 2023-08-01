import { useState } from 'react';
import Papa from 'papaparse';

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

        const columnArray = Object.keys(result.data[0]);
        const valueArray = result.data.map((row) => Object.values(row));

        setColumn(columnArray);
        setValues(valueArray);
        setData(result.data);
      },
    });
  };

  return (
    <>
      <input
        type="file"
        accept=".csv"
        name="fileUp"
        onChange={handleFileUpload}
      />
      <table>
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
      </table>
    </>
  );
}

export default App;