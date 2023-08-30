export class Person {
    private _adult: boolean
    private _id: number
    private _name: string
    private _original_name: string
    private _media_type: string
    private _popularity: number
    private _gender: number;
    private _known_for_department: string;
    private _profile_path: string;
    private _known_for: any[];


    constructor(adult: boolean, id: number, name: string, original_name: string, media_type: string, popularity: number, gender: number, known_for_department: string, profile_path: string, known_for: any[]) {
        this._adult = adult;
        this._id = id;
        this._name = name;
        this._original_name = original_name;
        this._media_type = media_type;
        this._popularity = popularity;
        this._gender = gender;
        this._known_for_department = known_for_department;
        this._profile_path = profile_path;
        this._known_for = known_for;

        this._profile_path = "https://image.tmdb.org/t/p/w500" + this._profile_path;
    }

    get adult(): boolean {
        return this._adult;
    }

    set adult(value: boolean) {
        this._adult = value;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get original_name(): string {
        return this._original_name;
    }

    set original_name(value: string) {
        this._original_name = value;
    }

    get media_type(): string {
        return this._media_type;
    }

    set media_type(value: string) {
        this._media_type = value;
    }

    get popularity(): number {
        return this._popularity;
    }

    set popularity(value: number) {
        this._popularity = value;
    }

    get gender(): number {
        return this._gender;
    }

    set gender(value: number) {
        this._gender = value;
    }

    get known_for_department(): string {
        return this._known_for_department;
    }

    set known_for_department(value: string) {
        this._known_for_department = value;
    }

    get profile_path(): string {
        return this._profile_path;
    }

    set profile_path(value: string) {
        this._profile_path = value;
    }

    get known_for(): any[] {
        return this._known_for;
    }

    set known_for(value: any[]) {
        this._known_for = value;
    }

}
