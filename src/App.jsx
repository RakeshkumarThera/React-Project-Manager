import { useState } from "react";

import NewProject from "./componenets/NewProject";
import NoProjectSelected from "./componenets/NoProjectselected";
import ProjectSidebar from "./componenets/ProjectSidebar";
import SelectedProject from "./componenets/SelectedProject";

function App() {

  const[projectState, setProjectState] = useState({
    selectedProjectId: undefined,
    projects:[]
  })

  function handleSelectProject(id){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    })
  }

  function handlesStartAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null
      }
    })
  }

  function handleCancelAddProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined
      }
    })
  }

  function handleAddProject(projectData){
    setProjectState(prevState => {
      const projectId = Math.random();
      const newProject = {
        ...projectData,
        id: projectId,
      }

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    })
  }

  function handleDeleteProject(){
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((project) => project.id !== prevState.selectedProjectId)
      }
    })
  }

  const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId);
  let content = (
    <SelectedProject project={selectedProject} onDelete={handleDeleteProject}/>)
  ;

  if(projectState.selectedProjectId === null){
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject}/>
  } else if (projectState.selectedProjectId === undefined){
    content = <NoProjectSelected onStartAddProject={handlesStartAddProject}/>
  }

  return (
    <main className="h-screen my-8 flex gap-8"> 
      <ProjectSidebar  onStartAddProject={handlesStartAddProject} 
      projects={projectState.projects}
      onSelectProject={handleSelectProject}/>
      {content}
    </main>
  );
}

export default App;
