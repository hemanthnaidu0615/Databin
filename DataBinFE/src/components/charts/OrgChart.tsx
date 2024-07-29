// import { OrganizationChart } from "primereact/organizationchart";
// import { TreeNode } from "primereact/treenode";
// import { useState } from "react";

// export default function OrgChart(props: any) {
//   const [selection, setSelection] = useState<TreeNode[]>([]);

//   const nodeTemplate = (node: TreeNode) => {
//     return (
//       <div className="flex flex-col">
//         <div className="flex flex-col align-items-center p-2 min-w-24 max-h-20">
//           <span className="font-bold mb-2">{node.label}</span>
//           <span>{node.data}</span>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className="card "
//       style={{
//         transform: `scale(${props?.zoom / 50})`,
//       }}
//     >
//       <OrganizationChart
//         value={props.data}
//         selectionMode="multiple"
//         selection={selection}
//         onSelectionChange={(e) => setSelection(e.data as any)}
//         nodeTemplate={nodeTemplate}
//         pt={{ node: { className: "p-0 text-xs " } }}
//       />
//     </div>
//   );
// }

import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import { useState } from "react";

export default function OrgChart(props: any) {
  const [selection, setSelection] = useState<TreeNode[]>([]);

  const nodeTemplate = (node: TreeNode) => {
    return (
      <div
        className="flex flex-col"
        style={{
          transform: props.orientation === "vertical" ? "rotate(90deg)" : "none",
          transformOrigin: props.orientation === "vertical" ? "top left" : "left bottom",
          margin: props.orientation === "vertical" ? "0 0 0 20px" : "0",
        }}
      >
        <div className="flex flex-col align-items-center p-2 min-w-24 max-h-20">
          <span className="font-bold mb-2">{node.label}</span>
          <span>{node.data}</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="card"
      style={{
        transform: props.orientation === "vertical" ? `rotate(-90deg) scale(${props?.zoom /50})` : `scale(${props?.zoom / 50})`,
        transformOrigin: props.orientation === "vertical" ? "left " : "left",
        width: "auto",
        height: "auto",
        
      }}
    >
      <OrganizationChart
        value={props.data}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data as any)}
        nodeTemplate={nodeTemplate}
        pt={{ node: { className: "p-0 text-xs " } }}
      />
    </div>
  );
}
