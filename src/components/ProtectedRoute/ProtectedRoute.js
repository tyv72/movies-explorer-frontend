import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, path, ...props  }) => {
  React.useEffect(() => {
    props.savePath(path);
  },[]);

  return (
    <Route>
      {
        () => 
          props.loggedIn 
          ? [children] 
          : <Redirect to="./" />
      }
    </Route>
)}

export default ProtectedRoute; 