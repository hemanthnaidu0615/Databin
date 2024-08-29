declare module 'd3' {
    import { Selection } from 'd3-selection';
    import { HierarchyPointNode, HierarchyPointLink, hierarchy, tree, mean } from 'd3-hierarchy';
    
    // Extend d3 namespace with required types and methods
    export type HierarchyPointNode<T> = HierarchyPointNode<T>;
    export type HierarchyPointLink<T> = HierarchyPointLink<T>;
    
    export const select: typeof import('d3-selection').select;
    export const hierarchy: typeof import('d3-hierarchy').hierarchy;
    export const mean: typeof import('d3-array').mean;
    export const tree: typeof import('d3-hierarchy').tree;
  }
  