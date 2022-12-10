import { Identifiable } from "../shared/common-types";

import { entityWithoutId } from '../interfaces/interfaces'
import { User, UserRegister } from "../model/users";
import { type } from "@testing-library/user-event/dist/type";
const apiJson = `http://localhost:4000/api`;


export interface ApiClient<K, V extends Identifiable<K>> {
    findAll(): Promise<V[]>;
    findById(id: K): Promise<V>;
    create(entityWithoutId: Omit<V, 'id'>): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<void>;
    register(entityWithoutId: UserRegister): Promise<V>
    findByUsername(username: any): any;
}



export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K, V> {
    constructor(public apiCollectionSuffix: string) { }
    async findByUsername(username: any) {

        const exsisting = await this.handleJsonRequest<any>(`${apiJson}/${this.apiCollectionSuffix}/?username=${username}`);
        if (exsisting.length > 0) {
            throw new Error('Username is taken')
        }

    }
    findAll(): Promise<V[]> {
        return this.handleJsonRequest<V[]>(`${apiJson}/${this.apiCollectionSuffix}`);
    }
    findById(id: K): Promise<V> {
        return this.handleJsonRequest<V>(`${apiJson}/${this.apiCollectionSuffix}/${id}`);
    }
    create(entityWithoutId: Omit<V, 'id'>): Promise<V> {

        return this.handleJsonRequest<V>(`${apiJson}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entityWithoutId)
        });
    }
    update(entity: V): Promise<V> {
        return this.handleJsonRequest<V>(`${apiJson}/${this.apiCollectionSuffix}/${entity.id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(entity)
        });
    }
    async deleteById(id: K): Promise<void> {
        await this.handleJsonRequest<V>(`${apiJson}/${this.apiCollectionSuffix}/${id}`, {
            method: 'DELETE',
        });
    }



    async register(entityWithoutId: UserRegister): Promise<V> {

        if (entityWithoutId.firstName === '') {
            throw new Error('First Name is required')
        }
        if (entityWithoutId.lastName === '') {
            throw new Error('Last Name is required')
        }
        if (entityWithoutId.username === '') {
            throw new Error('Username is required')
        }
        if (entityWithoutId.password === '') {
            throw new Error('Password is required')
        }
        if (entityWithoutId.rePass === '') {
            throw new Error('Confirm Password is required')
        }

        if (entityWithoutId.password !== entityWithoutId.rePass) {
            throw new Error('Password and Confirm Password don\'t match')
        }


        return this.handleJsonRequest<V>(`${apiJson}/${this.apiCollectionSuffix}`, {
            method: 'POST',
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(entityWithoutId)
        })
    }

    private async handleJsonRequest<V>(url: string, options?: RequestInit): Promise<V> {
        try {
            const postsResp = await fetch(url, options);
            if (postsResp.status >= 400) {
                return Promise.reject(postsResp.body);
            }
            return postsResp.json() as Promise<V>;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}






export const login1 = async (username: string, password: string) => {
    if (username === '' || password === '') {
        throw new Error('All fields is required')
    }
    const response = await fetch(`${apiJson}/users?username=${username}`)

    const result = await response.json()


    if (result.length === 0) {
        throw new Error('Username or Password dont match')

    }

    if (result[0].password === password && result[0].username === username) {
        return result

    } else {
        throw new Error('Username or Password dont match')
    }


}

export const serachInDB = async (query: string) => {
    let resultFilter: User[] | any = []

    const username = await fetch(`${apiJson}/users?username_like=${query}`)
    let resultUserName = await username.json()
    console.log(resultUserName)

    const firstName = await fetch(`${apiJson}/users?firstName_like=${query}`)
    let resultfirstName = await firstName.json()
    console.log(resultfirstName)

    const lastName = await fetch(`${apiJson}/users?lastName_like=${query}`)
    const resultlastName = await lastName.json()
    console.log(resultlastName)

    if (resultUserName.length > 0 && resultfirstName.length > 0 && resultlastName.length > 0) {


        const filterByUsernameAndFirstNamme = (resultUserName: User[], resultfirstName: User[]) => {
            let res = [];
            res = resultUserName.filter(el => {
               
                return !resultfirstName.find(element => {
                    return element.id === el.id;
                });
            });
            console.log(res)
            return res;
        }



        const lastFilter = (arr1: User[], resultlastName: User[]) => {
            let res = [];
            res = arr1.filter(el => {
                return !resultlastName.find(element => {
                      
                    return element.id === el.id;
                });
            });
            return res;
        }
        const arr1 = filterByUsernameAndFirstNamme(resultUserName, resultfirstName)

        const arr = lastFilter(arr1, resultlastName)

        console.log(arr1,'--arr1-')
        console.log(arr,'--arr-')
        resultFilter = resultFilter.concat(arr)

    } else if (resultUserName.length > 0 && resultfirstName.length > 0 && resultlastName.length === 0) {

        const filterByUsernameAndFirstNamme = (resultUserName: User[], resultfirstName: User[]) => {
            let res = [];
            res = resultUserName.filter(el => {
                return !resultfirstName.find(element => {
                    return element.id === el.id;
                });
            });
            return res;
        }


        const arr = filterByUsernameAndFirstNamme(resultUserName, resultfirstName)
        resultFilter = resultFilter.concat(arr)

    } else if (resultUserName.length > 0 && resultfirstName.length === 0 && resultlastName.length > 0) {

        const filterByUsernameAndLastNamme = (resultUserName: User[], resultlastName: User[]) => {
            let res = [];
            res = resultUserName.filter(el => {
                return !resultlastName.find(element => {
                    return element.id === el.id;
                });
            });
            console.log(res)
            return res;
        }


        const arr = filterByUsernameAndLastNamme(resultUserName, resultlastName)
        resultFilter = resultFilter.concat(arr)

    } else if (resultUserName.length === 0 && resultfirstName.length > 0 && resultlastName.length > 0) {

        const filterByFirstNameAndLastNamme = (resultfirstName: User[], resultlastName: User[]) => {
            let res = [];
            res = resultfirstName.filter(el => {
                return !resultlastName.find(element => {
                    return element.id === el.id;
                });
            });
            return res;
        }


        const arr = filterByFirstNameAndLastNamme(resultlastName, resultfirstName)
        resultFilter = resultFilter.concat(arr)


    } else {
        if (resultUserName.length > 0) {

            resultFilter = resultFilter.concat(resultUserName)


        } else if (resultfirstName.length > 0) {
            resultFilter = resultFilter.concat(resultfirstName)

        } else if (resultlastName.length > 0) {
            resultFilter = resultFilter.concat(resultlastName)

        } else {
            // let notMath = 'Not match!'
            // resultFilter.push(notMath)

            throw new Error('Not match in DB')

        }
    }


    return resultFilter


}



// localhost:3000/customer?name_like=rist&education_like=high
// const response = await fetch(`${apiJson}/users?username_like=${query}&firstName_like=${query}`)
