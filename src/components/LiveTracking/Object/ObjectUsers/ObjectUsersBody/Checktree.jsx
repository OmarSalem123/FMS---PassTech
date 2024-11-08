/* eslint-disable react/style-prop-object */
import React, { useContext, useState } from "react";
import {
  useGetAllUsersQuery,
  useLazyGetChildUsersQuery,
} from "../../../../../Redux/service/Users/Users";
import { filtrationcontext } from "../../../../../context/Filtercontext";
import Searchbar from "../../../../Helpers/Searchbar/Searchbar";
import { useSelector } from "react-redux";

export default function Checktree() {
  const { data: AllUsers = [], isLoading } = useGetAllUsersQuery(); // default to an empty array
  const [triggerGetChildUsers] = useLazyGetChildUsersQuery();
  const [childDataMap, setChildDataMap] = useState({});
  const [expandedParents, setExpandedParents] = useState({});
  const [toggle, setToggle] = useState(false);
  const {
    parentCheck,
    setParentCheck,
    childCheck,
    setChildCheck,
    ObjectUsersearchQuery,
    setObjectUserSearchQuery,
  } = useContext(filtrationcontext);
  const inf = useSelector((state) => state.users.user);

  // Ensure AllUsers is an array before filtering
  const Branches = Array.isArray(AllUsers)
    ? AllUsers.filter(
        (user) =>
          (user.administrator === false && user.userLimit > 0) ||
          (inf.administrator === false &&
            user.administrator === false &&
            (user.readonly === true || user.deviceReadonly === true))
      )
    : [];

  const handleParentCheckClick = (id) => (e) => {
    const isChecked = e.target.checked;
    setParentCheck((prev) => {
      const updatedParentCheck = isChecked
        ? [...prev, id]
        : prev?.filter((item) => item !== id);
      return updatedParentCheck;
    });
  };

  const handleChildCheckClick = (id) => (e) => {
    const isChecked = e.target.checked;
    setChildCheck((prev) => {
      const updatedChildCheck = isChecked
        ? [...prev, id]
        : prev?.filter((item) => item !== id);
      return updatedChildCheck;
    });
  };

  const handleImageClick = (id) => async () => {
    try {
      if (!expandedParents[id]) {
        const data = await triggerGetChildUsers(id).unwrap();
        setChildDataMap((prevMap) => ({
          ...prevMap,
          [id]: data,
        }));
      }

      setExpandedParents((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
      setToggle(!toggle);
    } catch (error) {
      console.error("Failed to fetch child users", error);
    }
  };

  const filteredBranches = Branches?.filter((branch) => {
    const isParentMatch = branch.name
      .toLowerCase()
      .includes(ObjectUsersearchQuery.toLowerCase());

    const isChildMatch = childDataMap[branch.id]?.some((child) =>
      child.name.toLowerCase().includes(ObjectUsersearchQuery.toLowerCase())
    );

    return isParentMatch || isChildMatch;
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <Searchbar
        style="search-dark input-group"
        path="/assets/dark/search.svg"
        placeholder="Search..."
        value={ObjectUsersearchQuery}
        onChange={(e) => setObjectUserSearchQuery(e.target.value)}
      />
      {filteredBranches.length === 0 ? (
        <div className="my-5 p-5">
          <div className="text-center text-success fs-16 fw-700">
            No data shown
          </div>
        </div>
      ) : (
        <div className="users-filter mt-3">
          {filteredBranches?.map((branch) => (
            <div key={branch.id} className="mt-1">
              <div className="d-flex align-items-center">
                <div className="d-flex">
                  <img
                    role="button"
                    src={
                      expandedParents[branch.id]
                        ? "/assets/uplist-arrow.svg"
                        : "/assets/downlist-arrow.svg"
                    }
                    alt=""
                    onClick={handleImageClick(branch.id)}
                    className="mr-8"
                  />
                  <input
                    type="checkbox"
                    onChange={handleParentCheckClick(branch.id)}
                    name={branch.name}
                    id={branch.name}
                    checked={parentCheck?.includes(branch.id)}
                    className="mr-8"
                  />
                </div>
                <div className="fs-14 fw-400">{branch.name}</div>
              </div>

              {expandedParents[branch.id] && (
                <div className="ms-5">
                  {childDataMap[branch.id]?.map((child) => (
                    <div key={child.id} className="d-flex mt-1">
                      <div className="d-flex users-checkbox">
                        <input
                          type="checkbox"
                          onChange={handleChildCheckClick(child.id)}
                          name={child.name}
                          id={child.name}
                          checked={childCheck.includes(child.id)}
                        />
                      </div>
                      <div className="fs-14 fw-400">{child.name}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
