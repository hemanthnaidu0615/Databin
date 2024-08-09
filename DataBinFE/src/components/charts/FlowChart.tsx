import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './style.css'; // Import specific CSS for d3.js component

interface FlowChartNode {
  id: string;
  label: string;
  children?: FlowChartNode[];
}

const FlowChart = ({ data }: { data: FlowChartNode[] }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const root = d3.hierarchy({ children: data }, d => d.children);
    const treeLayout = d3.tree<d3.HierarchyNode<FlowChartNode>>()
      .size([height - 200, width - 200]); // Increased height for vertical space

    const nodes = treeLayout(root);

    // Link generator with straight lines
    const linkGenerator = d3.linkHorizontal<d3.HierarchyPointLink<FlowChartNode>>()
      .x(d => d.y)
      .y(d => d.x);

    // Draw links
    svg.selectAll(".d3-link")
      .data(nodes.links())
      .enter().append("path")
      .attr("class", "d3-link")
      .attr("d", d => {
        const sourceX = d.source.y;
        const sourceY = d.source.x;
        const targetX = d.target.y;
        const targetY = d.target.x;

        return `M${sourceX},${sourceY} L${targetX},${targetY}`;
      })
      .attr("fill", "none")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    // Draw nodes
    svg.selectAll(".d3-node")
      .data(nodes.descendants())
      .enter().append("g")
      .attr("class", "d3-node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .each(function(d) {
        d3.select(this).append("rect")
          .attr("class", "d3-node-rect")
          .attr("width", 200) // Set width of node box
          .attr("height", 100) // Set height of node box
          .attr("rx", 10) // Rounded corners
          .attr("x", -100)  // Center the rectangle horizontally
          .attr("y", -50);  // Center the rectangle vertically

        d3.select(this).append("text")
          .attr("class", "d3-node-label")
          .attr("dy", 5)
          .attr("x", 0)
          .style("text-anchor", "middle")
          .text(d.data.label);
      });
  }, [data]);

  return (
    <div className="d3-flowchart-container">
      <svg ref={svgRef} width="100%" height="100%" className="d3-flowchart-svg"></svg>
    </div>
  );
};

export default FlowChart;
