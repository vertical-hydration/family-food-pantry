import { listOpenSemesters } from "~/lib/business-logic/active-semester.server";

const getPageData = async () => {

  const semestersList = await listOpenSemesters();

  const semesters = semestersList.map((s)=>{

    return {
      ...s,
      enrollment: "not-enrolled"
    }
  })

  return { semesters };
};

export { getPageData };