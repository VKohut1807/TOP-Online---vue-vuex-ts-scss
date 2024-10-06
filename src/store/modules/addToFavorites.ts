import {MutationTree, ActionTree, ActionContext} from "vuex";
import {AxiosError} from "axios";
import addToFavoritesApi from "@/api/addToFavorites";

type AddToFavoritesType = {};

export enum FavoritesMutations {
  addToFavoritesStart = "[addToFavorites] Start",
  addToFavoritesSuccess = "[addToFavorites] Success",
  addToFavoritesFailure = "[addToFavorites] Failure",
}

export enum FavoritesActions {
  addToFavorites = "[addToFavorites] Add To Favorites",
}

const mutations: MutationTree<AddToFavoritesType> = {
  [FavoritesMutations.addToFavoritesStart]() {},
  [FavoritesMutations.addToFavoritesSuccess]() {},
  [FavoritesMutations.addToFavoritesFailure]() {},
};

const actions: ActionTree<AddToFavoritesType, AddToFavoritesType> = {
  [FavoritesActions.addToFavorites](
    {commit}: ActionContext<AddToFavoritesType, AddToFavoritesType>,
    {slug, isFavorited}: {slug: string; isFavorited: boolean}
  ) {
    return new Promise((resolve, reject) => {
      commit(FavoritesMutations.addToFavoritesStart);

      const promise = isFavorited
        ? addToFavoritesApi.deleteFromFavorites(slug)
        : addToFavoritesApi.addToFavorites(slug);

      promise
        .then((response) => {
          commit(
            FavoritesMutations.addToFavoritesSuccess,
            response.data.article
          );

          resolve(response.data.article);
        })
        .catch((errors: AxiosError<{errors?: string[]}>) => {
          commit(
            FavoritesMutations.addToFavoritesFailure,
            errors?.response?.data?.errors
          );

          console.log(
            "ERRORS Add/Remove To Favorites",
            errors?.response?.data?.errors
          );
        });
    });
  },
};

export default {
  mutations,
  actions,
};
