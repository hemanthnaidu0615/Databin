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

//Working Code

import { OrganizationChart } from "primereact/organizationchart";
import { TreeNode } from "primereact/treenode";
import { useState } from "react";
import './style.css';

interface OrgChartProps {
  data: TreeNode[];
  orientation?: string; // Optional prop
  zoom?: number; // Optional prop
}

export default function OrgChart({ data, orientation = "horizontal", zoom = 50 }: OrgChartProps) {
  const [selection, setSelection] = useState<TreeNode[]>([]);

  const nodeTemplate = (node: TreeNode) => {
    const label = node.label || ''; // Ensure label is a string

    return (
      <div
        className="node-container" // Fixed className
        style={{
          transform: orientation === "vertical" ? "rotate(-90deg)" : "none",
          transformOrigin: orientation === "vertical" ? "left bottom" : "left top",
          margin: orientation === "vertical" ? "10px 0" : "0 10px"
        }}
      >
        <div className="node-content">
          <span className="node-label font-bold mb-2">{label}</span>
          <span className="node-data">{node.data}</span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="card"
      style={{
        transform: orientation === "vertical" ? `rotate(-90deg) scale(${zoom / 50})` : `scale(${zoom / 50})`,
        transformOrigin: orientation === "vertical" ? "left" : "left top",
        overflow: "auto", 
        display: "inline-block", // Ensure overflow is handled properly
        maxHeight: "calc(100vh - 200px)"
      }}
    >
      <OrganizationChart
        value={data}
        selectionMode="multiple"
        selection={selection}
        onSelectionChange={(e) => setSelection(e.data as any)}
        nodeTemplate={nodeTemplate}
        pt={{ node: { className: "p-0 text-xs" } }}
      />
    </div>
  );
}



// import React from 'react';
// import ReactFlow, { ReactFlowProvider, Controls, Background, Elements ,HandleElement} from 'react-flow-renderer';
// import './style.css';

// interface OrgChartProps {
//   data: Elements;
//   orientation?: string; // Optional prop
//   zoom?: number; // Optional prop
// }

// const OrgChart: React.FC<OrgChartProps> = ({ data, orientation = 'horizontal', zoom = 50 }) => {
//   return (
//     <div
//       className="card"
//       style={{
//         transform: orientation === 'vertical' ? `rotate(90deg) scale(${zoom / 50})` : `scale(${zoom / 50})`,
//         transformOrigin: 'top left',
//         overflow: 'auto',
//         display: 'inline-block',
//         maxHeight: 'calc(100vh - 200px)',
//       }}
//     >
//       <ReactFlowProvider>
//         <ReactFlow elements={data} zoom={zoom / 50}>
//           <Controls />
//           <Background />
//         </ReactFlow>
//       </ReactFlowProvider>
//     </div>
//   );
// };

// export default OrgChart;
