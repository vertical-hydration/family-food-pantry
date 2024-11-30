const getActiveSemester = async () => {
  const semesterId = "Dt6bULFo471k1b6HRsDl";
  const semesterInfo = {
    semesterName: "August-December 2024",
  };
  return { semesterId, semesterInfo };
};

const listOpenSemesters = async()=>{
  const activeSemester = await getActiveSemester();

  const semesterInfo ={
    id: activeSemester.semesterId,
    name: activeSemester.semesterInfo.semesterName
  }

  return [semesterInfo]
}

export { getActiveSemester, listOpenSemesters };

