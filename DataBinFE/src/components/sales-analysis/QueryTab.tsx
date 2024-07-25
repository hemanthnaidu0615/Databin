import { Divider } from "primereact/divider";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";
import authFetch from "../../axios";

export const QueryTab = () => {
  const [value, setValue] = useState("");

  function handleQueryRequest() {
    const data = {
      query: value,
      startDate: "2024-05-04 00:00:00",
      endDate: "2024-05-05 23:59:59",
    };

    authFetch
      .post("/tables/query", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setValue("");
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="border-2 flex-1 mx-2 my-1">
      <Button
        label="Run"
        icon="pi pi-caret-right"
        className="p-2 text-sm m-2"
        onClick={handleQueryRequest}
      />
      <Divider className="m-0" />
      <InputTextarea
        autoResize
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={15}
        cols={82}
        placeholder="Query...."
        className="m-1"
      />
    </div>
  );
};
