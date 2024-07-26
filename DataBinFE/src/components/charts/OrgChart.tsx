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
//       className="card"
//       style={{
//         transform: `scale(${props?.zoom / 50})`,
//         transformOrigin: 'top left',
//         display: 'inline-block', // Ensure the container grows with content
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
//Perfect code
// import { OrganizationChart } from "primereact/organizationchart";
// import { TreeNode } from "primereact/treenode";
// import { useState, useEffect } from "react";

// export default function OrgChart({ data, zoom, layout }: any) {
//   const [selection, setSelection] = useState<TreeNode[]>([]);

//   const nodeTemplate = (node: TreeNode) => {
//     return (
//       <div className="flex flex-col w-24 h-24 p-2 justify-center items-center">
//         <span className="font-bold mb-2 text-center">{node.label}</span>
//         <span className="text-center">{node.data}</span>
//       </div>
//     );
//   };

//   useEffect(() => {
//     // Ensure the layout prop is valid
//     if (!['vertical', 'horizontal'].includes(layout)) {
//       throw new Error("Invalid layout prop: should be either 'vertical' or 'horizontal'");
//     }
//   }, [layout]);

//   return (
//     <div
//       className={`card ${layout === 'vertical' ? 'vertical-layout' : 'horizontal-layout'}`}
//       style={{
//         transform: `scale(${zoom / 50})`,
//         transformOrigin: 'top left',
//         display: 'inline-block', // Ensure the container grows with content
//       }}
//     >
//       <OrganizationChart
//         value={data}
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

interface OrgChartProps {
  value: TreeNode[];
  zoom: number;
  layout: string;
}

export default function OrgChart({ value, zoom, layout }: OrgChartProps) {
  const [selection, setSelection] = useState<TreeNode[]>([]);

  // Apply class based on layout
  const chartClass = layout === "vertical" ? "vertical-layout" : "horizontal-layout";

  return (
    <div
      className={`org-chart ${chartClass}`}
      style={{
        transform: `scale(${zoom / 50})`,
        transformOrigin: "top left",
        display: "inline-block",
        overflow: "auto", // Ensure overflow handling
        maxHeight: "calc(100vh - 200px)" // Adjust based on your layout needs
      }}
    >
      <OrganizationChart
        value={value}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data as TreeNode[])}
        className="p-organizationchart"
      />
    </div>
  );
}
