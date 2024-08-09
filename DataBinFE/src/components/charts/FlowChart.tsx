import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './style.css';

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

    const margin = { top: 20, right: 200, bottom: 20, left: 200 };
    const width = svgRef.current.clientWidth - margin.left - margin.right;
    const height = svgRef.current.clientHeight - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 ${svgRef.current.clientWidth} ${svgRef.current.clientHeight}`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the root hierarchy and tree layout
    const root = d3.hierarchy(data[0], d => d.children);
    const treeLayout = d3.tree<d3.HierarchyNode<FlowChartNode>>().size([height, width]);

    treeLayout(root);

    // Draw links
    g.selectAll(".flowchart-link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "flowchart-link")
      .attr(
        "d",
        d3
          .linkHorizontal<d3.HierarchyPointLink<FlowChartNode>>()
          .x(d => d.y)
          .y(d => d.x)
      );

    // Draw nodes
    const node = g
      .selectAll(".flowchart-node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", d => `flowchart-node ${d.children ? "node-branch" : "node-leaf"}`)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("rect")
      .attr("class", "flowchart-node-rect")
      .attr("width", 120)
      .attr("height", 40)
      .attr("x", -60) // Center the rectangle horizontally
      .attr("y", -20); // Center the rectangle vertically

    node.append("text")
      .attr("class", "flowchart-node-label")
      .attr("dy", 5)
      .attr("x", 0)
      .style("text-anchor", "middle")
      .text(d => d.data.label);
  }, [data]);

  return (
    <div className="flowchart-container">
      <svg ref={svgRef} className="flowchart-svg"></svg>
    </div>
  );
};

export default FlowChart;
