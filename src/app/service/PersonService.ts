import {Injectable} from "@angular/core";
import {Person} from "../model/Person";
import tmdb from "../api/tmdb";

@Injectable({
    providedIn: 'root'
})
export class PersonService{
    getPopularPersons(): Person[]{
        let persons: Person[] = [];
        tmdb.get('/trending/person/week').then(async (response) => {
            for (let person in response.data.results) {
                persons.push(
                    new Person(
                        response.data.results[person].adult,
                        response.data.results[person].id,
                        response.data.results[person].name,
                        response.data.results[person].original_name,
                        response.data.results[person].media_type,
                        response.data.results[person].popularity,
                        response.data.results[person].gender,
                        response.data.results[person].known_for_department,
                        response.data.results[person].profile_path,
                        response.data.results[person].known_for,
                    )
                )
            }
            return persons;
        })
        return persons;
    }
}
