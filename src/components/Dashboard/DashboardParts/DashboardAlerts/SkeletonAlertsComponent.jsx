import React from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export default function AlertsSkeleton() {
  return (
    <>
      <div className="dashboard-alert">
        <div className="bg-white-rounded flex-between my-3">
          <div>
            <p className="fs-14 fw-500 neutral-500">
              <Skeleton width={100} /> {/* Skeleton for the title */}
            </p>
            <div>
              <span className="fs-18 fw-700 neutral-800 me-3">
                <Skeleton width={30} /> {/* Skeleton for the number */}
              </span>
              <span className="fs-14 fw-700 brand-500">
                <Skeleton width={50} /> {/* Skeleton for the percent */}
              </span>
            </div>
          </div>
          <div className="">
            <Skeleton circle={true} height={50} width={50} /> {/* Skeleton for the image */}
          </div>
        </div>
      </div>
    </>
  );
}
