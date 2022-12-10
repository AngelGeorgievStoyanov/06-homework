
import { useMemo } from "react";
import { FilterType } from "../AllUsers/AllUsers";
import CardUser from "../CardUser/CardUser";
import { User } from "../model/users";
import { UserUpdateListener } from "../shared/common-types";



type UsersProps = {
    users: User[]
    owner: User | number | undefined;
    onEditedUser: UserUpdateListener;
    admin: 2 | undefined | boolean;
    onDeleteUser: UserUpdateListener;
    filterStatus: FilterType
    filterRole: FilterType

}

function ListUsers({ users, filterStatus, filterRole, ...rest }: UsersProps) {

    const filterUsers = useMemo(() => users.filter(user => (filterStatus && filterRole) ? user.status === filterStatus && user.role === filterRole : (filterRole && !filterStatus) ? user.role === filterRole : (filterStatus && !filterRole) ? user.status === filterStatus : true), [users, filterStatus, filterRole])

    return (
        <>


            {filterUsers.map(x => <CardUser key={x.id} user={x}  {...rest} />)}

        </>
    )
}

export default ListUsers

