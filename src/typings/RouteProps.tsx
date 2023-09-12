export interface IGetRoute {
  routeId: number;
  rName: string;
  rCountry: string;
  rTripCost: number;
  rOrigin: string;
  rDestination: string;
  rImagesUrl: IRouteImage[];
  rIsPublished: boolean;
  rRating: number;
  rRecommendationUrl: IRouteRecommendation[];
}

export interface IRouteImage {
  rImagesUrlId: number;
  rImagesUrlLink: string;
  TRouterouteId: number;
}
export interface IRouteRecommendation {
  rRecommendationUrlId: number;
  rRecommendationUrlLink: string;
  TRouterouteId: number;
}
