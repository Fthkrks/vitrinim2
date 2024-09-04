"use client"

import UniqueVisitors from "./_components/UniqueVisitors";
import ProjectVisitors from "./_components/ProjectVisitors";


function Analytics() {



  return (
    <div className="p-10">
      <h2 className="font-bold text-2xl mt-10">Anlitik</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 my-10">
        <div>
          <UniqueVisitors />
        </div>
        <div>
          <ProjectVisitors />
        </div>
      </div>
    </div>
  );
}

export default Analytics;
