import React from "react";
import { DropzoneArea } from "material-ui-dropzone";
import XLSX from "xlsx";
function App() {
  async function handleExcelDrop  (acceptedFiles){
    acceptedFiles.forEach(async (file) => {

      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = async (e) => {
        var bstr = e.target.result;
        var workbook = XLSX.read(bstr, { type: rABS ? "binary" : "object" });
        var sheet_name_list = workbook.SheetNames[0];
        var jsonFromExcel = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheet_name_list]
        );

      await fetch(process.env.REACT_APP_SITE, {
        method: "POST",
        body: JSON.stringify(jsonFromExcel),
        headers:{"Content-Type":"application/json"}
      });
      
    }
      if (rABS) await reader.readAsBinaryString(file);
      else await reader.readAsArrayBuffer(file);

    });
  };

  return (
    <div align="center">
      <DropzoneArea acceptedFiles={['.xls',".xlsx"]} onDrop={handleExcelDrop} />
    </div>
  );
}

export default App;
