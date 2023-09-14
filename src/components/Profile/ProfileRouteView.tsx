import React, { useState, useEffect } from "react";
import { IGetRoute } from "../../typings/RouteProps";

export function PrivateRouteView(prop: IGetRoute, id: number) {
  const [route, setRoute] = useState<IGetRoute>();
  useEffect(() => {
    setRoute(prop);
    console.log(prop);
  }, []);
  return <h1>propppp</h1>;
}
