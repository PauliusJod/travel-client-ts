// eslint-disable-next-line
import React from "react";
import axios from "axios";
import { GetCurrentUserId } from "./authservice";
import { IGetRoute } from "../typings/RouteProps";

export async function GetAllOwnedItemsHandler() {
  try {
    const userInfoId = GetCurrentUserId();
    const resp = await axios.get<IGetRoute[]>(
      "http://localhost:5113/api/troutes/usercreated/" + userInfoId
    );
    if (resp && resp.status === 200) {
      // console.log("resp: ", resp);
      const data: IGetRoute[] = resp.data;
      //   let a = await GetOwnedItemImagesHandler(11);
      //   console.log("a: ", a);
      return data;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// async function GetOwnedItemImagesHandler(routeid: number) {
//   try {
//     const resp = await axios.get<IRouteImage[]>(
//       "http://localhost:5113/api/troutes/" + routeid + "/imageurl"
//     );

//     if (resp && resp.status === 200) {
//       console.log(resp);
//       const dataImage: IRouteImage[] = resp.data;
//       return dataImage;
//     }

//     return null;
//   } catch (error) {
//     console.error("Error: ", error);
//     return null;
//   }
// }
// async function GetOwnedItemImagesHandler(routeid: number) {
//   return axios
//     .get<IRouteImage[]>(
//       "http://localhost:5113/api/troutes/" + routeid + "/imageurl"
//     )
//     .then((resp) => {
//       if (resp && resp.status === 200) {
//         console.log(resp);
//         const dataImage: IRouteImage[] = resp.data;
//         return dataImage;
//       }
//     });
// }
