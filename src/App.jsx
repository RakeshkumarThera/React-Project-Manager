import { useState } from "react";

import NewProject from "./componenets/NewProject";
import NoProjectSelected from "./componenets/NoProjectselected";
import ProjectSidebar from "./componenets/ProjectSidebar";

function App() {

  const[projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[]
  })

  function handlesStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      }

      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  console.log(projectState);

  let content;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject}/>
  } else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handlesStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8"> 
      <ProjectSidebar  onStartAddProject={handlesStartAddProject}/>
      {content}
    </main>
  );
}

export default App;
