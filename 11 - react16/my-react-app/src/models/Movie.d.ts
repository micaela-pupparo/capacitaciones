import { getMovies, getMovie } from "../services/fakeMovieService";
import IGenre from "./Genre";

export default interface IMovie{
    _id: string
    title: string
    genre: IGenre
    numberInStock: number
    dailyRentalRate: number
    publishDate?: string
    liked?: boolean
}

export declare function getMovies(): IMovie[];

export declare function getMovie(id: string): IMovie;

export declare function deleteMovie(id: string): IMovie;