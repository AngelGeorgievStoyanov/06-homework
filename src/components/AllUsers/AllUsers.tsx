import React, { useCallback, useEffect, useState } from "react"
import { User, UserRegister, UserRole, UserStatus } from "../model/users"
import ListUsers from "../ListUsers/ListUsers"
import { ApiClient, ApiClientImpl } from '../services/authServices'
import * as authServices from '../services/authServices'
import { IdType, Optional } from "../shared/common-types"
import './AllUsers.css'
import Register from "../Register/Register"
import Login from "../Login/Login"
import { UserFilter } from "../UserFilter/UserFilter"

export type FilterType = UserStatus | UserRole | undefined;

export type FilterChangeListener = (filterChange: FilterType) => void;


const API_CLIENT: ApiClient<IdType, User> = new ApiClientImpl<IdType, User>('users');

export const CARD_HEADER_HEIGHT = 60;
export const CARD_CONTENT_HEIGHT = 50;


const AllUsers = () => {


    const [users, setUsers] = useState<User[]>([])
    const [owner, setOwner] = useState<User | number | undefined>()
    const [editedUser, setEditedUser] = useState<Optional<User>>(undefined);
    const [admin, setAdmin] = useState<2 | undefined | boolean>(undefined);
    const [hide, setHide] = useState(false);
    const [errors, setErrors] = useState<string | undefined>();
    const [mainHide, setMainHide] = useState(false)
    const [name, setName] = useState<string>()
    const [filterStatus, setFilterStatus] = useState<FilterType>()
    const [filterRole, setFilterRole] = useState<FilterType>()

    useEffect(() => {
        API_CLIENT.findAll().then(allUsers => {
            setUsers(allUsers);


        }).catch(err => {
            console.log(err)
            setErrors(err + '')
        })
    }, []);

    const handleUpdateUser = useCallback(async (user: User) => {

        try {
            const edit = await API_CLIENT.update(user)
            setUsers((oldUser) => oldUser.map(us => us.id === edit.id ? edit : us))
            mainHideF()
        } catch (err) {
            console.log(err)
            setErrors(err + '')
        }
    }, [])






    const handleUserSubmit = useCallback(async (user: UserRegister | User) => {
        try {

            if ('id' in user) {
                console.log(user,'2')

                await handleUpdateUser(user)
                setEditedUser(undefined)

            } else {

                console.log(user,'3')

                await API_CLIENT.findByUsername(user.username)


                const register = await API_CLIENT.register(user)

                setUsers(usersOld => usersOld.concat(register))
                setOwner(register.id)

                setEditedUser(editedUser ? undefined : new User(0, '', '', '', '', '', undefined, undefined, '', '', '', ''))
                setName(register.firstName)
                setAdmin(register.role === 2 ? true : undefined)
                setErrors(undefined);

                mainHideF()

            }
        } catch (err) {
            setErrors(err + '');
            console.log(err + '');
        }
    }, [])






    const handleLogin = useCallback(async (username: string, password: string) => {
        try {
            const userLog = await authServices.login1(username, password)
            setName(userLog[0].firstName)


            const allUsers = await API_CLIENT.findAll()
            setUsers(allUsers)
            const user = userLog.map((x: any) => { return x.id })
            setOwner(undefined)
            setOwner(user[0])
            mainHideF()
            setErrors(undefined)

            const role = userLog.map((x: any) => { return x.role })

            setAdmin(role[0] === 2 ? true : undefined)
            // let userEl = document.getElementById('username') as HTMLInputElement
            // userEl.value = ''
            // let passEl = document.getElementById('password') as HTMLInputElement
            // passEl.value = ''



        } catch (err) {
            setErrors(err + '');
            console.log(err + '');
        }

    }, []);



    const handleEditUser = (user: User) => {
        console.log(editedUser,'editedUser1')
        console.log(user)

        mainHideF()

        if (hide === false) {
            setHide(!hide);
        }
        
         setEditedUser(undefined)
        // setEditedUser(editedUser ? undefined : new User(0, '', '', '', '', '', undefined, undefined, '', '', '', ''))
        
        
        setEditedUser(user)

        console.log(editedUser,'editedUser2')

    }


    const toggleHide = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setHide(!hide);
    };



    const mainHideF = () => {


        setMainHide(!mainHide)


    }

    const exit = () => {

        setEditedUser(undefined)

        setAdmin(undefined)
        setOwner(undefined)
        mainHideF()

    }

    const handleDeleteUser = async (user: User) => {
        try {

            await API_CLIENT.deleteById(user.id)
            setUsers(oldUsers => oldUsers.filter(us => us.id !== user.id))
            setErrors(undefined)
        } catch (err) {
            setErrors(err + '')
        }
    }

    const createUser = () => {
        mainHideF()
        console.log(hide)
        if (hide === false) {

            setHide(!hide)
        }
    }

    const serachUsers = async (event: React.MouseEvent) => {
        event.preventDefault()
        const serach = document.getElementById('find-users') as HTMLInputElement
        console.log(serach.value)
        try {

            const searchUsers = await authServices.serachInDB(serach.value)
            console.log(searchUsers)
            if (searchUsers.length > 0) {
                setUsers(searchUsers)
                setErrors(undefined)
            } else if (!serach.value) {
                console.log('ppp')
                setErrors(undefined)

            }
        } catch (err) {
            setErrors(err + '')
        }
    }

    const handleFilterChangeStatus = (filterStatus: FilterType) => {
        setFilterStatus(filterStatus)
       

    }

    const handleFilterChangeRole = (filterRole: FilterType) => {
        setFilterRole(filterRole)
    }


    return (
        <div className="div-all-users">
            {errors && <h3 className="errors">{errors}</h3>}


            <article style={{ display: mainHide ? "none" : "block" }}>
                <div className="login" id="login" style={{ display: hide ? "none" : "block" }}>
                    <Login onLogin={handleLogin} onTogle={toggleHide}  username={''} password={''} />
                </div>
                <div className="register" id="register" style={{ display: hide ? "block" : "none" }}>
                    <Register key={editedUser?.id} onTogle={toggleHide} user={editedUser} admin={admin} onRegister={handleUserSubmit} />
                </div >
            </article>

            <main className="main" style={{ display: mainHide ? "block" : "none" }}>
                <div className="div-exit">
                    <button onClick={exit}>EXIT</button>
                    <button onClick={createUser}>Create new USER</button>
                    <div >
                        <input id="find-users" type="text" />
                        <button onClick={serachUsers}>FIND USERS</button>
                    </div>
                    <UserFilter filterStatus={filterStatus} filterRole={filterRole} onFilterChangeStatus={handleFilterChangeStatus} onFilterChangeRole={handleFilterChangeRole} />
                </div>
                {name ? <div className="welcome"><h2 >Welcome {name} !</h2></div> : ''}
                <div className="main">
                    <ListUsers users={users} owner={owner} admin={admin} onEditedUser={handleEditUser} onDeleteUser={handleDeleteUser} filterStatus={filterStatus} filterRole={filterRole} />
                </div>

            </main>
        </div>

    )


}

export default AllUsers




