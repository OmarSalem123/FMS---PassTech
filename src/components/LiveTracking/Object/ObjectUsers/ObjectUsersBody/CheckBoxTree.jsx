/* eslint-disable react/style-prop-object */
import React, { useState, useEffect, useContext, useMemo } from "react";
import CheckboxTree from "react-checkbox-tree";
import {
  useGetAllUsersQuery,
  useLazyGetChildUsersQuery,
} from "../../../../../Redux/service/Users";
import { filtrationcontext } from "../../../../../context/Filtercontext";
import Searchbar from "../../../../Helpers/Searchbar/Searchbar";

export default function UserCheckboxTree() {
  const { data: allUsers } = useGetAllUsersQuery();
  let { checked, setChecked, setcheckValues } = useContext(filtrationcontext);
  const [expanded, setExpanded] = useState([]);
  const [nodes, setNodes] = useState([]);
  const [filteredNodes, setFilteredNodes] = useState([]);
  const [childCache, setChildCache] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerGetChildUsers, { isLoading }] = useLazyGetChildUsersQuery();

  const filteredBranches = useMemo(() => {
    return (
      allUsers?.filter((user) => !user.administrator && user.userLimit > 0) ||
      []
    );
  }, [allUsers]);

  useEffect(() => {
    const savedChecked = sessionStorage.getItem("UserFiltration");
    if (savedChecked) {
      setChecked(JSON.parse(savedChecked));
    }
  }, [setChecked]);

  useEffect(() => {
    const fetchChildrenForAllBranches = async () => {
      let accumulatedNodes = [];

      for (const branch of filteredBranches) {
        if (childCache[branch.id]) {
          accumulatedNodes.push({
            value: branch.id,
            label: branch.name,
            children: childCache[branch.id],
            expanded: true,
          });
        } else {
          try {
            const childUsersResponse = await triggerGetChildUsers(
              branch.id
            ).unwrap();
            const childrenNodes = childUsersResponse.map((child) => ({
              value: child.id,
              label: child.name,
            }));

            setChildCache((prevCache) => ({
              ...prevCache,
              [branch.id]: childrenNodes,
            }));

            accumulatedNodes.push({
              value: branch.id,
              label: branch.name,
              children: childrenNodes,
              expanded: true,
            });
          } catch (error) {
            console.error("Failed to fetch child users:", error);
          }
        }
      }

      setNodes(accumulatedNodes);
      setFilteredNodes(accumulatedNodes);
    };

    if (filteredBranches.length > 0 && !isLoading) {
      fetchChildrenForAllBranches();
    }
  }, [filteredBranches, childCache, triggerGetChildUsers, isLoading]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredNodes(nodes);
      return;
    }

    const filterNodes = (nodes) => {
      return nodes.reduce((acc, node) => {
        const children = node.children ? filterNodes(node.children) : [];

        if (
          node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          children.length > 0
        ) {
          acc.push({
            ...node,
            children: children.length > 0 ? children : node.children,
          });
        }

        return acc;
      }, []);
    };

    const filtered = filterNodes(nodes);
    setFilteredNodes(filtered);
  }, [searchQuery, nodes]);

  const onCheck = (checkedNodes) => {
    setChecked(checkedNodes);
    sessionStorage.setItem("UserFiltration", JSON.stringify(checkedNodes));
    setcheckValues(checkedNodes);
  };

  const onExpand = (expandedNodes) => {
    setExpanded(expandedNodes);
  };

  return (
    <>
      {/**<Searchbar
        style="search-dark input-group"
        path="/assets/dark/search.svg"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />**/}
      {/**<div className="mt-4">
        <CheckboxTree
          nodes={filteredNodes}
          checked={checked}
          onCheck={onCheck}
          onExpand={onExpand}
          expanded={expanded}
        />
      </div>**/}
    </>
  );
}
